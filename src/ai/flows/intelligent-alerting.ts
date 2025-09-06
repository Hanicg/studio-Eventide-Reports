// src/ai/flows/intelligent-alerting.ts
'use server';

/**
 * @fileOverview An intelligent alerting tool that watches registration trends and automatically formulates an email if an event is in danger of undersubscription.
 *
 * - analyzeRegistrationTrends - A function that analyzes registration trends and formulates an email if an event is in danger of undersubscription.
 * - AnalyzeRegistrationTrendsInput - The input type for the analyzeRegistrationTrends function.
 * - AnalyzeRegistrationTrendsOutput - The return type for the analyzeRegistrationTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeRegistrationTrendsInputSchema = z.object({
  eventName: z.string().describe('The name of the event.'),
  registrations: z.number().describe('The number of registrations for the event.'),
  targetRegistrations: z.number().describe('The target number of registrations for the event.'),
  deadline: z.string().describe('The deadline for registration (ISO date string).'),
});
export type AnalyzeRegistrationTrendsInput = z.infer<typeof AnalyzeRegistrationTrendsInputSchema>;

const AnalyzeRegistrationTrendsOutputSchema = z.object({
  shouldSendAlert: z.boolean().describe('Whether an alert email should be sent.'),
  alertEmailSubject: z.string().describe('The subject of the alert email.'),
  alertEmailBody: z.string().describe('The body of the alert email.'),
});
export type AnalyzeRegistrationTrendsOutput = z.infer<typeof AnalyzeRegistrationTrendsOutputSchema>;

export async function analyzeRegistrationTrends(input: AnalyzeRegistrationTrendsInput): Promise<AnalyzeRegistrationTrendsOutput> {
  return analyzeRegistrationTrendsFlow(input);
}

const analyzeRegistrationTrendsPrompt = ai.definePrompt({
  name: 'analyzeRegistrationTrendsPrompt',
  input: {schema: AnalyzeRegistrationTrendsInputSchema},
  output: {schema: AnalyzeRegistrationTrendsOutputSchema},
  prompt: `You are an intelligent alerting tool that analyzes registration trends for events.

  Based on the event name, current registrations, target registrations, and registration deadline, you will determine if an alert email should be sent to the administrator.

  Event Name: {{{eventName}}}
  Current Registrations: {{{registrations}}}
  Target Registrations: {{{targetRegistrations}}}
  Registration Deadline: {{{deadline}}}

  Consider the following factors when determining if an alert should be sent:
  - The percentage of target registrations achieved.
  - The amount of time remaining until the registration deadline.
  - Any trends in registration data that may indicate the event is in danger of undersubscription.

  If the event is in danger of undersubscription, you will generate an alert email subject and body that informs the administrator of the situation and suggests possible actions to take.
  Make the alert email actionable, providing clear suggestions for increasing participation.
  Ensure that the email subject is concise and informative, and the email body is well-written and professional.

  If the event is not in danger of undersubscription, you will set the shouldSendAlert field to false and leave the alertEmailSubject and alertEmailBody fields blank.
`,
});

const analyzeRegistrationTrendsFlow = ai.defineFlow(
  {
    name: 'analyzeRegistrationTrendsFlow',
    inputSchema: AnalyzeRegistrationTrendsInputSchema,
    outputSchema: AnalyzeRegistrationTrendsOutputSchema,
  },
  async input => {
    const {output} = await analyzeRegistrationTrendsPrompt(input);
    return output!;
  }
);
