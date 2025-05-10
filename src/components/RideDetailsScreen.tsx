import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, CreditCard, User, Car, Calendar, MapPin, Star, Check, Bus, Footprints } from 'lucide-react';
import { toast } from "sonner";
import TransitCard from './TransitCard';

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

  const hasTransit = !!selectedRide.transitSuggestion;

  return (
    <div className="relative h-full flex flex-col bg-white/90 backdrop-blur-md animate-fade-in">
      {/* Header */}
      <div className="z-30 p-4 flex items-center bg-white/90 backdrop-blur-md shadow-sm">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2"
          onClick={() => setSelectedRide(null)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-medium text-lg bg-gradient-to-r from-maps-blue to-purple-500 bg-clip-text text-transparent">Ride Details</h1>
      </div>

      {/* Map Preview */}
      <div className="h-52 bg-maps-blue/10 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/55.2708,25.2048,10,0/600x400?access_token=pk.placeholder')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-maps-blue/20 to-purple-500/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-lg font-medium px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm">
            {selectedRide.distance} km • {selectedRide.estimatedDuration} min
            {hasTransit && (
              <span className="ml-2 text-sm">
                + {selectedRide.transitSuggestion?.duration} min transit
              </span>
            )}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/70 to-transparent"></div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Route Info */}
        <div className="space-y-2">
          <div className="flex items-start">
            <div className="mt-1 mr-3">
              <div className="h-4 w-4 rounded-full border-2 border-maps-blue bg-white shadow-glow"></div>
              <div className="h-8 w-0.5 mx-auto bg-gradient-to-b from-maps-blue to-maps-blue/30"></div>
              <div className="h-4 w-4 rounded-full bg-maps-orange shadow-glow"></div>
              {hasTransit && (
                <>
                  <div className="h-8 w-0.5 mx-auto bg-gradient-to-b from-maps-orange/30 to-purple-500/70"></div>
                  <div className="h-4 w-4 rounded-full bg-purple-500 shadow-glow"></div>
                </>
              )}
            </div>
            <div className="flex-1">
              <div>
                <div className="font-medium">{selectedRide.startLocation.name}</div>
                <div className="text-xs text-maps-secondaryText">Carpool pickup location</div>
              </div>
              <div className="mt-3">
                <div className="font-medium">{selectedRide.endLocation.name}</div>
                <div className="text-xs text-maps-secondaryText">
                  {hasTransit ? 'Carpool dropoff, transfer to public transport' : 'Destination'}
                </div>
              </div>
              {hasTransit && (
                <div className="mt-3">
                  <div className="font-medium">{selectedRide.transitSuggestion?.to}</div>
                  <div className="text-xs text-maps-secondaryText">Final destination</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ride Details */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 space-y-4 border border-white/30 shadow-md">
          <div className="text-lg font-medium mb-4 bg-gradient-to-r from-maps-blue to-purple-500 bg-clip-text text-transparent">Carpool Details</div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-maps-secondaryText">
              <Clock className="h-4 w-4 mr-2.5 text-maps-blue" />
              Departure Time
            </div>
            <div className="font-medium">{selectedRide.departureTime || "Flexible"}</div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-maps-secondaryText">
              <CreditCard className="h-4 w-4 mr-2.5 text-maps-blue" />
              Cost per Person
            </div>
            <div className="font-medium text-amber-500">AED {selectedRide.cost}</div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-maps-secondaryText">
              <User className="h-4 w-4 mr-2.5 text-maps-blue" />
              Available Seats
            </div>
            <div className="font-medium">{selectedRide.availableSeats} of {selectedRide.passengerCapacity}</div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-maps-secondaryText">
              <MapPin className="h-4 w-4 mr-2.5 text-maps-blue" />
              Distance
            </div>
            <div className="font-medium">{selectedRide.distance} km</div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-maps-secondaryText">
              <Clock className="h-4 w-4 mr-2.5 text-maps-blue" />
              Est. Travel Time
            </div>
            <div className="font-medium">{selectedRide.estimatedDuration} min</div>
          </div>
        </div>

        {/* Transit Suggestion */}
        {hasTransit && (
          <div className="space-y-3">
            <div className="text-lg font-medium bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Public Transit Connection
            </div>
            <TransitCard transit={selectedRide.transitSuggestion!} />
            <div className="text-xs text-maps-secondaryText italic px-1">
              After your carpool ride, continue to your final destination using this public transit option.
            </div>
          </div>
        )}

        {/* Driver Info */}
        <div>
          <h3 className="text-lg font-medium mb-4 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">Driver Information</h3>
          <div className="flex items-center bg-white/60 p-4 rounded-lg border border-white/30 shadow-sm">
            <div className="h-16 w-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-gray-500" />
            </div>
            <div className="ml-4">
              <div className="font-medium text-lg">{selectedRide.driverName}</div>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
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
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700
                    text-white w-full h-14 mt-4 shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-[1.02]"
          onClick={handleBook}
        >
          <Check className="h-5 w-5 mr-2" />
          Book This Ride
        </Button>
        
        {/* Total Journey Summary */}
        {hasTransit && (
          <div className="text-center text-sm text-maps-secondaryText">
            <span className="block font-medium">Total Journey:</span>
            <span>
              {selectedRide.estimatedDuration + (selectedRide.transitSuggestion?.duration || 0)} min
              ({selectedRide.estimatedDuration} min carpool + {selectedRide.transitSuggestion?.duration} min transit)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideDetailsScreen;
