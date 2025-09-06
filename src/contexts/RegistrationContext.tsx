
"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface RegistrationContextType {
  registeredEvents: Set<string>;
  addRegistration: (eventId: string) => void;
  checkedInEvents: Set<string>;
  checkIn: (eventId: string) => void;
  feedback: Map<string, number>;
  submitFeedback: (eventId: string, rating: number) => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [registeredEvents, setRegisteredEvents] = useState<Set<string>>(new Set());
  const [checkedInEvents, setCheckedInEvents] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState<Map<string, number>>(new Map());
  const { toast } = useToast();

  const addRegistration = (eventId: string) => {
    setRegisteredEvents(prev => {
        const newSet = new Set(prev);
        if (!newSet.has(eventId)) {
            newSet.add(eventId);
            toast({
                title: "Registration Successful!",
                description: "The event has been added to your registrations.",
            });
        }
        return newSet;
    });
  };

  const checkIn = (eventId: string) => {
    setCheckedInEvents(prev => {
        const newSet = new Set(prev);
        if (!newSet.has(eventId)) {
            newSet.add(eventId);
             toast({
                title: "Checked In!",
                description: "You have successfully checked into the event.",
            });
        }
        return newSet;
    });
  };

  const submitFeedback = (eventId: string, rating: number) => {
    setFeedback(prev => {
        const newMap = new Map(prev);
        if (!newMap.has(eventId)) {
            newMap.set(eventId, rating);
            toast({
                title: "Feedback Submitted!",
                description: `You gave a rating of ${rating} stars. Thank you!`,
            });
        }
        return newMap;
    });
  };

  return (
    <RegistrationContext.Provider value={{ registeredEvents, addRegistration, checkedInEvents, checkIn, feedback, submitFeedback }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};
