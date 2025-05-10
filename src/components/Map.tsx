import React from 'react';
import { useAppContext } from '@/context/AppContext';

// This is a placeholder Map component
// In a real application, you would integrate with Google Maps or another mapping API
const Map: React.FC = () => {
  const { mode, searchCriteria, postRideData, selectedRide } = useAppContext();
  
  // Get map coordinates based on current context
  const getMapCoordinates = () => {
    if (selectedRide) {
      // If a ride is selected, center the map between the start and end locations
      const startLat = selectedRide.startLocation.coordinates[1];
      const startLng = selectedRide.startLocation.coordinates[0];
      const endLat = selectedRide.endLocation.coordinates[1];
      const endLng = selectedRide.endLocation.coordinates[0];
      
      // Center point between the two locations
      const centerLat = (startLat + endLat) / 2;
      const centerLng = (startLng + endLng) / 2;
      
      return `${centerLng},${centerLat},11`;
    } else if (mode === 'find' && searchCriteria.startLocation && searchCriteria.endLocation) {
      // If in find mode with both locations set
      const startLat = searchCriteria.startLocation.coordinates[1];
      const startLng = searchCriteria.startLocation.coordinates[0];
      const endLat = searchCriteria.endLocation.coordinates[1];
      const endLng = searchCriteria.endLocation.coordinates[0];
      
      // Center point between the two locations
      const centerLat = (startLat + endLat) / 2;
      const centerLng = (startLng + endLng) / 2;
      
      return `${centerLng},${centerLat},11`;
    } else if (mode === 'post' && postRideData.startLocation && postRideData.endLocation) {
      // If in post mode with both locations set
      const startLat = postRideData.startLocation.coordinates[1];
      const startLng = postRideData.startLocation.coordinates[0];
      const endLat = postRideData.endLocation.coordinates[1];
      const endLng = postRideData.endLocation.coordinates[0];
      
      // Center point between the two locations
      const centerLat = (startLat + endLat) / 2;
      const centerLng = (startLng + endLng) / 2;
      
      return `${centerLng},${centerLat},11`;
    } else if (mode === 'find' && searchCriteria.startLocation) {
      // If only start location is set in find mode
      return `${searchCriteria.startLocation.coordinates[0]},${searchCriteria.startLocation.coordinates[1]},12`;
    } else if (mode === 'post' && postRideData.startLocation) {
      // If only start location is set in post mode
      return `${postRideData.startLocation.coordinates[0]},${postRideData.startLocation.coordinates[1]},12`;
    } else {
      // Default to Dubai downtown area
      return '55.2708,25.2048,10';
    }
  };

  // Get path for the route if we have start and end points
  const getPathGeometry = () => {
    let startLocation;
    let endLocation;

    if (selectedRide) {
      startLocation = selectedRide.startLocation;
      endLocation = selectedRide.endLocation;
    } else if (mode === 'find' && searchCriteria.startLocation && searchCriteria.endLocation) {
      startLocation = searchCriteria.startLocation;
      endLocation = searchCriteria.endLocation;
    } else if (mode === 'post' && postRideData.startLocation && postRideData.endLocation) {
      startLocation = postRideData.startLocation;
      endLocation = postRideData.endLocation;
    } else {
      return '';
    }

    const startLng = startLocation.coordinates[0];
    const startLat = startLocation.coordinates[1];
    const endLng = endLocation.coordinates[0];
    const endLat = endLocation.coordinates[1];

    // Generate a simple path between the points
    return `path-2+3E77FF-0.5+FF6B00-0.5(${startLng},${startLat}|${endLng},${endLat})`;
  };

  // Create the full map URL
  const getMapUrl = () => {
    const coordinates = getMapCoordinates();
    const pathGeometry = getPathGeometry();
    const markers = [];
    
    // Add markers for start and end points
    if (selectedRide) {
      // Selected ride markers
      const startLng = selectedRide.startLocation.coordinates[0];
      const startLat = selectedRide.startLocation.coordinates[1];
      const endLng = selectedRide.endLocation.coordinates[0];
      const endLat = selectedRide.endLocation.coordinates[1];
      
      markers.push(`pin-s-a+3E77FF(${startLng},${startLat})`);
      markers.push(`pin-s-b+FF6B00(${endLng},${endLat})`);
      
      // Add transit endpoint marker if available
      if (selectedRide.transitSuggestion) {
        // For simplicity, we'll just place the transit marker a bit offset from the end location
        // In a real app, this would be the actual transit connection point
        const transitLng = endLng + 0.01;
        const transitLat = endLat + 0.01;
        markers.push(`pin-s-c+9333EA(${transitLng},${transitLat})`);
      }
    } else if (mode === 'find' && searchCriteria.startLocation && searchCriteria.endLocation) {
      // Find mode markers
      const startLng = searchCriteria.startLocation.coordinates[0];
      const startLat = searchCriteria.startLocation.coordinates[1];
      const endLng = searchCriteria.endLocation.coordinates[0];
      const endLat = searchCriteria.endLocation.coordinates[1];
      
      markers.push(`pin-s-a+3E77FF(${startLng},${startLat})`);
      markers.push(`pin-s-b+FF6B00(${endLng},${endLat})`);
    } else if (mode === 'post' && postRideData.startLocation && postRideData.endLocation) {
      // Post mode markers
      const startLng = postRideData.startLocation.coordinates[0];
      const startLat = postRideData.startLocation.coordinates[1];
      const endLng = postRideData.endLocation.coordinates[0];
      const endLat = postRideData.endLocation.coordinates[1];
      
      markers.push(`pin-s-a+3E77FF(${startLng},${startLat})`);
      markers.push(`pin-s-b+FF6B00(${endLng},${endLat})`);
    } else if (mode === 'find' && searchCriteria.startLocation) {
      // Only start location in find mode
      const lng = searchCriteria.startLocation.coordinates[0];
      const lat = searchCriteria.startLocation.coordinates[1];
      markers.push(`pin-s-a+3E77FF(${lng},${lat})`);
    } else if (mode === 'post' && postRideData.startLocation) {
      // Only start location in post mode
      const lng = postRideData.startLocation.coordinates[0];
      const lat = postRideData.startLocation.coordinates[1];
      markers.push(`pin-s-a+3E77FF(${lng},${lat})`);
    }
    
    // Build the complete URL
    let url = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/`;
    
    if (pathGeometry) {
      url += `${pathGeometry},`;
    }
    
    if (markers.length > 0) {
      url += `${markers.join(',')},`;
    }
    
    url += `${coordinates}/800x1200?padding=50&access_token=pk.placeholder`;
    
    return url;
  };

  return (
    <div className="absolute inset-0 z-0">
      <div 
        className="h-full w-full bg-gray-100 bg-opacity-50"
        style={{
          backgroundImage: `url(${getMapUrl()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 pointer-events-none" />
    </div>
  );
};

export default Map;
