
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Car, Search, User, Menu } from 'lucide-react';

const HomeScreen: React.FC = () => {
  const { setMode } = useAppContext();

  return (
    <div className="relative h-full flex flex-col">
      {/* Top Bar */}
      <div className="z-30 p-4 flex justify-between items-center bg-white/80 backdrop-blur-md shadow-sm">
        <div className="flex items-center">
          <Menu className="h-6 w-6 text-maps-text mr-3" />
          <h1 className="font-medium text-xl bg-gradient-to-r from-maps-blue to-purple-500 bg-clip-text text-transparent">
            Dubai Carpooling
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-maps-blue/10 transition-colors duration-200">
            <Search className="h-5 w-5 text-maps-text" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-maps-blue/10 transition-colors duration-200">
            <User className="h-5 w-5 text-maps-text" />
          </Button>
        </div>
      </div>

      {/* Welcome Overlay */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[85%] z-30 bg-white/80 backdrop-blur-md p-7 rounded-xl shadow-xl text-center animate-fade-in border border-white/30">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-maps-blue to-purple-500 bg-clip-text text-transparent">
          Discover Your Ride in Dubai!
        </h2>
        <p className="text-maps-secondaryText mb-6 leading-relaxed">
          Join our community to save money, reduce traffic, and make connections with public transport integrations.
        </p>
        
        <div className="flex flex-col gap-4">
          <Button 
            className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white h-14
                      shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-[1.02]"
            onClick={() => setMode('find')}
          >
            <Search className="h-5 w-5 mr-2" />
            Find a Ride
          </Button>
          
          <Button 
            className="bg-gradient-to-r from-maps-blue to-blue-600 hover:from-maps-blue hover:to-blue-700 text-white h-14 
                      shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-[1.02]"
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
            className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white rounded-full h-16 w-16
                      shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 animate-pulse"
            onClick={() => setMode('find')}
          >
            <Search className="h-7 w-7" />
          </Button>
          
          <Button 
            className="bg-gradient-to-r from-maps-blue to-blue-600 hover:from-maps-blue hover:to-blue-700 text-white rounded-full h-16 w-16 
                      shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110"
            onClick={() => setMode('post')}
          >
            <Car className="h-7 w-7" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
