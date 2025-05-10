import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, User, Car, Calendar, MapPin, Star, Check, Bus, Users as PassengerIcon, Tag, DollarSign } from 'lucide-react';
import { toast } from "sonner";
import TransitCard from './TransitCard';

const RideDetailsScreen: React.FC = () => {
  const { selectedRide, setSelectedRide } = useAppContext();

  if (!selectedRide) return null;

  const handleBook = () => {
    toast.success("Ride booked successfully!", {
      description: `You've booked a ride with ${selectedRide.driverName}. Details sent to your notifications.`,
      style: {
        background: 'var(--appCard)',
        color: 'var(--appText)',
        border: '1px solid var(--appBorder)'
      }
    });
    // setTimeout(() => {
    //   setSelectedRide(null); // Optionally go back or to a bookings screen
    // }, 2500);
  };

  const hasTransit = !!selectedRide.transitSuggestion;

  return (
    <div className="relative h-full flex flex-col bg-appBackground text-appText animate-fade-in">
      {/* Header */}
      <div className="z-30 p-4 flex items-center bg-appCard/80 backdrop-blur-md shadow-lg border-b border-appBorder">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2 text-appTextSecondary hover:text-appPrimary hover:bg-appPrimary/10 rounded-full"
          onClick={() => setSelectedRide(null)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-semibold text-xl">Ride Details</h1>
      </div>

      {/* Map Preview - Placeholder or static image for now */}
      <div className="h-56 bg-appCard border-b border-appBorder relative bg-cover bg-center"
           style={{ backgroundImage: `url(https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/55.2708,25.2048,10,0/600x300?access_token=pk.placeholder&attribution=false&logo=false)` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-appBackground via-appBackground/70 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 text-center">
            <div className="text-white text-lg font-semibold px-4 py-2 rounded-lg bg-black/50 backdrop-blur-sm">
                {selectedRide.distance} km • {selectedRide.estimatedDuration} min carpool
                {hasTransit && <span className="block text-xs"> + {selectedRide.transitSuggestion?.duration} min transit</span>}
            </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Route Info */}
        <div className="space-y-3 bg-appCard p-5 rounded-xl border border-appBorder shadow-lg">
          <div className="flex items-start">
            <div className="mt-1 mr-3 flex flex-col items-center">
              <MapPin className="h-5 w-5 text-appPrimary" />
              <div className="h-12 w-0.5 bg-appBorder my-1.5"></div>
              <MapPin className="h-5 w-5 text-appAccent" />
              {hasTransit && (
                <>
                  <div className="h-10 w-0.5 bg-appBorder my-1.5"></div>
                  <Bus className="h-5 w-5 text-purple-400" />
                </>
              )}
            </div>
            <div className="flex-1">
              <div>
                <div className="font-semibold text-appText">{selectedRide.startLocation.name}</div>
                <div className="text-xs text-appTextSecondary">Carpool pickup</div>
              </div>
              <div className="mt-4">
                <div className="font-semibold text-appText">{selectedRide.endLocation.name}</div>
                <div className="text-xs text-appTextSecondary">{hasTransit ? 'Carpool dropoff / Transit connection' : 'Final Destination'}</div>
              </div>
              {hasTransit && selectedRide.transitSuggestion && (
                <div className="mt-4">
                  <div className="font-semibold text-purple-400">{selectedRide.transitSuggestion.to}</div>
                  <div className="text-xs text-appTextSecondary">Transit destination</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ride Details Section */}
        <div className="bg-appCard p-5 rounded-xl border border-appBorder shadow-lg space-y-4">
          <h3 className="text-lg font-semibold text-appPrimary mb-2">Carpool Details</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <div className="flex items-center"><Clock className="h-4 w-4 mr-2 text-appAccent" /><div><span className="text-appTextSecondary">Departure:</span> {selectedRide.departureTime || "Flexible"}</div></div>
            <div className="flex items-center"><DollarSign className="h-4 w-4 mr-2 text-appAccent" /><div><span className="text-appTextSecondary">Cost:</span> AED {selectedRide.cost}</div></div>
            <div className="flex items-center"><PassengerIcon className="h-4 w-4 mr-2 text-appAccent" /><div><span className="text-appTextSecondary">Seats:</span> {selectedRide.availableSeats} / {selectedRide.passengerCapacity}</div></div>
            <div className="flex items-center"><Car className="h-4 w-4 mr-2 text-appAccent" /><div><span className="text-appTextSecondary">Vehicle:</span> {selectedRide.carType}</div></div>
            <div className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-appAccent" /><div><span className="text-appTextSecondary">Distance:</span> {selectedRide.distance} km</div></div>
            <div className="flex items-center"><Clock className="h-4 w-4 mr-2 text-appAccent" /><div><span className="text-appTextSecondary">Time:</span> {selectedRide.estimatedDuration} min</div></div>
          </div>
        </div>

        {/* Transit Suggestion */}
        {hasTransit && selectedRide.transitSuggestion && (
          <div className="bg-appCard p-5 rounded-xl border border-appBorder shadow-lg space-y-3">
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Public Transit Connection</h3>
            <TransitCard transit={selectedRide.transitSuggestion} />
            <p className="text-xs text-appTextSecondary italic px-1">
              Continue your journey using this public transit option after your carpool.
            </p>
          </div>
        )}

        {/* Driver Info */}
        <div className="bg-appCard p-5 rounded-xl border border-appBorder shadow-lg">
          <h3 className="text-lg font-semibold text-appPrimary mb-3">Driver Information</h3>
          <div className="flex items-center">
            <div className="h-12 w-12 bg-appBorder rounded-full flex items-center justify-center mr-4">
              <User className="h-6 w-6 text-appTextSecondary" />
            </div>
            <div>
              <div className="font-semibold text-lg text-appText">{selectedRide.driverName}</div>
              <div className="flex items-center text-sm text-appTextSecondary mt-0.5">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="ml-1">{selectedRide.rating} average rating</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Booking Button - Sticky at bottom if screen too short, otherwise inline */}
      </div>
      <div className="p-4 bg-appCard border-t border-appBorder shadow-top-lg sticky bottom-0">
        <Button 
          className="w-full bg-appAccent hover:bg-appAccentHover text-appBackground font-bold h-14 text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          onClick={handleBook}
        >
          <Check className="h-5 w-5 mr-2.5" />
          Book This Ride (AED {selectedRide.cost})
        </Button>
      </div>
    </div>
  );
};

export default RideDetailsScreen;
