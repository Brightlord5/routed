import React from 'react';
import { Bus, Clock, Footprints, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TransitSuggestion } from '@/types';

interface TransitCardProps {
  transit: TransitSuggestion;
  className?: string;
}

const TransitCard: React.FC<TransitCardProps> = ({ transit, className }) => {
  return (
    <div className={cn(
      "bg-appCard/50 border border-appBorder rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300",
      "text-appTextSecondary",
      className
    )}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="bg-purple-500/20 p-2.5 rounded-full mr-3">
            <Bus className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <div className="font-semibold text-base text-purple-400">{transit.routeName}</div>
            <div className="text-xs">{transit.from} → {transit.to}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-appAccent">{transit.duration} min</div>
          <div className="text-xs">{transit.frequency}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs border-t border-appBorder pt-3">
        <div className="flex items-center">
          <CalendarDays className="h-3.5 w-3.5 mr-1.5 text-appPrimary" />
          <span>Departs: {transit.departureTime}</span>
        </div>
        <div className="flex items-center">
          <Footprints className="h-3.5 w-3.5 mr-1.5 text-appPrimary" />
          <span>{transit.walkingDistance} walk</span>
        </div>
      </div>
      
      {transit.notes && (
        <div className="mt-3 text-xs italic border-t border-appBorder pt-2">
          <strong>Note:</strong> {transit.notes}
        </div>
      )}
    </div>
  );
};

export default TransitCard;
