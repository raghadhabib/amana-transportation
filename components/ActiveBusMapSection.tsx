"use client";

import dynamic from 'next/dynamic'; // <-- CRITICAL: Must be imported to use dynamic loading
import BusSelector from './BusSelector'; 

// Dynamically import the BusMap component, disabling SSR 
// This resolves the "window is not defined" error for Leaflet
const DynamicBusMap = dynamic(() => import('./BusMap'), {
  ssr: false,
  loading: () => <p className="text-center p-4 text-gray-500 dark:text-gray-400">Loading interactive map...</p>,
});

// We removed initialData and BusProvider since the provider is now in app/page.tsx
export default function ActiveBusMapSection() { 
  return (
    <section className="space-y-4">
      {/* Title Section (Pale Yellow) */}
      <div className="bg-yellow-200 text-black p-3 text-center rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold">Active Bus Map</h2>
      </div>

      {/* Bus Route Selector */}
      <BusSelector />

      {/* Map Container */}
      <div className="h-96 w-full rounded-lg shadow-xl overflow-hidden border-2 border-gray-200 dark:border-zinc-800">
        <DynamicBusMap />
      </div>
      
    </section>
  );
}