
import React from 'react';
import { Bus, Clock, Walking } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TransitSuggestion } from '@/types';

interface TransitCardProps {
  transit: TransitSuggestion;
  className?: string;
}

const TransitCard: React.FC<TransitCardProps> = ({ transit, className }) => {
  return (
    <div className={cn(
      "bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg p-4 shadow-md",
      "hover:shadow-lg transition-all duration-300 animate-fade-in",
      className
    )}>
      <div className="flex items-center mb-2">
        <div className="bg-maps-blue/10 p-2 rounded-full mr-3">
          <Bus className="h-4 w-4 text-maps-blue animate-pulse" />
        </div>
        <div className="flex-1">
          <div className="font-medium text-maps-text">
            {transit.routeName}
          </div>
          <div className="text-xs text-maps-secondaryText">
            {transit.from} → {transit.to}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-maps-orange">
            {transit.duration} min
          </div>
          <div className="text-xs text-maps-secondaryText">
            {transit.frequency}
          </div>
        </div>
      </div>
      
      <div className="flex items-center text-xs text-maps-secondaryText">
        <Clock className="h-3 w-3 mr-1" />
        <span>Departs: {transit.departureTime}</span>
        <div className="mx-2 h-1 w-1 rounded-full bg-gray-300"></div>
        <Walking className="h-3 w-3 mr-1" />
        <span>{transit.walkingDistance} walking</span>
      </div>
      
      {transit.notes && (
        <div className="mt-2 text-xs italic text-maps-secondaryText">
          {transit.notes}
        </div>
      )}
    </div>
  );
};

export default TransitCard;
