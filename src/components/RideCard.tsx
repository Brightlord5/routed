
import React from 'react';
import { ArrowRight, Clock, CreditCard, User, Car, Bus } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { RideOffer } from '@/types';
import { Badge } from '@/components/ui/badge';
import TransitCard from './TransitCard';

interface RideCardProps {
  ride: RideOffer;
}

const RideCard: React.FC<RideCardProps> = ({ ride }) => {
  const { setSelectedRide } = useAppContext();

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-md border border-white/20 
                    hover:shadow-lg transition-all duration-300 animate-fade-in">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-medium text-maps-text bg-gradient-to-r from-maps-blue to-purple-500 bg-clip-text text-transparent">
            {ride.startLocation.name} <ArrowRight className="inline h-4 w-4 mx-1 text-maps-blue" /> {ride.endLocation.name}
          </div>
          <div className="flex items-center text-maps-secondaryText text-sm mt-1">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            {ride.departureTime ? `${ride.departureTime}, ` : ''}{ride.estimatedDuration} min • {ride.distance} km
          </div>
        </div>
        
        <Badge 
          variant="outline" 
          className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white border-none shadow-sm"
        >
          AED {ride.cost}
        </Badge>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-maps-blue/20 to-purple-500/20 rounded-full p-2 mr-3">
            <User className="h-4 w-4 text-maps-blue" />
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
            <div className="text-sm font-medium text-amber-500">{ride.availableSeats}</div>
            <div className="text-xs text-maps-secondaryText">
              {ride.availableSeats === 1 ? 'seat' : 'seats'} left
            </div>
          </div>
          
          <Button 
            className="bg-maps-orange hover:bg-maps-orange/90 text-white transform transition-transform hover:scale-105"
            onClick={() => setSelectedRide(ride)}
          >
            Select
          </Button>
        </div>
      </div>
      
      {ride.transitSuggestion && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center mb-2 text-xs text-maps-secondaryText">
            <Bus className="h-3.5 w-3.5 mr-1.5 text-maps-blue" />
            <span>Continue with public transport:</span>
          </div>
          <TransitCard transit={ride.transitSuggestion} />
        </div>
      )}
    </div>
  );
};

export default RideCard;
