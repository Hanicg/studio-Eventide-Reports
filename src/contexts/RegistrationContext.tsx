
"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface RegistrationContextType {
  registeredEvents: Set<string>;
  addRegistration: (eventId: string) => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [registeredEvents, setRegisteredEvents] = useState<Set<string>>(new Set());

  const addRegistration = (eventId: string) => {
    setRegisteredEvents(prev => new Set(prev).add(eventId));
  };

  return (
    <RegistrationContext.Provider value={{ registeredEvents, addRegistration }}>
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
