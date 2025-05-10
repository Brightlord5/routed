export interface Location {
  name: string;
  coordinates: [number, number]; // Latitude, Longitude
}

export type AppMode = 'home' | 'post' | 'find';

export interface SearchCriteria {
  startLocation: Location | null;
  endLocation: Location | null;
  desiredArrivalTime?: string;
  passengerCount: number;
}

export interface PostRideData {
  startLocation: Location | null;
  endLocation: Location | null;
  departureTime?: string;
  passengerCapacity: number;
  cost: number;
}

export interface TransitSuggestion {
  routeName: string; // E.g., "Bus 50" or "Red Line Metro"
  from: string;
  to: string;
  departureTime: string;
  duration: number; // in minutes
  frequency: string; // E.g., "Every 15 min"
  walkingDistance: string; // E.g., "250m"
  notes?: string;
}

export interface RideOffer {
  id: string;
  driverName: string;
  startLocation: Location;
  endLocation: Location;
  departureTime?: string;
  passengerCapacity: number;
  availableSeats: number;
  cost: number;
  estimatedDuration: number; // in minutes
  distance: number; // in kilometers
  carType: string;
  rating: number;
  transitSuggestion?: TransitSuggestion;
}
