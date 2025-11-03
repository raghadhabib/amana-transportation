"use client";

// import { AmanaData } from '@/types/amana'; // No longer needed
import BusSelector from './BusSelector';
import { useBusContext } from '@/context/BusContext';
import ScheduleTable from './ScheduleTable';

// 💡 Removed initialData/initialRouteId props and BusProvider wrapper
export default function BusScheduleSection() {
    const { selectedRoute } = useBusContext();

    if (!selectedRoute) {
        return (
            <section className="space-y-4">
                <div className="bg-yellow-200 text-black p-3 text-center rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold">Bus Schedule</h2>
                </div>
                <div className="p-4 bg-white dark:bg-zinc-900 rounded-lg text-center shadow-lg">
                    <BusSelector />
                    <p className='mt-4 text-gray-600 dark:text-gray-400'>Select a bus route to view the schedule.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="space-y-4">
            {/* Title Section (Pale Yellow) */}
            <div className="bg-yellow-200 text-black p-3 text-center rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold">Bus Schedule</h2>
            </div>
            
            <BusSelector />
            <ScheduleTable busStops={selectedRoute.bus_stops} routeNumber={selectedRoute.route_number} />
        </section>
    );
}