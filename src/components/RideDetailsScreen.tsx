
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, CreditCard, User, Car, Calendar, MapPin, Star, Check } from 'lucide-react';
import { toast } from "sonner";

const RideDetailsScreen: React.FC = () => {
  const { selectedRide, setSelectedRide } = useAppContext();

  if (!selectedRide) return null;

  const handleBook = () => {
    toast.success("Ride booked successfully!", {
      description: "The driver has been notified of your booking.",
    });
    setTimeout(() => {
      setSelectedRide(null);
    }, 2000);
  };

  return (
    <div className="relative h-full flex flex-col bg-white animate-fade-in">
      {/* Header */}
      <div className="z-30 p-4 flex items-center bg-white shadow-sm">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2"
          onClick={() => setSelectedRide(null)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-medium text-lg">Ride Details</h1>
      </div>

      {/* Map Preview */}
      <div className="h-52 bg-gray-100 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/55.2708,25.2048,10,0/600x400?access_token=pk.placeholder')] bg-cover bg-center relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-maps-blue text-lg font-medium">
            {selectedRide.distance} km • {selectedRide.estimatedDuration} min
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Route Info */}
        <div className="space-y-2">
          <div className="flex items-start">
            <div className="mt-1 mr-3">
              <div className="h-4 w-4 rounded-full border-2 border-maps-blue bg-white"></div>
              <div className="h-8 w-0.5 mx-auto bg-gray-300"></div>
              <div className="h-4 w-4 rounded-full bg-maps-orange"></div>
            </div>
            <div className="flex-1">
              <div>
                <div className="font-medium">{selectedRide.startLocation.name}</div>
                <div className="text-xs text-maps-secondaryText">Pickup location</div>
              </div>
              <div className="mt-3">
                <div className="font-medium">{selectedRide.endLocation.name}</div>
                <div className="text-xs text-maps-secondaryText">Destination</div>
              </div>
            </div>
          </div>
        </div>

        {/* Ride Details */}
        <div className="bg-gray-50 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-maps-secondaryText">
              <Clock className="h-4 w-4 mr-2.5" />
              Departure Time
            </div>
            <div className="font-medium">{selectedRide.departureTime || "Flexible"}</div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-maps-secondaryText">
              <CreditCard className="h-4 w-4 mr-2.5" />
              Cost per Person
            </div>
            <div className="font-medium">AED {selectedRide.cost}</div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-maps-secondaryText">
              <User className="h-4 w-4 mr-2.5" />
              Available Seats
            </div>
            <div className="font-medium">{selectedRide.availableSeats} of {selectedRide.passengerCapacity}</div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-maps-secondaryText">
              <MapPin className="h-4 w-4 mr-2.5" />
              Distance
            </div>
            <div className="font-medium">{selectedRide.distance} km</div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-maps-secondaryText">
              <Clock className="h-4 w-4 mr-2.5" />
              Est. Travel Time
            </div>
            <div className="font-medium">{selectedRide.estimatedDuration} min</div>
          </div>
        </div>

        {/* Driver Info */}
        <div>
          <h3 className="text-lg font-medium mb-4">Driver Information</h3>
          <div className="flex items-center">
            <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-gray-500" />
            </div>
            <div className="ml-4">
              <div className="font-medium text-lg">{selectedRide.driverName}</div>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm ml-1">{selectedRide.rating}</span>
                <div className="mx-2 h-1 w-1 rounded-full bg-gray-300"></div>
                <Car className="h-4 w-4 text-maps-secondaryText" />
                <span className="text-sm ml-1">{selectedRide.carType}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Booking Button */}
        <Button 
          className="bg-maps-green hover:bg-maps-green/90 text-white w-full h-12 mt-4"
          onClick={handleBook}
        >
          <Check className="h-5 w-5 mr-2" />
          Book This Ride
        </Button>
      </div>
    </div>
  );
};

export default RideDetailsScreen;
