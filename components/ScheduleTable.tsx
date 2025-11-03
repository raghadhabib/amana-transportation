import { BusStop } from '@/types/amana';

interface ScheduleTableProps {
    busStops: BusStop[];
    routeNumber: string;
}

export default function ScheduleTable({ busStops, routeNumber }: ScheduleTableProps) {
    if (!busStops || busStops.length === 0) {
        return <p className="text-center p-4">No schedule data available for Route {routeNumber}.</p>;
    }

    return (
        <div className="overflow-x-auto rounded-lg shadow-xl border border-gray-200 dark:border-zinc-800">
            {/* Table: Use bg-white/dark:bg-zinc-900 */}
            <table className="min-w-full bg-white dark:bg-zinc-900 text-sm"> 
                <thead>
                    {/* Header Row: Use bg-gray-100/dark:bg-zinc-800 */}
                    <tr className="border-b border-gray-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800">
                        {/* Header Text: Explicitly set text color to switch */}
                        <th className="px-4 py-2 text-left font-bold text-gray-700 dark:text-gray-200">Bus Stop</th>
                        <th className="px-4 py-2 text-right font-bold text-gray-700 dark:text-gray-200">Next Travel Arrival</th>
                    </tr>
                </thead>
                <tbody>
                    {busStops.map((stop) => {
                        const isNextStop = stop.is_next_stop && stop.estimated_arrival !== "N/A";
                        
                        const rowClass = isNextStop
                            ? "bg-orange-400 text-black font-semibold animate-pulse" // Highlighted
                            // Row: Hover state
                            : "text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700";

                        return (
                            // Row body: Should inherit the table text color (gray-700/dark:gray-300)
                            <tr key={stop.id} className={rowClass}>
                                <td className="px-4 py-3">{stop.name}</td>
                                <td className="px-4 py-3 text-right">{stop.estimated_arrival}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
