
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, Users, CreditCard, ArrowRight } from 'lucide-react';

const PostConfirmationScreen: React.FC = () => {
  const { lastPostedRide, setMode, setRidePosted } = useAppContext();

  const handleDone = () => {
    setRidePosted(false);
    setMode('home');
  };

  const handlePostAnother = () => {
    setRidePosted(false);
  };

  if (!lastPostedRide) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-40 bg-white flex flex-col">
      {/* Header */}
      <div className="z-50 p-4 flex items-center justify-center bg-white shadow-sm">
        <h1 className="font-medium text-lg">Ride Posted</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 animate-scale-in">
        <CheckCircle2 className="h-20 w-20 text-maps-green mb-6" />
        
        <h2 className="text-2xl font-bold text-center mb-2">
          Your ride has been posted!
        </h2>
        
        <p className="text-maps-secondaryText text-center mb-8">
          Your carpool offer is now available for commuters to book.
        </p>

        <div className="w-full bg-gray-50 rounded-xl p-6 mb-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="text-maps-secondaryText">Route</div>
              <div className="font-medium text-right">
                {lastPostedRide.startLocation?.name} <ArrowRight className="inline h-4 w-4 mx-1" /> {lastPostedRide.endLocation?.name}
              </div>
            </div>
            
            {lastPostedRide.departureTime && (
              <div className="flex justify-between items-center">
                <div className="flex items-center text-maps-secondaryText">
                  <Clock className="h-4 w-4 mr-2" />
                  Departure Time
                </div>
                <div className="font-medium">{lastPostedRide.departureTime}</div>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <div className="flex items-center text-maps-secondaryText">
                <Users className="h-4 w-4 mr-2" />
                Passenger Capacity
              </div>
              <div className="font-medium">{lastPostedRide.passengerCapacity}</div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center text-maps-secondaryText">
                <CreditCard className="h-4 w-4 mr-2" />
                Ride Cost
              </div>
              <div className="font-medium">AED {lastPostedRide.cost} / person</div>
            </div>
          </div>
        </div>

        <div className="w-full space-y-4">
          <Button 
            onClick={handlePostAnother}
            className="bg-maps-blue hover:bg-maps-blue/90 text-white w-full h-12"
          >
            Post Another Ride
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleDone}
            className="w-full h-12 border-maps-blue text-maps-blue hover:bg-maps-blue/5"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostConfirmationScreen;
