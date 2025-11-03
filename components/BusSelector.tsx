"use client";

import { useBusContext } from '@/context/BusContext';

export default function BusSelector() {
  const { data, selectedRouteId, setSelectedRouteId } = useBusContext();

  const busRoutes = data.bus_lines;

  // 🚨 FIX 1: Ensure the container is explicitly white in light mode 
  // and dark in dark mode to match the theme background.
  return (
    <div className="grid grid-cols-4 gap-2 p-2 rounded-lg bg-white dark:bg-black shadow-inner">
      {busRoutes.map((route) => {
        const isSelected = route.id === selectedRouteId;
        
        const buttonClass = isSelected
          ? "bg-green-600 text-white font-bold shadow-md hover:bg-green-700" // Selected (Green)
          // 🚨 FIX 2: Ensure the light mode background is a clear light color.
          // Keep dark classes as Tailwind's 'class' mode will handle the switch.
          : "bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-600"; // Unselected 

        return (
          <button
            key={route.id}
            onClick={() => setSelectedRouteId(route.id)}
            className={`w-full h-10 flex items-center justify-center text-sm rounded-full transition-colors duration-200 ease-in-out ${buttonClass} 
            col-span-2 sm:col-span-1`}
            aria-pressed={isSelected}
          >
            <span className="hidden sm:inline">Bus {route.route_number}</span>
            <span className="sm:hidden">B{route.id}</span> 
          </button>
        );
      })}
    </div>
  );
}
