import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAmanaData } from "@/lib/api";
import { BusProvider } from "@/context/BusContext"; // Import the Provider
import ActiveBusMapSection from "@/components/ActiveBusMapSection";
import BusScheduleSection from "@/components/BusScheduleSection";

export default async function Home() {
  let amanaData;
  try {
    amanaData = await getAmanaData();
  } catch (error) {
    console.error("Error fetching Amana data:", error);
    // ... (Error handling remains the same)
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-4 sm:p-8 flex items-center justify-center">
          <p className="text-red-600 font-bold">
            Failed to load bus data. Please check the API connection.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  const initialRouteId = amanaData.bus_lines[0]?.id || 0;

  return (
    // The main container for the application structure
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <Header />

      {/* 💡 Wrap both sections with BusProvider to share state */}
      <BusProvider initialData={amanaData} initialRouteId={initialRouteId}>
        <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
          
          {/* Active Bus Map Section */}
          {/* Now ActiveBusMapSection will no longer use its internal provider */}
          <ActiveBusMapSection /> 

          {/* Bus Schedule Section */}
          {/* Now BusScheduleSection will no longer use its internal provider */}
          <BusScheduleSection />

        </main>
      </BusProvider>
      
      <Footer />
    </div>
  );
}