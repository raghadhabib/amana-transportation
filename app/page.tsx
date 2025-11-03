import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAmanaData } from "@/lib/api";
import { BusProvider } from "@/context/BusContext"; 
import ActiveBusMapSection from "@/components/ActiveBusMapSection";
import BusScheduleSection from "@/components/BusScheduleSection";
// 🚨 NEW: Import the AmanaData interface from your types definition
import { AmanaData } from "@/types/amana"; // Adjust path if needed

export default async function Home() {
  // 🚨 FIX 1: Declare the variable with the explicit AmanaData type and initialize it to null
  let amanaData: AmanaData | null = null; 
  let initialRouteId: number = 0;

  try {
    // 🚨 FIX 2: Ensure the awaited data is explicitly assigned to the correct type
    amanaData = await getAmanaData(); 
  } catch (error) {
    console.error("Failed to fetch Amana data:", error);
    // You might want to throw an error or handle the state where data is null
    // For now, we continue, and the check below handles the null case.
  }

  // Handle the case where data fetch fails
  if (!amanaData) {
      return (
          <div className="text-center p-10">
              <Header />
              <p className="mt-8 text-xl text-red-600">
                  ⚠️ Error: Could not load bus data. Please check the API connection.
              </p>
              <Footer />
          </div>
      );
  }

  // Safely get the initial route ID
  initialRouteId = amanaData.bus_lines[0]?.id || 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* 🚨 FIX 3: Type is now guaranteed, removing the TS error under initialData */}
      <BusProvider initialData={amanaData} initialRouteId={initialRouteId}>
        <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
          <ActiveBusMapSection /> 
          <BusScheduleSection />
        </main>
      </BusProvider>
      
      <Footer />
    </div>
  );
}
