import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AppMode, RideOffer, SearchCriteria, PostRideData } from '@/types';

// Mock data for Dubai locations
export const dubaiLocations = [
  { name: 'Dubai Marina', coordinates: [55.1304, 25.0750] as [number, number] },
  { name: 'Burj Khalifa', coordinates: [55.2743, 25.1972] as [number, number] },
  { name: 'Palm Jumeirah', coordinates: [55.1184, 25.1124] as [number, number] },
  { name: 'Dubai Mall', coordinates: [55.2798, 25.1975] as [number, number] },
  { name: 'JVC (Jumeirah Village Circle)', coordinates: [55.2110, 25.0657] as [number, number] },
  { name: 'Al Barsha', coordinates: [55.2098, 25.1112] as [number, number] },
  { name: 'DIFC', coordinates: [55.2840, 25.2149] as [number, number] },
  { name: 'Deira', coordinates: [55.3075, 25.2697] as [number, number] },
  { name: 'Business Bay', coordinates: [55.2627, 25.1851] as [number, number] },
  { name: 'Downtown Dubai', coordinates: [55.2735, 25.1933] as [number, number] },
];

// Mock data for available rides
export const mockRides: RideOffer[] = [
  {
    id: '1',
    driverName: 'Ahmed',
    startLocation: dubaiLocations[5], // Al Barsha
    endLocation: dubaiLocations[0], // Dubai Marina
    departureTime: '08:00',
    passengerCapacity: 4,
    availableSeats: 3,
    cost: 10,
    estimatedDuration: 25,
    distance: 12.3,
    carType: 'Sedan',
    rating: 4.8
  },
  {
    id: '2',
    driverName: 'Fatima',
    startLocation: dubaiLocations[4], // JVC
    endLocation: dubaiLocations[1], // Burj Khalifa
    departureTime: '08:30',
    passengerCapacity: 3,
    availableSeats: 2,
    cost: 15,
    estimatedDuration: 30,
    distance: 18.5,
    carType: 'SUV',
    rating: 4.5
  },
  {
    id: '3',
    driverName: 'Mohammed',
    startLocation: dubaiLocations[5], // Al Barsha
    endLocation: dubaiLocations[6], // DIFC
    departureTime: '09:00',
    passengerCapacity: 4,
    availableSeats: 4,
    cost: 12,
    estimatedDuration: 20,
    distance: 11.8,
    carType: 'Sedan',
    rating: 4.9
  },
  {
    id: '4',
    driverName: 'Sara',
    startLocation: dubaiLocations[7], // Deira
    endLocation: dubaiLocations[2], // Palm Jumeirah
    departureTime: '08:15',
    passengerCapacity: 6,
    availableSeats: 3,
    cost: 18,
    estimatedDuration: 35,
    distance: 24.2,
    carType: 'Van',
    rating: 4.7
  },
  {
    id: '5',
    driverName: 'Khalid',
    startLocation: dubaiLocations[8], // Business Bay
    endLocation: dubaiLocations[3], // Dubai Mall
    departureTime: '09:15',
    passengerCapacity: 2,
    availableSeats: 1,
    cost: 8,
    estimatedDuration: 10,
    distance: 5.2,
    carType: 'Compact',
    rating: 4.6
  },
];

interface AppContextValue {
  mode: AppMode;
  setMode: React.Dispatch<React.SetStateAction<AppMode>>;
  searchCriteria: SearchCriteria;
  setSearchCriteria: React.Dispatch<React.SetStateAction<SearchCriteria>>;
  postRideData: PostRideData;
  setPostRideData: React.Dispatch<React.SetStateAction<PostRideData>>;
  searchResults: RideOffer[];
  setSearchResults: React.Dispatch<React.SetStateAction<RideOffer[]>>;
  selectedRide: RideOffer | null;
  setSelectedRide: React.Dispatch<React.SetStateAction<RideOffer | null>>;
  ridePosted: boolean;
  setRidePosted: React.Dispatch<React.SetStateAction<boolean>>;
  lastPostedRide: PostRideData | null;
  setLastPostedRide: React.Dispatch<React.SetStateAction<PostRideData | null>>;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<AppMode>('home');
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    startLocation: null,
    endLocation: null,
    passengerCount: 1,
  });
  const [postRideData, setPostRideData] = useState<PostRideData>({
    startLocation: null,
    endLocation: null,
    passengerCapacity: 4,
    cost: 10,
  });
  const [searchResults, setSearchResults] = useState<RideOffer[]>([]);
  const [selectedRide, setSelectedRide] = useState<RideOffer | null>(null);
  const [ridePosted, setRidePosted] = useState(false);
  const [lastPostedRide, setLastPostedRide] = useState<PostRideData | null>(null);

  return (
    <AppContext.Provider
      value={{
        mode,
        setMode,
        searchCriteria,
        setSearchCriteria,
        postRideData,
        setPostRideData,
        searchResults,
        setSearchResults,
        selectedRide,
        setSelectedRide,
        ridePosted,
        setRidePosted,
        lastPostedRide,
        setLastPostedRide,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
