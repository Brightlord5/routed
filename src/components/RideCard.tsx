
import React from 'react';
import { ArrowRight, Clock, CreditCard, User, Car } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { RideOffer } from '@/types';
import { Badge } from '@/components/ui/badge';

interface RideCardProps {
  ride: RideOffer;
}

const RideCard: React.FC<RideCardProps> = ({ ride }) => {
  const { setSelectedRide } = useAppContext();

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 animate-fade-in">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-medium text-maps-text">
            {ride.startLocation.name} <ArrowRight className="inline h-4 w-4 mx-1" /> {ride.endLocation.name}
          </div>
          <div className="flex items-center text-maps-secondaryText text-sm mt-1">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            {ride.departureTime ? `${ride.departureTime}, ` : ''}{ride.estimatedDuration} min • {ride.distance} km
          </div>
        </div>
        
        <Badge 
          variant="outline" 
          className="bg-maps-blue/5 text-maps-blue border-maps-blue/20"
        >
          AED {ride.cost}
        </Badge>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-gray-100 rounded-full p-2 mr-3">
            <User className="h-4 w-4 text-maps-text" />
          </div>
          <div>
            <div className="text-sm font-medium">{ride.driverName}</div>
            <div className="flex items-center">
              <Car className="h-3 w-3 mr-1 text-maps-secondaryText" />
              <span className="text-xs text-maps-secondaryText">{ride.carType}</span>
              <div className="mx-1.5 h-1 w-1 rounded-full bg-gray-300"></div>
              <span className="text-xs text-maps-secondaryText">★ {ride.rating}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="text-right mr-4">
            <div className="text-sm font-medium">{ride.availableSeats}</div>
            <div className="text-xs text-maps-secondaryText">
              {ride.availableSeats === 1 ? 'seat' : 'seats'} left
            </div>
          </div>
          
          <Button 
            className="bg-maps-orange hover:bg-maps-orange/90 text-white"
            onClick={() => setSelectedRide(ride)}
          >
            Select
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RideCard;
