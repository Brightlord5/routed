import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { AppMode, RideOffer, SearchCriteria, PostRideData, TransitSuggestion } from '@/types';
import DatabaseService from '@/lib/database';

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
  { name: 'Al Quoz', coordinates: [55.2400, 25.1300] as [number, number] },
  { name: 'Dubai Internet City', coordinates: [55.1571, 25.0953] as [number, number] },
];

// Mock data for transit suggestions
export const transitSuggestions: TransitSuggestion[] = [
  {
    routeName: 'Bus 50',
    from: 'Business Bay',
    to: 'Al Quoz',
    departureTime: '8:45 AM',
    duration: 20,
    frequency: 'Every 30 min',
    walkingDistance: '150m',
    notes: 'Last departure at 11:45 PM'
  },
  {
    routeName: 'Red Line Metro',
    from: 'Dubai Mall',
    to: 'Internet City',
    departureTime: '9:10 AM',
    duration: 25,
    frequency: 'Every 7 min',
    walkingDistance: '350m',
    notes: 'Exit at Dubai Internet City station'
  },
  {
    routeName: 'Bus 28',
    from: 'Palm Jumeirah',
    to: 'Dubai Marina',
    departureTime: '10:15 AM',
    duration: 15,
    frequency: 'Every 20 min',
    walkingDistance: '200m'
  },
  {
    routeName: 'Bus 36A',
    from: 'DIFC',
    to: 'Dubai Mall',
    departureTime: '2:52 PM',
    duration: 13,
    frequency: 'Every 30 min',
    walkingDistance: '200m'
  },
  {
    routeName: 'Metro Red Line',
    from: 'Business Bay',
    to: 'Dubai Marina',
    departureTime: '2:40 PM',
    duration: 22,
    frequency: 'Every 7 min',
    walkingDistance: '300m',
    notes: 'Exit at Dubai Marina station'
  }
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
    rating: 4.8,
    transitSuggestion: transitSuggestions[2], // Bus 28 from Palm Jumeirah to Dubai Marina
    co2EmissionsSaved: 4.43 // 12.3 km * 0.12 kg/km * 3 seats
  },
  {
    id: '2',
    driverName: 'Fatima',
    startLocation: dubaiLocations[3], // Dubai Mall
    endLocation: dubaiLocations[8], // Business Bay
    departureTime: '08:30',
    passengerCapacity: 3,
    availableSeats: 2,
    cost: 15,
    estimatedDuration: 15,
    distance: 5.8,
    carType: 'SUV',
    rating: 4.5,
    transitSuggestion: transitSuggestions[0], // Bus 50 from Business Bay to Al Quoz
    co2EmissionsSaved: 1.39 // 5.8 km * 0.12 kg/km * 2 seats
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
    rating: 4.9,
    transitSuggestion: transitSuggestions[3], // Bus 36A from DIFC to Dubai Mall
    co2EmissionsSaved: 5.66 // 11.8 km * 0.12 kg/km * 4 seats
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
    rating: 4.7,
    co2EmissionsSaved: 8.71 // 24.2 km * 0.12 kg/km * 3 seats
  },
  {
    id: '5',
    driverName: 'Khalid',
    startLocation: dubaiLocations[3], // Dubai Mall
    endLocation: dubaiLocations[11], // Dubai Internet City
    departureTime: '09:15',
    passengerCapacity: 2,
    availableSeats: 1,
    cost: 20,
    estimatedDuration: 22,
    distance: 15.5,
    carType: 'Compact',
    rating: 4.6,
    transitSuggestion: transitSuggestions[1], // Red Line Metro from Dubai Mall to Internet City
    co2EmissionsSaved: 1.86 // 15.5 km * 0.12 kg/km * 1 seat
  },
  // Additional fake rides
  {
    id: '6',
    driverName: 'Noor',
    startLocation: dubaiLocations[9], // Downtown Dubai
    endLocation: dubaiLocations[2], // Palm Jumeirah
    departureTime: '08:45',
    passengerCapacity: 4,
    availableSeats: 2,
    cost: 25,
    estimatedDuration: 30,
    distance: 16.7,
    carType: 'Tesla Model 3',
    rating: 4.9,
    transitSuggestion: transitSuggestions[2], // Bus 28 from Palm Jumeirah to Dubai Marina
    co2EmissionsSaved: 4.01 // 16.7 km * 0.12 kg/km * 2 seats
  },
  {
    id: '7',
    driverName: 'Rashid',
    startLocation: dubaiLocations[8], // Business Bay
    endLocation: dubaiLocations[0], // Dubai Marina
    departureTime: '09:30',
    passengerCapacity: 5,
    availableSeats: 4,
    cost: 15,
    estimatedDuration: 28,
    distance: 18.2,
    carType: 'SUV',
    rating: 4.7,
    transitSuggestion: transitSuggestions[4], // Metro Red Line from Business Bay to Dubai Marina
    co2EmissionsSaved: 8.74 // 18.2 km * 0.12 kg/km * 4 seats
  },
  {
    id: '8',
    driverName: 'Layla',
    startLocation: dubaiLocations[10], // Al Quoz
    endLocation: dubaiLocations[3], // Dubai Mall
    departureTime: '08:30',
    passengerCapacity: 3,
    availableSeats: 3,
    cost: 12,
    estimatedDuration: 15,
    distance: 9.5,
    carType: 'Hybrid',
    rating: 4.8,
    transitSuggestion: transitSuggestions[0], // Bus 50 from Business Bay to Al Quoz
    co2EmissionsSaved: 3.42 // 9.5 km * 0.12 kg/km * 3 seats
  },
  {
    id: '9',
    driverName: 'Omar',
    startLocation: dubaiLocations[11], // Dubai Internet City
    endLocation: dubaiLocations[9], // Downtown Dubai
    departureTime: '10:00',
    passengerCapacity: 4,
    availableSeats: 1,
    cost: 18,
    estimatedDuration: 25,
    distance: 15.3,
    carType: 'Luxury Sedan',
    rating: 4.9,
    co2EmissionsSaved: 1.84 // 15.3 km * 0.12 kg/km * 1 seat
  },
  {
    id: '10',
    driverName: 'Aisha',
    startLocation: dubaiLocations[6], // DIFC
    endLocation: dubaiLocations[7], // Deira
    departureTime: '09:45',
    passengerCapacity: 3,
    availableSeats: 2,
    cost: 22,
    estimatedDuration: 20,
    distance: 10.8,
    carType: 'Electric',
    rating: 5.0,
    transitSuggestion: transitSuggestions[3], // Bus 36A from DIFC to Dubai Mall
    co2EmissionsSaved: 2.59 // 10.8 km * 0.12 kg/km * 2 seats
  },
  {
    id: '11',
    driverName: 'Yousef',
    startLocation: dubaiLocations[4], // JVC
    endLocation: dubaiLocations[8], // Business Bay
    departureTime: '08:00',
    passengerCapacity: 3,
    availableSeats: 3,
    cost: 16,
    estimatedDuration: 22,
    distance: 14.2,
    carType: 'Sedan',
    rating: 4.6,
    co2EmissionsSaved: 5.11 // 14.2 km * 0.12 kg/km * 3 seats
  },
  {
    id: '12',
    driverName: 'Mariam',
    startLocation: dubaiLocations[0], // Dubai Marina
    endLocation: dubaiLocations[6], // DIFC
    departureTime: '09:15',
    passengerCapacity: 2,
    availableSeats: 1,
    cost: 24,
    estimatedDuration: 30,
    distance: 19.5,
    carType: 'Sports Car',
    rating: 4.7,
    co2EmissionsSaved: 2.34 // 19.5 km * 0.12 kg/km * 1 seat
  }
];

export type SortOption = 'fastest' | 'cheapest' | null;

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
  sortOption: SortOption;
  setSortOption: React.Dispatch<React.SetStateAction<SortOption>>;
  performSearch: (sortOption?: SortOption) => void;
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
  const [sortOption, setSortOption] = useState<SortOption>(null);
  
  // Initialize the database with mock data when the app starts
  useEffect(() => {
    DatabaseService.initializeWithMockData(mockRides, transitSuggestions);
  }, []);

  // Search function to find and filter rides
  const performSearch = (newSortOption?: SortOption) => {
    const currentSort = newSortOption !== undefined ? newSortOption : sortOption;
    
    // Use the database service to search for rides
    const results = DatabaseService.searchRides(
      searchCriteria.startLocation,
      searchCriteria.endLocation,
      currentSort
    );
    
    setSearchResults(results);
  };

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
        sortOption,
        setSortOption,
        performSearch,
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
