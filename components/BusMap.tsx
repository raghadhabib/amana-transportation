"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useBusContext } from '@/context/BusContext';
import L from 'leaflet';
import { FaBus, FaMapMarkerAlt } from 'react-icons/fa'; 
import { renderToStaticMarkup } from 'react-dom/server';

// --- Icon Definitions ---

// Custom Bus Icon (White Rounded Square with Green Bus Icon - TOP Z-INDEX)
const BusIconMarkup = renderToStaticMarkup(<FaBus className="text-green-600 w-5 h-5" />); // Increased icon size for better centering
const BusIcon = new L.DivIcon({
  // Square background: White, rounded-md
  html: `<div class="bg-white rounded-md p-1.5 border border-gray-400 shadow-lg">${BusIconMarkup}</div>`, // p-1.5 for better centering
  className: '', 
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -20]
});

// Custom Bus Stop Icon (White Rounded Square with Red Location Icon)
const StopIconMarkup = renderToStaticMarkup(<FaMapMarkerAlt className="text-red-500 w-4 h-4" />);
const StopIcon = new L.DivIcon({
  // Square background: White, rounded-md
  html: `<div class="bg-white rounded-md p-2 border border-gray-400 shadow-md">${StopIconMarkup}</div>`, // p-2 for slightly smaller stops
  className: '', 
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -18]
});

// --- Map Component ---

export default function BusMap() {
    const { selectedRoute, selectedRouteId } = useBusContext();

    const defaultPosition: L.LatLngTuple = [3.14, 101.69]; 
    
    const centerPosition: L.LatLngTuple = selectedRoute?.current_location
      ? [selectedRoute.current_location.latitude, selectedRoute.current_location.longitude]
      : defaultPosition;

    const busStops = selectedRoute?.bus_stops || [];
    const busLocation = selectedRoute?.current_location;

    // 🚨 CHANGE 1: Swapping to a clean, light-themed tile layer URL
    const LightTileLayer = () => {
      const url = "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png";
      const attribution = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

      return <TileLayer url={url} attribution={attribution} />;
    };

    return (
      <MapContainer 
        center={centerPosition} 
        zoom={13} 
        scrollWheelZoom={true}
        key={selectedRouteId} 
        className="z-0 h-full w-full" 
      >
        
        {/* 🚨 CHANGE 2: Use the new Light Tile Layer */}
        <LightTileLayer />

        {/* 3. Bus Marker (Current Location) */}
        {selectedRoute && busLocation && (
          <Marker 
            position={[busLocation.latitude, busLocation.longitude]} 
            icon={BusIcon}
            // 🚨 CHANGE 3: zIndexOffset ensures this marker is always on top
            zIndexOffset={1000} 
          >
            <Popup>
              <div className="font-sans text-sm p-1">
                <h3 className="font-bold text-lg mb-1">{selectedRoute.name}</h3>
                {selectedRoute.status === "Active" ? (
                  <>
                    <p>Status: <span className="text-green-600 font-semibold">Active</span></p>
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

        {/* 4. Bus Stop Markers (Lower Z-Index by default) */}
        {busStops.map((stop) => (
          <Marker 
            key={stop.id} 
            position={[stop.latitude, stop.longitude]} 
            icon={StopIcon}
            // Stops remain at the default Z-Index (0)
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
