
import React from 'react';
import { AppProvider, useAppContext } from '@/context/AppContext';
import Map from '@/components/Map';
import HomeScreen from '@/components/HomeScreen';
import PostRideScreen from '@/components/PostRideScreen';
import PostConfirmationScreen from '@/components/PostConfirmationScreen';
import FindRideScreen from '@/components/FindRideScreen';

// Main app wrapper with context
const CarpoolingApp = () => {
  const { mode, ridePosted } = useAppContext();

  const renderContent = () => {
    if (ridePosted) {
      return <PostConfirmationScreen />;
    }

    switch (mode) {
      case 'post':
        return <PostRideScreen />;
      case 'find':
        return <FindRideScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Map Component (always present in background) */}
      <Map />
      
      {/* Dynamic Content Based on App Mode */}
      {renderContent()}
    </div>
  );
};

// Main entry point with context provider
const Index = () => {
  return (
    <AppProvider>
      <CarpoolingApp />
    </AppProvider>
  );
};

export default Index;
