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
  } else {
    // Even if rides exist, ensure transit data is loaded
    if (transitData.length === 0 && mockTransitSuggestions.length > 0) {
      transitData = [...mockTransitSuggestions];
      localStorage.setItem('dubaiRideShare_transit', JSON.stringify(transitData));
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
  
  // Calculate CO2 emissions saved based on distance and available seats
  // Using standard of 180g CO2/km per vehicle
  const co2EmissionsSaved = Math.round((distance * 180 * availableSeats / 1000) * 10) / 10;
  
  try {
    // Create the new ride - don't automatically add transit suggestions
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
      co2EmissionsSaved
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
  let indirectResults: RideOffer[] = [];
  
  if (startLocation || endLocation) {
    // First search for direct routes
    results = results.filter(ride => {
      const startMatch = !startLocation || 
        ride.startLocation.name === startLocation.name ||
        ride.startLocation.name.includes(startLocation.name);
        
      const endMatch = !endLocation || 
        ride.endLocation.name === endLocation.name ||
        ride.endLocation.name.includes(endLocation.name);
        
      return startMatch && endMatch;
    });
    
    // If no direct routes or only a few direct routes found, look for indirect routes with transit
    if (results.length < 2 && startLocation && endLocation) {
      // Find rides that match the starting location
      const potentialConnections = ridesData.filter(ride => 
        ride.startLocation.name === startLocation.name ||
        ride.startLocation.name.includes(startLocation.name)
      );
      
      // For each potential connection, try to find a suitable transit option
      potentialConnections.forEach(ride => {
        // Skip if this ride is already in the results (direct match)
        if (results.some(r => r.id === ride.id)) return;
        
        // Find a transit suggestion that connects the ride's end to the user's desired destination
        const transitMatch = transitData.find(transit => 
          (transit.from === ride.endLocation.name && 
           (transit.to === endLocation.name || endLocation.name.includes(transit.to))) ||
          (transit.from.includes(ride.endLocation.name) && 
           (transit.to === endLocation.name || endLocation.name.includes(transit.to)))
        );
        
        if (transitMatch) {
          // Create a copy of the ride with the transit suggestion
          const connectedRide: RideOffer = {
            ...ride,
            transitSuggestion: transitMatch
          };
          
          indirectResults.push(connectedRide);
        }
      });
    }
  }
  
  // Combine direct and indirect results
  const combinedResults = [...results, ...indirectResults];
  
  // Apply sorting
  if (sortBy === 'fastest') {
    combinedResults.sort((a, b) => {
      const aDuration = a.estimatedDuration + (a.transitSuggestion?.duration || 0);
      const bDuration = b.estimatedDuration + (b.transitSuggestion?.duration || 0);
      return aDuration - bDuration;
    });
  } else if (sortBy === 'cheapest') {
    combinedResults.sort((a, b) => a.cost - b.cost);
  }
  
  return combinedResults;
};

export const DatabaseService = {
  initializeWithMockData,
  getAllRides,
  addRide,
  searchRides
};

export default DatabaseService; 