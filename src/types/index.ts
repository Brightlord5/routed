
export interface Location {
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
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
}

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

export type AppMode = 'home' | 'post' | 'find';
