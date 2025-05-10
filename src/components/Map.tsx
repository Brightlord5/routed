
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
            <div className="text-maps-blue text-lg font-medium mb-2">Post Ride Map View</div>
            <div className="flex gap-3 text-sm">
              {postRideData.startLocation && (
                <div className="bg-maps-blue/10 px-3 py-1 rounded-full">
                  From: {postRideData.startLocation.name}
                </div>
              )}
              {postRideData.endLocation && (
                <div className="bg-maps-blue/10 px-3 py-1 rounded-full">
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
              <div className="text-maps-blue text-lg font-medium mb-2">Selected Ride Route</div>
              <div className="text-sm">
                {selectedRide.startLocation.name} → {selectedRide.endLocation.name}
              </div>
              <div className="text-xs text-maps-secondaryText mt-1">
                {selectedRide.distance} km • {selectedRide.estimatedDuration} min
              </div>
            </div>
          );
        }
        
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-maps-blue text-lg font-medium mb-2">Find Ride Map View</div>
            <div className="flex gap-3 text-sm">
              {searchCriteria.startLocation && (
                <div className="bg-maps-blue/10 px-3 py-1 rounded-full">
                  From: {searchCriteria.startLocation.name}
                </div>
              )}
              {searchCriteria.endLocation && (
                <div className="bg-maps-blue/10 px-3 py-1 rounded-full">
                  To: {searchCriteria.endLocation.name}
                </div>
              )}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-2xl font-medium text-maps-blue mb-2">Dubai Carpooling</div>
            <div className="text-maps-secondaryText text-base">
              Find or offer carpool rides around Dubai
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <div className="map-container bg-gray-100 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/55.2708,25.2048,10,0/1200x800?access_token=pk.placeholder')] bg-cover bg-center">
        {/* Map would be rendered here with proper API integration */}
      </div>
      <div className="map-overlay"></div>
      
      {/* Placeholder content */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        {getMapContent()}
      </div>
    </>
  );
};

export default Map;
