import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Card } from '@/components/ui/card';
import { Clock, User, Car, Star, Bus, ArrowRight, MapPin, Users as PassengerIcon, Tag, Leaf } from 'lucide-react';
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
      className="overflow-hidden border border-appBorder hover:border-appPrimary/50 bg-appCard text-appText shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer rounded-xl group"
      onClick={handleClick}
    >
      <div className="p-5">
        {/* Route information & Price */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start">
            <div className="mt-1 mr-4 flex flex-col items-center">
              <MapPin className="h-5 w-5 text-appPrimary" />
              <div className="h-10 w-0.5 bg-appBorder my-1"></div>
              <MapPin className="h-5 w-5 text-appAccent" />
              {hasTransit && (
                <>
                  <div className="h-6 w-0.5 bg-appBorder my-1"></div>
                  <Bus className="h-5 w-5 text-purple-400" />
                </>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-base truncate group-hover:text-appPrimary transition-colors">{ride.startLocation.name}</div>
              <div className="text-xs text-appTextSecondary mb-3">Pickup</div>
              <div className="font-semibold text-base truncate group-hover:text-appAccent transition-colors">{ride.endLocation.name}</div>
              <div className="text-xs text-appTextSecondary">Drop-off</div>
              {hasTransit && (
                <div className="font-medium text-xs text-purple-400 truncate mt-3 flex items-center">
                  <Bus className="h-3.5 w-3.5 mr-1.5" />
                  <span>+ {ride.transitSuggestion?.routeName} to {ride.transitSuggestion?.to}</span>
                </div>
              )}
            </div>
          </div>
          <div className="text-right flex flex-col items-end">
            <div className="text-2xl font-bold text-appAccent mb-1">AED {ride.cost}</div>
            <div className="text-xs text-appTextSecondary">per seat</div>
          </div>
        </div>
        
        {/* Driver & Ride Details */}
        <div className="border-t border-appBorder pt-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-appBorder rounded-full flex items-center justify-center mr-3">
                <User className="h-5 w-5 text-appTextSecondary" />
              </div>
              <div>
                <div className="font-semibold text-sm">{ride.driverName}</div>
                <div className="flex items-center text-xs text-appTextSecondary">
                  <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400 mr-1" />
                  <span>{ride.rating}</span>
                  <span className="mx-1.5">•</span>
                  <span>{ride.carType}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center text-appTextSecondary">
                <Clock className="h-4 w-4 mr-1 text-appPrimary" />
                {ride.departureTime || 'Flexible'}
              </div>
              <div className="flex items-center text-appTextSecondary">
                <PassengerIcon className="h-4 w-4 mr-1 text-appPrimary" /> 
                {ride.availableSeats} seat{ride.availableSeats !== 1 ? 's' : ''} left
              </div>
            </div>
          </div>

          {/* Journey time tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center rounded-full bg-appPrimary/10 px-2.5 py-1 text-xs font-medium text-appPrimary">
              <Car className="h-3.5 w-3.5 mr-1.5" />
              Carpool: {formattedDuration}
            </span>
            {hasTransit && (
              <span className="inline-flex items-center rounded-full bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-400">
                <Bus className="h-3.5 w-3.5 mr-1.5" />
                Transit: {ride.transitSuggestion?.duration} min
              </span>
            )}
            {ride.co2EmissionsSaved && (
              <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-500">
                <Leaf className="h-3.5 w-3.5 mr-1.5" />
                Saves {ride.co2EmissionsSaved.toFixed(2)} kg CO₂
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Card Footer - View Details Button (Full Width) */}
      <div className="bg-appCard border-t border-appBorder group-hover:bg-appPrimary/10 transition-colors px-5 py-3">
        <div className={`flex items-center justify-center text-sm font-semibold text-appPrimary group-hover:text-appPrimaryHover`}>
          View Details
          <ArrowRight className="h-4 w-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Card>
  );
};

export default RideCard;
