import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Check, Clock, Users, Car, CreditCard, MapPin } from 'lucide-react';

const PostConfirmationScreen: React.FC = () => {
  const { setMode, setRidePosted, lastPostedRide } = useAppContext();

  const handleGoHome = () => {
    setRidePosted(false);
    setMode('home');
  };

  const handleFindRide = () => {
    setRidePosted(false);
    setMode('find');
  };

  if (!lastPostedRide || !lastPostedRide.startLocation || !lastPostedRide.endLocation) {
    return null;
  }

  return (
    <div className="relative h-full flex flex-col bg-white/90 backdrop-blur-md animate-fade-in">
      {/* Confirmation Header */}
      <div className="z-30 p-4 flex justify-center items-center bg-white/90 backdrop-blur-md shadow-sm">
        <h1 className="font-medium text-lg bg-gradient-to-r from-maps-blue to-purple-500 bg-clip-text text-transparent">
          Ride Posted Successfully
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 p-6">
        {/* Success Icon */}
        <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <Check className="h-12 w-12 text-green-500" />
        </div>
        
        <h2 className="text-xl font-medium text-center mb-2">
          Your ride has been posted!
        </h2>
        <p className="text-maps-secondaryText text-center mb-6">
          Others can now find and book your ride
        </p>
        
        {/* Ride Summary Card */}
        <div className="w-full bg-white rounded-xl border border-slate-200 shadow-md p-5 mb-8">
          <h3 className="text-lg font-medium mb-4 bg-gradient-to-r from-maps-blue to-purple-500 bg-clip-text text-transparent">
            Ride Details
          </h3>
          
          {/* Origin and Destination */}
          <div className="flex items-start mb-4">
            <div className="mt-1 mr-3 flex flex-col items-center">
              <div className="h-3 w-3 rounded-full bg-maps-blue"></div>
              <div className="h-12 w-0.5 bg-slate-200"></div>
              <div className="h-3 w-3 rounded-full bg-maps-orange"></div>
            </div>
            <div className="flex-1">
              <div className="mb-6">
                <div className="font-medium">{lastPostedRide.startLocation.name}</div>
                <div className="text-xs text-maps-secondaryText">Pickup location</div>
              </div>
              <div>
                <div className="font-medium">{lastPostedRide.endLocation.name}</div>
                <div className="text-xs text-maps-secondaryText">Destination</div>
              </div>
            </div>
          </div>
          
          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-maps-blue" />
              <div>
                <div className="text-maps-secondaryText">Departure</div>
                <div className="font-medium">{lastPostedRide.departureTime || 'Flexible'}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-maps-blue" />
              <div>
                <div className="text-maps-secondaryText">Cost</div>
                <div className="font-medium">AED {lastPostedRide.cost}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-maps-blue" />
              <div>
                <div className="text-maps-secondaryText">Capacity</div>
                <div className="font-medium">{lastPostedRide.passengerCapacity} passengers</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Car className="h-4 w-4 mr-2 text-maps-blue" />
              <div>
                <div className="text-maps-secondaryText">Vehicle</div>
                <div className="font-medium">Your Car</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="w-full grid grid-cols-1 gap-3">
          <Button 
            className="bg-maps-blue hover:bg-maps-blue/90 text-white h-12"
            onClick={handleFindRide}
          >
            Find More Rides
          </Button>
          
          <Button 
            variant="outline"
            className="border-maps-blue/30 text-maps-blue hover:bg-maps-blue/5 h-12"
            onClick={handleGoHome}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostConfirmationScreen;
