"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useBusContext } from '@/context/BusContext';
import L from 'leaflet';
import { FaBus, FaMapMarkerAlt } from 'react-icons/fa'; // Icons for bus and stops
import { renderToStaticMarkup } from 'react-dom/server';

// 1. Define custom icons using react-icons and Leaflet's divIcon
// ---

// Custom Bus Icon (Red, for the active bus)
const BusIconMarkup = renderToStaticMarkup(<FaBus className="text-white w-4 h-4" />);
const BusIcon = new L.DivIcon({
  html: `<div class="bg-red-600 rounded-full p-2 border-2 border-white shadow-lg">${BusIconMarkup}</div>`,
  className: '', // Important: Clear default leaflet-marker-icon styling
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -20]
});

// Custom Bus Stop Icon (Gray, for fixed stops)
const StopIconMarkup = renderToStaticMarkup(<FaMapMarkerAlt className="text-gray-900 dark:text-gray-200 w-4 h-4" />);
const StopIcon = new L.DivIcon({
  html: `<div class="bg-white dark:bg-zinc-800 rounded-full p-2 border border-gray-400 shadow-md">${StopIconMarkup}</div>`,
  className: '', 
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -18]
});

// ---
// 2. Map Component Definition
// ---

export default function BusMap() {
  const { selectedRoute, selectedRouteId } = useBusContext();

  // Default coordinates (Kuala Lumpur City Centre) if no route is selected
  const defaultPosition: L.LatLngTuple = [3.14, 101.69]; 
  
  // Calculate center based on the selected route's current bus location
  const centerPosition: L.LatLngTuple = selectedRoute?.current_location
    ? [selectedRoute.current_location.latitude, selectedRoute.current_location.longitude]
    : defaultPosition;

  // Data extraction
  const busStops = selectedRoute?.bus_stops || [];
  const busLocation = selectedRoute?.current_location;

  // Map Tile Layer (Black and White Theme)
  const BlackAndWhiteTileLayer = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const url = "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";
    const attribution = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

    return <TileLayer url={url} attribution={attribution} />;
  };

  return (
    // 💡 FIX: Added h-full w-full class to force the MapContainer to fill its parent div (ActiveBusMapSection.tsx)
    <MapContainer 
      center={centerPosition} 
      zoom={13} 
      scrollWheelZoom={true}
      key={selectedRouteId} 
      className="z-0 h-full w-full" 
    >
      
      {/* Map Tile Layer */}
      <BlackAndWhiteTileLayer isDarkMode={false} />

      {/* 3. Bus Marker (Current Location) */}
      {selectedRoute && busLocation && (
        <Marker 
          position={[busLocation.latitude, busLocation.longitude]} 
          icon={BusIcon}
        >
          <Popup>
            <div className="font-sans text-sm p-1">
              <h3 className="font-bold text-lg mb-1">{selectedRoute.name}</h3>
              {selectedRoute.status === "Active" ? (
                <>
                  <p>Status: <span className="text-green-600 font-semibold">Active</span></p>
                  {/* Find the next stop name to display in the popup */}
                  <p>Next Stop: <span className='font-bold'>{busStops.find(stop => stop.is_next_stop)?.name || "Unknown"}</span></p>
                  <p>Capacity: {selectedRoute.passengers.current} / {selectedRoute.passengers.capacity} ({selectedRoute.passengers.utilization_percentage}%)</p>
                </>
              ) : (
                <p className="text-red-600 font-semibold">Status: {selectedRoute.status}</p>
              )}
            </div>
          </Popup>
        </Marker>
      )}

      {/* 4. Bus Stop Markers */}
      {busStops.map((stop) => (
        <Marker 
          key={stop.id} 
          position={[stop.latitude, stop.longitude]} 
          icon={StopIcon}
        >
          <Popup>
            <div className="font-sans text-sm p-1">
              <h3 className="font-bold text-lg mb-1">{stop.name}</h3>
              <p>Next Arrival: <span className='font-bold'>{stop.estimated_arrival}</span></p>
            </div>
          </Popup>
        </Marker>
      ))}
      
    </MapContainer>
  );
}