import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Card } from '@/components/ui/card';
import { Clock, User, CreditCard, Car, Star, Bus, ArrowRight } from 'lucide-react';
import { RideOffer } from '@/types';

interface RideCardProps {
  ride: RideOffer;
}

const RideCard: React.FC<RideCardProps> = ({ ride }) => {
  const { setSelectedRide } = useAppContext();

  const handleClick = () => {
    setSelectedRide(ride);
  };

  const formattedDuration = ride.estimatedDuration < 60 
    ? `${ride.estimatedDuration} min` 
    : `${Math.floor(ride.estimatedDuration / 60)}h ${ride.estimatedDuration % 60}min`;

  const hasTransit = !!ride.transitSuggestion;

  return (
    <Card 
      className="overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 cursor-pointer bg-white"
      onClick={handleClick}
    >
      <div className="p-4">
        {/* Route information */}
        <div className="flex items-start mb-3">
          <div className="mt-1 mr-3 flex flex-col items-center">
            <div className="h-3 w-3 rounded-full bg-maps-blue"></div>
            <div className="h-8 w-0.5 bg-slate-200"></div>
            <div className="h-3 w-3 rounded-full bg-maps-orange"></div>
            {hasTransit && (
              <>
                <div className="h-6 w-0.5 bg-slate-200"></div>
                <div className="h-3 w-3 rounded-full bg-purple-500"></div>
              </>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm truncate">{ride.startLocation.name}</div>
            <div className="font-medium text-sm truncate mt-7">{ride.endLocation.name}</div>
            {hasTransit && (
              <div className="font-medium text-xs text-purple-600 truncate mt-4 flex items-center">
                <Bus className="h-3 w-3 mr-1" />
                <span>+ {ride.transitSuggestion?.routeName} to {ride.transitSuggestion?.to}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Key information */}
        <div className="flex justify-between mb-3">
          <div className="flex items-center text-sm text-maps-secondaryText">
            <Clock className="h-3.5 w-3.5 mr-1 text-maps-blue" />
            {ride.departureTime || 'Flexible'}
          </div>
          <div className="flex items-center text-sm font-medium text-amber-500">
            <CreditCard className="h-3.5 w-3.5 mr-1" />
            AED {ride.cost}
          </div>
        </div>
        
        {/* Additional information */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-slate-100 rounded-full flex items-center justify-center mr-2">
              <User className="h-4 w-4 text-maps-secondaryText" />
            </div>
            <div className="text-sm">
              <div className="font-medium">{ride.driverName}</div>
              <div className="flex items-center">
                <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                <span className="text-xs ml-0.5">{ride.rating}</span>
              </div>
            </div>
          </div>
          
          <div className="space-x-2">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">
              <Car className="h-3 w-3 mr-1" />
              {formattedDuration}
            </span>
            {hasTransit && (
              <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-1 text-xs text-purple-700">
                <Bus className="h-3 w-3 mr-1" />
                <span>+{ride.transitSuggestion?.duration} min</span>
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Card Footer */}
      <div className={`flex items-center justify-between px-4 py-2 text-xs font-medium ${hasTransit ? 'bg-purple-50' : 'bg-blue-50'}`}>
        <div className="text-maps-secondaryText">
          {ride.carType} • {ride.availableSeats} seat{ride.availableSeats !== 1 ? 's' : ''} available
        </div>
        <div className={`flex items-center ${hasTransit ? 'text-purple-700' : 'text-maps-blue'}`}>
          View Details
          <ArrowRight className="h-3 w-3 ml-1" />
        </div>
      </div>
    </Card>
  );
};

export default RideCard;
