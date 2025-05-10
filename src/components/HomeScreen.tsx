
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Car, Search, User, Menu } from 'lucide-react';

const HomeScreen: React.FC = () => {
  const { setMode } = useAppContext();

  return (
    <div className="relative h-full flex flex-col">
      {/* Top Bar */}
      <div className="z-30 p-4 flex justify-between items-center bg-white/90 shadow-sm">
        <div className="flex items-center">
          <Menu className="h-6 w-6 text-maps-text mr-3" />
          <h1 className="font-medium text-lg">Dubai Carpooling</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5 text-maps-text" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5 text-maps-text" />
          </Button>
        </div>
      </div>

      {/* Welcome Overlay */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[85%] z-30 bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg text-center animate-fade-in">
        <h2 className="text-2xl font-bold mb-4 text-maps-text">
          Find or offer a carpool in Dubai!
        </h2>
        <p className="text-maps-secondaryText mb-6">
          Join our community to save money, reduce traffic, and make connections.
        </p>
        
        <div className="flex flex-col gap-4">
          <Button 
            className="bg-maps-green hover:bg-maps-green/90 text-white h-12"
            onClick={() => setMode('find')}
          >
            <Search className="h-5 w-5 mr-2" />
            Find a Ride
          </Button>
          
          <Button 
            className="bg-maps-blue hover:bg-maps-blue/90 text-white h-12"
            onClick={() => setMode('post')}
          >
            <Car className="h-5 w-5 mr-2" />
            Post a Ride
          </Button>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="absolute bottom-8 right-6 z-30">
        <div className="flex flex-col gap-4">
          <Button 
            className="bg-maps-green hover:bg-maps-green/90 text-white rounded-full h-14 w-14 shadow-lg"
            onClick={() => setMode('find')}
          >
            <Search className="h-6 w-6" />
          </Button>
          
          <Button 
            className="bg-maps-blue hover:bg-maps-blue/90 text-white rounded-full h-14 w-14 shadow-lg"
            onClick={() => setMode('post')}
          >
            <Car className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
