import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Users, Search, SortAsc, CircleDollarSign, Bus, Zap, Filter } from 'lucide-react';
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
  const [showFilters, setShowFilters] = useState(false); // Initially hide filters
  
  useEffect(() => {
    performSearch(); // Load all rides by default
    // toast.info("Showing all available rides", { 
    //   description: "Use filters to refine your search or tap a ride for details."
    // });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
    setShowFilters(false); // Hide filters after search
    toast.success("Search updated!", {
      description: searchResults.length > 0 ? `Found ${searchResults.length} rides.` : "No rides match your criteria."
    });
  };
  
  const handleSortChange = (newSortOption: SortOption) => {
    setSortOption(newSortOption);
    performSearch(newSortOption);
    if (newSortOption === 'fastest') {
      toast.success("Sorted by fastest travel time");
    } else if (newSortOption === 'cheapest') {
      toast.success("Sorted by lowest price");
    } else {
      toast.info("Showing all available rides");
    }
  };

  if (selectedRide) {
    return <RideDetailsScreen />;
  }

  return (
    <div className="relative h-full flex flex-col bg-appBackground text-appText">
      {/* Header */}
      <div className="z-30 p-4 flex items-center justify-between bg-appCard/80 backdrop-blur-md shadow-lg border-b border-appBorder">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2 text-appTextSecondary hover:text-appPrimary hover:bg-appPrimary/10 rounded-full"
            onClick={() => setMode('home')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold text-xl">Find a Ride</h1>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="text-xs flex items-center gap-1 bg-appPrimary/10 border-appPrimary text-appPrimary hover:bg-appPrimary/20"
        >
          <Filter className="h-3.5 w-3.5" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      {/* Filter & Form Section (collapsible) */}
      <div className={`z-20 bg-appCard shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${showFilters ? 'max-h-[500px] p-6 border-b border-appBorder' : 'max-h-0'}`}>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startLocation" className="text-sm font-medium text-appTextSecondary mb-1 block">From</Label>
              <LocationInput
                placeholder="Enter pickup location"
                value={searchCriteria.startLocation}
                onChange={(location) => setSearchCriteria({...searchCriteria, startLocation: location})}
                className={errors.startLocation ? "border-red-500" : ""} // Keep error styling if needed
              />
            </div>
            <div>
              <Label htmlFor="endLocation" className="text-sm font-medium text-appTextSecondary mb-1 block">To</Label>
              <LocationInput
                placeholder="Enter destination"
                value={searchCriteria.endLocation}
                onChange={(location) => setSearchCriteria({...searchCriteria, endLocation: location})}
                className={errors.endLocation ? "border-red-500" : ""}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="arrivalTime" className="text-sm font-medium text-appTextSecondary mb-1 block">Arrival Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-appTextSecondary" />
                <Input id="arrivalTime" type="time" value={searchCriteria.desiredArrivalTime || ''}
                  onChange={(e) => setSearchCriteria({...searchCriteria, desiredArrivalTime: e.target.value})}
                  className="pl-10 bg-appBackground border-appBorder focus:ring-appPrimary focus:border-appPrimary text-appText" />
              </div>
            </div>
            <div>
              <Label htmlFor="passengerCount" className="text-sm font-medium text-appTextSecondary mb-1 block">Passengers</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-appTextSecondary" />
                <Select value={searchCriteria.passengerCount.toString()} 
                  onValueChange={(value) => setSearchCriteria({...searchCriteria, passengerCount: parseInt(value)})}>
                  <SelectTrigger className="pl-10 bg-appBackground border-appBorder focus:ring-appPrimary focus:border-appPrimary text-appText">
                    <SelectValue placeholder="Passengers" />
                  </SelectTrigger>
                  <SelectContent className="bg-appCard border-appBorder text-appText">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()} className="hover:bg-appPrimary/20 focus:bg-appPrimary/30">
                        {num} {num === 1 ? 'passenger' : 'passengers'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-2">
              <Button type="button" variant={sortOption === null ? "default" : "outline"} size="sm" onClick={() => handleSortChange(null)} className={`text-xs ${sortOption === null ? 'bg-appPrimary text-white' : 'border-appBorder text-appTextSecondary hover:bg-appPrimary/10 hover:text-appPrimary'}`}><SortAsc className="h-3.5 w-3.5 mr-1" /> All</Button>
              <Button type="button" variant={sortOption === 'fastest' ? "default" : "outline"} size="sm" onClick={() => handleSortChange('fastest')} className={`text-xs ${sortOption === 'fastest' ? 'bg-appPrimary text-white' : 'border-appBorder text-appTextSecondary hover:bg-appPrimary/10 hover:text-appPrimary'}`}><Zap className="h-3.5 w-3.5 mr-1" /> Fastest</Button>
              <Button type="button" variant={sortOption === 'cheapest' ? "default" : "outline"} size="sm" onClick={() => handleSortChange('cheapest')} className={`text-xs ${sortOption === 'cheapest' ? 'bg-appPrimary text-white' : 'border-appBorder text-appTextSecondary hover:bg-appPrimary/10 hover:text-appPrimary'}`}><CircleDollarSign className="h-3.5 w-3.5 mr-1" /> Cheapest</Button>
            </div>
            <Button type="submit" className="bg-appAccent hover:bg-appAccentHover text-appBackground font-semibold h-10 px-6 rounded-lg">
              <Search className="h-4 w-4 mr-2" /> Apply Filters
            </Button>
          </div>
        </form>
      </div>

      {/* Results Section - Takes remaining height */}
      <div className="flex-1 overflow-y-auto p-4 pt-2 space-y-4">
        {searchResults.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-appTextSecondary opacity-75">
            <Search className="h-16 w-16 mb-4" />
            <p className="text-lg font-semibold mb-2">No Rides Found</p>
            <p className="text-sm text-center">Try adjusting your filters or check back later.</p>
          </div>
        ) : (
          searchResults.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))
        )}
      </div>
    </div>
  );
};

export default FindRideScreen;
