"use server";

import { analyzeRegistrationTrends, type AnalyzeRegistrationTrendsOutput } from "@/ai/flows/intelligent-alerting";
import type { Event } from "@/lib/types";

export async function getAlertForEvent(event: Event): Promise<{ success: true, data: AnalyzeRegistrationTrendsOutput } | { success: false, error: string }> {
  try {
    const result = await analyzeRegistrationTrends({
      eventName: event.name,
      registrations: event.registrations,
      targetRegistrations: event.targetRegistrations,
      deadline: event.deadline,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to analyze trends. Please try again." };
  }
}
