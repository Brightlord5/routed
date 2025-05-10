import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft, Clock, Users, Car, DollarSign, MapPin } from 'lucide-react';

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
    // This should ideally not happen if ridePosted is true, but good for safety
    return (
      <div className="h-full flex flex-col items-center justify-center bg-appBackground text-appText p-6">
        <h2 className="text-xl font-semibold mb-2">Error</h2>
        <p className="text-appTextSecondary text-center mb-4">Ride details not found. Please try posting again.</p>
        <Button onClick={handleGoHome} className="bg-appPrimary hover:bg-appPrimaryHover text-white">
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="relative h-full flex flex-col bg-appBackground text-appText animate-fade-in">
      {/* Header - Minimal to keep focus on confirmation */}
      <div className="p-4 flex items-center justify-center bg-appCard/80 backdrop-blur-md shadow-lg border-b border-appBorder">
        <h1 className="font-semibold text-xl text-appAccent">Ride Posted!</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
        <div className="h-28 w-28 rounded-full bg-appAccent/20 flex items-center justify-center animate-scale-in">
          <Check className="h-16 w-16 text-appAccent" />
        </div>
        
        <h2 className="text-2xl font-bold text-center text-appText">
          Your Ride is Live!
        </h2>
        <p className="text-appTextSecondary text-center max-w-sm">
          Sit back and relax. Commuters can now find and book your offered ride.
        </p>
        
        {/* Ride Summary Card */}
        <div className="w-full max-w-md bg-appCard rounded-xl border border-appBorder shadow-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-appPrimary text-center mb-3">Your Ride Summary</h3>
          
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-3 text-appPrimary flex-shrink-0" />
            <div className="text-sm">
              <span className="font-medium text-appTextSecondary">From: </span>{lastPostedRide.startLocation.name}
            </div>
          </div>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-3 text-appAccent flex-shrink-0" />
            <div className="text-sm">
              <span className="font-medium text-appTextSecondary">To: </span>{lastPostedRide.endLocation.name}
            </div>
          </div>
          
          <div className="border-t border-appBorder my-3"></div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-appTextSecondary" />
              <span className="font-medium">{lastPostedRide.departureTime || 'Flexible'}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-appTextSecondary" />
              <span className="font-medium">AED {lastPostedRide.cost}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-appTextSecondary" />
              <span className="font-medium">{lastPostedRide.passengerCapacity} seats</span>
            </div>
            <div className="flex items-center">
              <Car className="h-4 w-4 mr-2 text-appTextSecondary" />
              <span className="font-medium">Your Car</span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="w-full max-w-md flex flex-col sm:flex-row gap-3 pt-4">
          <Button 
            className="flex-1 bg-appPrimary hover:bg-appPrimaryHover text-white font-semibold h-12 rounded-lg"
            onClick={handleFindRide}
          >
            Find Other Rides
          </Button>
          
          <Button 
            variant="outline"
            className="flex-1 border-appAccent text-appAccent hover:bg-appAccent/10 hover:text-appAccent font-semibold h-12 rounded-lg"
            onClick={handleGoHome}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostConfirmationScreen;
