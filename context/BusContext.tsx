"use client";

import React, { createContext, useState, useContext, useMemo, ReactNode } from 'react';
import { AmanaData, BusLine } from '@/types/amana';

interface BusContextType {
  data: AmanaData;
  selectedRouteId: number;
  selectedRoute: BusLine | undefined;
  setSelectedRouteId: (id: number) => void;
}

const BusContext = createContext<BusContextType | undefined>(undefined);

export const BusProvider = ({ 
    children, 
    initialData,
    initialRouteId,
}: { 
    children: ReactNode; 
    initialData: AmanaData;
    initialRouteId: number;
}) => {
  const [selectedRouteId, setSelectedRouteId] = useState<number>(initialRouteId);
  const [data] = useState<AmanaData>(initialData); // Data remains static once fetched

  // Efficiently find the currently selected route
  const selectedRoute = useMemo(() => 
    data.bus_lines.find(bus => bus.id === selectedRouteId)
  , [data.bus_lines, selectedRouteId]);

  const value = {
    data,
    selectedRouteId,
    selectedRoute,
    setSelectedRouteId,
  };

  return <BusContext.Provider value={value}>{children}</BusContext.Provider>;
};

export const useBusContext = () => {
  const context = useContext(BusContext);
  if (context === undefined) {
    throw new Error('useBusContext must be used within a BusProvider');
  }
  return context;
};