import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Users, Search, SortAsc, CircleDollarSign, Bus, Zap } from 'lucide-react';
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
import RideCard from '@/components/RideCard';
import RideDetailsScreen from '@/components/RideDetailsScreen';
import { SortOption } from '@/context/AppContext';
import { toast } from "sonner";

const FindRideScreen: React.FC = () => {
  const { 
    searchCriteria, 
    setSearchCriteria, 
    setMode, 
    searchResults, 
    selectedRide,
    sortOption,
    setSortOption,
    performSearch
  } = useAppContext();
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  
  // Load all rides by default when component mounts
  useEffect(() => {
    performSearch();
    setSearchSubmitted(true);
    toast.info("Showing available rides", { 
      description: "Use filters to refine your search"
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form (make validation optional now)
    const newErrors: Record<string, string> = {};
    setErrors(newErrors);
    
    // Search for rides using the current filter
    performSearch();
    setSearchSubmitted(true);
  };
  
  // Handle sort changes
  const handleSortChange = (newSortOption: SortOption) => {
    setSortOption(newSortOption);
    performSearch(newSortOption);
    
    // Show toast notification based on sort option
    if (newSortOption === 'fastest') {
      toast.success("Sorted by fastest travel time");
    } else if (newSortOption === 'cheapest') {
      toast.success("Sorted by lowest price");
    } else {
      toast.success("Showing all available rides");
    }
  };

  // If a ride is selected, show the ride details screen
  if (selectedRide) {
    return <RideDetailsScreen />;
  }

  return (
    <div className="relative h-full flex flex-col">
      {/* Header */}
      <div className="z-30 p-4 flex items-center justify-between bg-white/90 shadow-sm">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2"
            onClick={() => setMode('home')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-medium text-lg bg-gradient-to-r from-maps-blue to-purple-500 bg-clip-text text-transparent">Find a Ride</h1>
        </div>
        
        {/* Sort Options */}
        <div className="flex gap-2">
          <Button
            variant={sortOption === null ? "default" : "outline"}
            size="sm"
            onClick={() => handleSortChange(null)}
            className="text-xs flex items-center gap-1"
          >
            <SortAsc className="h-3 w-3" />
            All
          </Button>
          <Button
            variant={sortOption === 'fastest' ? "default" : "outline"}
            size="sm"
            onClick={() => handleSortChange('fastest')}
            className="text-xs flex items-center gap-1"
          >
            <Zap className="h-3 w-3" />
            Fastest
          </Button>
          <Button
            variant={sortOption === 'cheapest' ? "default" : "outline"}
            size="sm"
            onClick={() => handleSortChange('cheapest')}
            className="text-xs flex items-center gap-1"
          >
            <CircleDollarSign className="h-3 w-3" />
            Cheapest
          </Button>
        </div>
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">
              {searchResults.length > 0 
                ? `${searchResults.length} Available Rides` 
                : 'No Rides Found'}
            </h2>
            
            {/* Transit Integration Badge */}
            <div className="flex items-center bg-purple-100 px-2 py-1 rounded-full text-xs text-purple-700">
              <Bus className="h-3 w-3 mr-1" />
              <span>With Transit Options</span>
            </div>
          </div>
          
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
