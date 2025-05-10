
import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Users, Search } from 'lucide-react';
import LocationInput from '@/components/LocationInput';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockRides } from '@/context/AppContext';
import RideCard from '@/components/RideCard';
import RideDetailsScreen from '@/components/RideDetailsScreen';

const FindRideScreen: React.FC = () => {
  const { 
    searchCriteria, 
    setSearchCriteria, 
    setMode, 
    searchResults, 
    setSearchResults,
    selectedRide
  } = useAppContext();
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string>> = {};
    
    if (!searchCriteria.startLocation) {
      newErrors.startLocation = 'Starting location is required';
    }
    
    if (!searchCriteria.endLocation) {
      newErrors.endLocation = 'Destination location is required';
    }
    
    setErrors(newErrors);
    
    // If no errors, search for rides
    if (Object.keys(newErrors).length === 0) {
      // Simulate search with mock data
      setSearchResults(mockRides.filter(ride => 
        (ride.startLocation.name === searchCriteria.startLocation?.name ||
         ride.startLocation.name.includes(searchCriteria.startLocation?.name || '')) &&
        (ride.endLocation.name === searchCriteria.endLocation?.name ||
         ride.endLocation.name.includes(searchCriteria.endLocation?.name || ''))
      ));
      setSearchSubmitted(true);
    }
  };

  // If a ride is selected, show the ride details screen
  if (selectedRide) {
    return <RideDetailsScreen />;
  }

  return (
    <div className="relative h-full flex flex-col">
      {/* Header */}
      <div className="z-30 p-4 flex items-center bg-white/90 shadow-sm">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2"
          onClick={() => setMode('home')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-medium text-lg">Find a Ride</h1>
      </div>

      {/* Form Card */}
      <div className={`absolute inset-x-0 top-[72px] z-30 bg-white rounded-b-2xl shadow-lg p-6 transition-all ${searchSubmitted ? 'max-h-72 overflow-hidden' : ''}`}>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-3">
            <div>
              <Label htmlFor="startLocation">Starting Location</Label>
              <LocationInput
                placeholder="Enter pickup location"
                value={searchCriteria.startLocation}
                onChange={(location) => 
                  setSearchCriteria({...searchCriteria, startLocation: location})
                }
                className={errors.startLocation ? "border-destructive" : ""}
              />
              {errors.startLocation && (
                <p className="text-destructive text-xs mt-1">{errors.startLocation}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="endLocation">Destination</Label>
              <LocationInput
                placeholder="Enter destination"
                value={searchCriteria.endLocation}
                onChange={(location) => 
                  setSearchCriteria({...searchCriteria, endLocation: location})
                }
                className={errors.endLocation ? "border-destructive" : ""}
              />
              {errors.endLocation && (
                <p className="text-destructive text-xs mt-1">{errors.endLocation}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="arrivalTime">Desired Arrival Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-maps-secondaryText" />
                <Input
                  id="arrivalTime"
                  type="time"
                  value={searchCriteria.desiredArrivalTime || ''}
                  onChange={(e) => 
                    setSearchCriteria({...searchCriteria, desiredArrivalTime: e.target.value})
                  }
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="passengerCount">Number of Passengers</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-maps-secondaryText" />
                <Select
                  value={searchCriteria.passengerCount.toString()}
                  onValueChange={(value) => 
                    setSearchCriteria({...searchCriteria, passengerCount: parseInt(value)})
                  }
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Passengers" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'passenger' : 'passengers'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Button 
            type="submit"
            className="bg-maps-green hover:bg-maps-green/90 text-white w-full h-12"
          >
            <Search className="h-5 w-5 mr-2" />
            Search Rides
          </Button>
        </form>
        
        {searchSubmitted && (
          <div className="pt-4 flex justify-center">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSearchSubmitted(false)}
              className="text-maps-blue"
            >
              Edit Search
            </Button>
          </div>
        )}
      </div>

      {/* Results Section */}
      {searchSubmitted && (
        <div className="absolute inset-x-0 bottom-0 top-[270px] z-20 bg-white/70 backdrop-blur-sm rounded-t-2xl p-4 animate-fade-in">
          <h2 className="text-lg font-medium mb-4">
            {searchResults.length > 0 
              ? `${searchResults.length} Available Rides` 
              : 'No Rides Found'}
          </h2>
          
          {searchResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-maps-secondaryText">
              <Search className="h-12 w-12 mb-4 text-gray-300" />
              <p className="mb-2">No rides available for this route</p>
              <p className="text-sm">Try changing your search criteria</p>
            </div>
          ) : (
            <div className="space-y-4 overflow-y-auto h-[calc(100%-2.5rem)] pb-4 scrollable-cards">
              {searchResults.map((ride) => (
                <RideCard key={ride.id} ride={ride} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FindRideScreen;

