import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Users, CreditCard, DollarSign } from 'lucide-react';
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
import DatabaseService from '@/lib/database';
import { toast } from "sonner";

const PostRideScreen: React.FC = () => {
  const { postRideData, setPostRideData, setMode, setRidePosted, setLastPostedRide } = useAppContext();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!postRideData.startLocation) newErrors.startLocation = 'Starting location is required';
    if (!postRideData.endLocation) newErrors.endLocation = 'Destination location is required';
    if (postRideData.cost <= 0) newErrors.cost = 'Cost must be a positive number';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newRide = DatabaseService.addRide(postRideData);
      if (newRide) {
        setLastPostedRide({...postRideData});
        setRidePosted(true);
        toast.success("Ride posted successfully!", { 
          description: "Your ride is now visible to others.",
          style: {
            background: '#2D3748', // Solid appCard color
            color: '#E2E8F0', // Solid appText color
            border: '1px solid #4A5568', // Solid appBorder color
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', // Add stronger shadow
            fontWeight: '500' // Make text slightly bolder
          }
        });
      } else {
        toast.error("Failed to post ride", { 
          description: "Please check your details and try again.",
          style: {
            background: '#2D3748', // Solid appCard color
            color: '#E2E8F0', // Solid appText color
            border: '1px solid #4A5568', // Solid appBorder color with red tint
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', // Add stronger shadow
            fontWeight: '500' // Make text slightly bolder
          }
        });
      }
    }
  };

  return (
    <div className="relative h-full flex flex-col bg-appBackground text-appText">
      {/* Header */}
      <div className="z-30 p-4 flex items-center bg-appCard/80 backdrop-blur-md shadow-lg border-b border-appBorder">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2 text-appTextSecondary hover:text-appPrimary hover:bg-appPrimary/10 rounded-full"
          onClick={() => setMode('home')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-semibold text-xl">Post a Ride</h1>
      </div>

      {/* Form Section */} 
      <div className="flex-1 overflow-y-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
          <div>
            <Label htmlFor="startLocation" className="text-sm font-medium text-appTextSecondary mb-1 block">Starting Location</Label>
            <LocationInput
              placeholder="Enter pickup location"
              value={postRideData.startLocation}
              onChange={(location) => setPostRideData({...postRideData, startLocation: location})}
              className={errors.startLocation ? "border-red-500" : ""}
            />
            {errors.startLocation && <p className="text-red-400 text-xs mt-1">{errors.startLocation}</p>}
          </div>
          
          <div>
            <Label htmlFor="endLocation" className="text-sm font-medium text-appTextSecondary mb-1 block">Destination</Label>
            <LocationInput
              placeholder="Enter destination"
              value={postRideData.endLocation}
              onChange={(location) => setPostRideData({...postRideData, endLocation: location})}
              className={errors.endLocation ? "border-red-500" : ""}
            />
            {errors.endLocation && <p className="text-red-400 text-xs mt-1">{errors.endLocation}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="capacity" className="text-sm font-medium text-appTextSecondary mb-1 block">Passenger Capacity</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-appTextSecondary" />
                <Select value={postRideData.passengerCapacity.toString()} onValueChange={(value) => setPostRideData({...postRideData, passengerCapacity: parseInt(value)})}>
                  <SelectTrigger className="pl-10 bg-appCard border-appBorder focus:ring-appPrimary focus:border-appPrimary text-appText">
                    <SelectValue placeholder="Capacity" />
                  </SelectTrigger>
                  <SelectContent className="bg-appCard border-appBorder text-appText">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()} className="hover:bg-appPrimary/20 focus:bg-appPrimary/30">
                        {num} {num === 1 ? 'seat' : 'seats'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="cost" className="text-sm font-medium text-appTextSecondary mb-1 block">Cost per Person (AED)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-appTextSecondary" />
                <Input id="cost" type="number" min="1" value={postRideData.cost}
                  onChange={(e) => setPostRideData({...postRideData, cost: parseInt(e.target.value) || 0})}
                  className={`pl-10 bg-appCard border-appBorder focus:ring-appPrimary focus:border-appPrimary text-appText ${errors.cost ? "border-red-500" : ""}`}
                />
              </div>
              {errors.cost && <p className="text-red-400 text-xs mt-1">{errors.cost}</p>}
            </div>
          </div>
          
          <div>
            <Label htmlFor="departureTime" className="text-sm font-medium text-appTextSecondary mb-1 block">Departure Time (Optional)</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-appTextSecondary" />
              <Input id="departureTime" type="time" value={postRideData.departureTime || ''}
                onChange={(e) => setPostRideData({...postRideData, departureTime: e.target.value})}
                className="pl-10 bg-appCard border-appBorder focus:ring-appPrimary focus:border-appPrimary text-appText" />
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-appAccent hover:bg-appAccentHover text-appBackground font-semibold h-12 text-lg rounded-lg mt-8">
            Post Your Ride
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PostRideScreen;

