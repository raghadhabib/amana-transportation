// Define interfaces based on the API response structure

export interface BusStop {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  estimated_arrival: string; // Time string or "N/A"
  is_next_stop: boolean;
}

export interface BusLine {
  id: number;
  name: string;
  route_number: string;
  current_location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  status: "Active" | "Maintenance" | "Out of Service";
  passengers: {
    current: number;
    capacity: number;
    utilization_percentage: number;
  };
  bus_stops: BusStop[];
  // Other fields like driver, vehicle_info, etc., are omitted for brevity but can be added later
}

export interface AmanaData {
  bus_lines: BusLine[];
  operational_summary: {
    total_buses: number;
    active_buses: number;
    maintenance_buses: number;
    out_of_service_buses: number;
    total_capacity: number;
    current_passengers: number;
    average_utilization: number;
  };
  filters: {
    available_statuses: string[];
    available_routes: string[];
    applied: {
      status: string | null;
      busId: number | null;
      routeNumber: string | null;
    };
  };
}