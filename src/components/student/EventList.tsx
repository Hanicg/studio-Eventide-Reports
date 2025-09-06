"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { events } from "@/lib/data";
import { Calendar, MapPin, Ticket, Check } from 'lucide-react';
import { format } from 'date-fns';
import { useRegistration } from "@/contexts/RegistrationContext";

export function EventList() {
    const { registeredEvents, addRegistration } = useRegistration();

    const handleRegister = (eventId: string) => {
        addRegistration(eventId);
    };

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
                const isRegistered = registeredEvents.has(event.id);
                return (
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
                        <CardFooter>
                            <Button className="w-full" onClick={() => handleRegister(event.id)} disabled={isRegistered}>
                                {isRegistered ? (
                                    <>
                                        <Check className="mr-2 h-4 w-4" />
                                        Registered
                                    </>
                                ) : (
                                    <>
                                        <Ticket className="mr-2 h-4 w-4" />
                                        Register Now
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
}
