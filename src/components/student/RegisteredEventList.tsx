
"use client";

import { useRegistration } from "@/contexts/RegistrationContext";
import { events } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import Link from "next/link";
import { Button } from "../ui/button";

export function RegisteredEventList() {
  const { registeredEvents } = useRegistration();

  const registeredEventDetails = events.filter(event => registeredEvents.has(event.id));

  if (registeredEventDetails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 border-2 border-dashed rounded-lg">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">No Registrations Yet</h2>
          <p className="text-muted-foreground max-w-md">
            You haven't registered for any events. Browse the events and sign up!
          </p>
          <Link href="/student/dashboard">
            <Button variant="outline">Browse Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {registeredEventDetails.map((event) => (
        <Card key={event.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="relative h-48 w-full">
            <Image
              src={event.imageUrl}
              alt={event.name}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint={event.dataAiHint}
            />
          </div>
          <CardHeader>
            <CardTitle className="font-headline text-xl">{event.name}</CardTitle>
            <CardDescription className="flex items-center gap-2 pt-2">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(event.date), 'EEEE, MMMM d, yyyy')}</span>
            </CardDescription>
            <CardDescription className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">{event.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
