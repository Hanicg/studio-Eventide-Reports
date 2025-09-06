"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { getAlertForEvent } from "@/app/admin/actions";
import type { Event } from "@/lib/types";
import type { AnalyzeRegistrationTrendsOutput } from "@/ai/flows/intelligent-alerting";
import { Loader2, Wand2, Info } from "lucide-react";

interface IntelligentAlertingProps {
  events: Event[];
}

export function IntelligentAlerting({ events }: IntelligentAlertingProps) {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<AnalyzeRegistrationTrendsOutput | null>(null);
  const { toast } = useToast();

  const handleAnalyze = () => {
    if (!selectedEventId) {
      toast({
        title: "No Event Selected",
        description: "Please select an event to analyze.",
        variant: "destructive",
      });
      return;
    }

    const event = events.find((e) => e.id === selectedEventId);
    if (!event) return;

    startTransition(async () => {
      setResult(null);
      const response = await getAlertForEvent(event);
      if (response.success) {
        setResult(response.data);
      } else {
        toast({
          title: "Analysis Failed",
          description: response.error,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <Wand2 className="w-6 h-6 text-primary" />
            <CardTitle className="font-headline">Intelligent Alerting Tool</CardTitle>
        </div>
        <CardDescription>
          Use AI to analyze registration trends and generate alert emails for events at risk of undersubscription.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row items-end gap-4">
          <div className="w-full sm:flex-1">
            <Label htmlFor="event-select">Select Event</Label>
            <Select onValueChange={setSelectedEventId}>
              <SelectTrigger id="event-select">
                <SelectValue placeholder="Choose an event..." />
              </SelectTrigger>
              <SelectContent>
                {events.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAnalyze} disabled={isPending || !selectedEventId} className="w-full sm:w-auto">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Trends"
            )}
          </Button>
        </div>
        
        {result && (
          <div className="space-y-4 pt-4 border-t">
            {result.shouldSendAlert ? (
              <div className="space-y-4">
                 <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Action Recommended</AlertTitle>
                    <AlertDescription>
                        This event is potentially at risk. An alert email has been drafted for your review.
                    </AlertDescription>
                </Alert>
                <div className="space-y-2">
                  <Label htmlFor="email-subject">Email Subject</Label>
                  <Input id="email-subject" readOnly value={result.alertEmailSubject} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-body">Email Body</Label>
                  <Textarea id="email-body" readOnly value={result.alertEmailBody} rows={10} />
                </div>
              </div>
            ) : (
                <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>No Action Needed</AlertTitle>
                    <AlertDescription>
                        Registration for this event is on track. No alert is necessary at this time.
                    </AlertDescription>
                </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
