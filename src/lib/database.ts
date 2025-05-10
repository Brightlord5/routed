import { RideOffer, Location, TransitSuggestion, PostRideData } from '@/types';
import { dubaiLocations, transitSuggestions } from '@/context/AppContext';

// In-memory storage for browser compatibility
let ridesData: RideOffer[] = [];
let transitData: TransitSuggestion[] = [];

// Initialize with mock data if empty
const initializeWithMockData = (mockRides: RideOffer[], mockTransitSuggestions: TransitSuggestion[]) => {
  // Only initialize if no data exists
  if (ridesData.length === 0) {
    console.log('Initializing with mock data');
    
    // Store transit suggestions
    transitData = [...mockTransitSuggestions];
    
    // Process rides with transit references
    ridesData = mockRides.map(ride => {
      return {
        ...ride,
        transitSuggestion: ride.transitSuggestion
      };
    });
    
    // Save to localStorage for persistence
    try {
      localStorage.setItem('dubaiRideShare_rides', JSON.stringify(ridesData));
      localStorage.setItem('dubaiRideShare_transit', JSON.stringify(transitData));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
};

// Load data from localStorage on startup
try {
  const storedRides = localStorage.getItem('dubaiRideShare_rides');
  const storedTransit = localStorage.getItem('dubaiRideShare_transit');
  
  if (storedRides) {
    ridesData = JSON.parse(storedRides);
  }
  
  if (storedTransit) {
    transitData = JSON.parse(storedTransit);
  }
} catch (error) {
  console.error('Error loading from localStorage:', error);
}

// Get all rides
const getAllRides = (): RideOffer[] => {
  return ridesData;
};

// Add a new ride from user input
const addRide = (postData: PostRideData, driverName: string = 'You'): RideOffer | null => {
  if (!postData.startLocation || !postData.endLocation) {
    return null;
  }
  
  const id = `user-${Date.now()}`;
  const availableSeats = postData.passengerCapacity;
  const estimatedDuration = Math.floor(Math.random() * 15) + 15; // Random between 15-30 mins
  const distance = Math.floor(Math.random() * 20) + 5; // Random between 5-25 km
  const carType = 'Your Car';
  const rating = 5.0;
  
  // Find a suitable transit suggestion (optional)
  let transitSuggestion: TransitSuggestion | undefined = undefined;
  const matchingTransitIndex = transitSuggestions.findIndex(t => 
    t.from === postData.endLocation?.name || t.to === postData.endLocation?.name
  );
  
  if (matchingTransitIndex !== -1) {
    transitSuggestion = transitSuggestions[matchingTransitIndex];
  }
  
  try {
    // Create the new ride
    const newRide: RideOffer = {
      id,
      driverName,
      startLocation: postData.startLocation,
      endLocation: postData.endLocation,
      departureTime: postData.departureTime,
      passengerCapacity: postData.passengerCapacity,
      availableSeats,
      cost: postData.cost,
      estimatedDuration,
      distance,
      carType,
      rating,
      transitSuggestion
    };
    
    // Add to memory
    ridesData.unshift(newRide);
    
    // Save to localStorage
    localStorage.setItem('dubaiRideShare_rides', JSON.stringify(ridesData));
    
    return newRide;
  } catch (error) {
    console.error('Error adding ride:', error);
    return null;
  }
};

// Search for rides with filters
const searchRides = (
  startLocation?: Location | null, 
  endLocation?: Location | null,
  sortBy: 'fastest' | 'cheapest' | null = null
): RideOffer[] => {
  console.log('Searching rides with criteria:', { startLocation, endLocation, sortBy });
  
  // Filter rides based on location
  let results = [...ridesData];
  
  if (startLocation || endLocation) {
    results = results.filter(ride => {
      const startMatch = !startLocation || 
        ride.startLocation.name === startLocation.name ||
        ride.startLocation.name.includes(startLocation.name);
        
      const endMatch = !endLocation || 
        ride.endLocation.name === endLocation.name ||
        ride.endLocation.name.includes(endLocation.name);
        
      return startMatch && endMatch;
    });
  }
  
  // Apply sorting
  if (sortBy === 'fastest') {
    results.sort((a, b) => a.estimatedDuration - b.estimatedDuration);
  } else if (sortBy === 'cheapest') {
    results.sort((a, b) => a.cost - b.cost);
  }
  
  return results;
};

export const DatabaseService = {
  initializeWithMockData,
  getAllRides,
  addRide,
  searchRides
};

export default DatabaseService; 