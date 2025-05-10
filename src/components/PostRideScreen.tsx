
import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Users, CreditCard } from 'lucide-react';
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

const PostRideScreen: React.FC = () => {
  const { postRideData, setPostRideData, setMode, setRidePosted, setLastPostedRide } = useAppContext();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!postRideData.startLocation) {
      newErrors.startLocation = 'Starting location is required';
    }
    
    if (!postRideData.endLocation) {
      newErrors.endLocation = 'Destination location is required';
    }
    
    if (postRideData.cost <= 0) {
      newErrors.cost = 'Cost must be greater than 0';
    }
    
    setErrors(newErrors);
    
    // If no errors, post the ride
    if (Object.keys(newErrors).length === 0) {
      setLastPostedRide({...postRideData});
      setRidePosted(true);
    }
  };

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
        <h1 className="font-medium text-lg">Post a Ride</h1>
      </div>

      {/* Form Card */}
      <div className="absolute inset-x-0 bottom-0 z-30 bg-white rounded-t-2xl shadow-lg p-6 animate-slide-up">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-3">
            <div>
              <Label htmlFor="startLocation">Starting Location</Label>
              <LocationInput
                placeholder="Enter pickup location"
                value={postRideData.startLocation}
                onChange={(location) => 
                  setPostRideData({...postRideData, startLocation: location})
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
                value={postRideData.endLocation}
                onChange={(location) => 
                  setPostRideData({...postRideData, endLocation: location})
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
              <Label htmlFor="capacity">Passenger Capacity</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-maps-secondaryText" />
                <Select
                  value={postRideData.passengerCapacity.toString()}
                  onValueChange={(value) => 
                    setPostRideData({...postRideData, passengerCapacity: parseInt(value)})
                  }
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Capacity" />
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
            
            <div>
              <Label htmlFor="cost">Cost per Person (AED)</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-maps-secondaryText" />
                <Input
                  id="cost"
                  type="number"
                  min="1"
                  value={postRideData.cost}
                  onChange={(e) => 
                    setPostRideData({...postRideData, cost: parseInt(e.target.value) || 0})
                  }
                  className={`pl-10 ${errors.cost ? "border-destructive" : ""}`}
                />
                {errors.cost && (
                  <p className="text-destructive text-xs mt-1">{errors.cost}</p>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="departureTime">Departure Time (Optional)</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-4 w-4 text-maps-secondaryText" />
              <Input
                id="departureTime"
                type="time"
                value={postRideData.departureTime || ''}
                onChange={(e) => 
                  setPostRideData({...postRideData, departureTime: e.target.value})
                }
                className="pl-10"
              />
            </div>
          </div>
          
          <Button 
            type="submit"
            className="bg-maps-green hover:bg-maps-green/90 text-white w-full h-12 mt-6"
          >
            Post Ride
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PostRideScreen;
