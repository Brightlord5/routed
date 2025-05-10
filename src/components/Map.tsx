
import React from 'react';
import { useAppContext } from '@/context/AppContext';

// This is a placeholder Map component
// In a real application, you would integrate with Google Maps or another mapping API
const Map: React.FC = () => {
  const { mode, searchCriteria, postRideData, selectedRide } = useAppContext();
  
  // Determine what map content to show based on app mode
  const getMapContent = () => {
    switch (mode) {
      case 'post':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-white text-xl font-medium mb-2 bg-gradient-to-r from-maps-blue to-purple-500 bg-clip-text text-transparent">
              Post Ride Map View
            </div>
            <div className="flex gap-3 text-sm">
              {postRideData.startLocation && (
                <div className="bg-maps-blue/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 shadow-sm animate-pulse">
                  From: {postRideData.startLocation.name}
                </div>
              )}
              {postRideData.endLocation && (
                <div className="bg-maps-blue/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 shadow-sm animate-pulse">
                  To: {postRideData.endLocation.name}
                </div>
              )}
            </div>
          </div>
        );
      
      case 'find':
        if (selectedRide) {
          return (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-white text-xl font-medium mb-2 bg-gradient-to-r from-maps-blue to-purple-500 bg-clip-text text-transparent">
                Selected Ride Route
              </div>
              <div className="text-sm text-white">
                {selectedRide.startLocation.name} → {selectedRide.endLocation.name}
              </div>
              <div className="text-xs text-white/70 mt-1">
                {selectedRide.distance} km • {selectedRide.estimatedDuration} min
              </div>
              {selectedRide.transitSuggestion && (
                <div className="text-xs text-white/70 mt-1">
                  + {selectedRide.transitSuggestion.duration} min by {selectedRide.transitSuggestion.routeName}
                </div>
              )}
            </div>
          );
        }
        
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-white text-xl font-medium mb-2 bg-gradient-to-r from-maps-blue to-purple-500 bg-clip-text text-transparent">
              Find Ride Map View
            </div>
            <div className="flex gap-3 text-sm">
              {searchCriteria.startLocation && (
                <div className="bg-maps-blue/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 shadow-sm animate-pulse">
                  From: {searchCriteria.startLocation.name}
                </div>
              )}
              {searchCriteria.endLocation && (
                <div className="bg-maps-blue/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 shadow-sm animate-pulse">
                  To: {searchCriteria.endLocation.name}
                </div>
              )}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-4xl font-bold text-white mb-2 text-shadow-lg bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Dubai Carpooling
            </div>
            <div className="text-white/90 text-lg max-w-xs text-center">
              Find or offer carpool rides around Dubai with public transport connections
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <div className="map-container bg-maps-blue/10 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/55.2708,25.2048,10,0/1200x800?access_token=pk.placeholder')] bg-cover bg-center">
        {/* Map would be rendered here with proper API integration */}
        <div className="absolute inset-0 bg-gradient-to-b from-maps-blue/30 to-purple-800/30 z-10"></div>
      </div>
      
      {/* Placeholder content */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        {getMapContent()}
      </div>
    </>
  );
};

export default Map;
