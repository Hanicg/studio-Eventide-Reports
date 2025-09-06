
"use client";

import { useRegistration } from "@/contexts/RegistrationContext";
import { events } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Calendar, MapPin, Star, CheckCircle, LogIn } from 'lucide-react';
import { format, isToday, isPast } from 'date-fns';
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { StarRating } from "../common/StarRating";

function FeedbackPopover({ eventId, onSubmit }: { eventId: string, onSubmit: (eventId: string, rating: number) => void }) {
    const [rating, setRating] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = () => {
        onSubmit(eventId, rating);
        setIsOpen(false);
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full">
                    <Star className="mr-2 h-4 w-4" />
                    Give Feedback
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Rate this event</h4>
                        <p className="text-sm text-muted-foreground">
                            Let us know what you thought of the event.
                        </p>
                    </div>
                    <div className="flex justify-center">
                       <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`h-8 w-8 cursor-pointer transition-colors ${rating >= star ? 'text-accent fill-accent' : 'text-muted-foreground/50'}`}
                                    onClick={() => setRating(star)}
                                />
                            ))}
                        </div>
                    </div>
                    <Button onClick={handleSubmit} disabled={rating === 0}>Submit</Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}


export function RegisteredEventList() {
  const { registeredEvents, checkedInEvents, checkIn, feedback, submitFeedback } = useRegistration();

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
      {registeredEventDetails.map((event) => {
        const eventDate = new Date(event.date);
        const canCheckIn = isToday(eventDate);
        const hasHappened = isPast(eventDate);
        const isCheckedIn = checkedInEvents.has(event.id);
        const hasGivenFeedback = feedback.has(event.id);

        return(
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
                    <span>{format(eventDate, 'EEEE, MMMM d, yyyy')}</span>
                    </CardDescription>
                    <CardDescription className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    {canCheckIn && (
                        <Button className="w-full" onClick={() => checkIn(event.id)} disabled={isCheckedIn}>
                            {isCheckedIn ? (
                                <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Checked In
                                </>
                            ) : (
                                <>
                                <LogIn className="mr-2 h-4 w-4" />
                                Check-in Now
                                </>
                            )}
                        </Button>
                    )}
                    {hasHappened && (
                        hasGivenFeedback ? (
                            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground w-full">
                               <span>Your Rating:</span>
                               <StarRating score={feedback.get(event.id) || 0} />
                            </div>
                        ) : (
                           <FeedbackPopover eventId={event.id} onSubmit={submitFeedback} />
                        )
                    )}
                </CardFooter>
            </Card>
        )
      })}
    </div>
  );
}
