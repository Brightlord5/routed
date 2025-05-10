import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Car, Search, User, Menu } from 'lucide-react';

const HomeScreen: React.FC = () => {
  const { setMode } = useAppContext();

  return (
    <div className="relative h-full flex flex-col bg-appBackground text-appText">
      {/* Top Bar */}
      <div className="z-30 p-4 flex justify-between items-center bg-appCard/80 backdrop-blur-md shadow-lg border-b border-appBorder">
        <div className="flex items-center">
          <Menu className="h-6 w-6 text-appAccent mr-3 cursor-pointer" />
          <h1 className="font-bold text-xl text-appText">
            ROUTED
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-appPrimary/20 text-appTextSecondary hover:text-appPrimary transition-colors duration-200">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-appPrimary/20 text-appTextSecondary hover:text-appPrimary transition-colors duration-200">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Welcome Overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-20 
                      bg-appCard/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl text-center 
                      animate-fade-in border border-appBorder/50">
        <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-appPrimary to-appAccent">
          Ride as one, sustain forever.
        </h2>
        <p className="text-appTextSecondary mb-8 leading-relaxed">
          Connect, commute, and save. Find or offer rides with seamless public transport links across UAE.
        </p>
        
        <div className="flex flex-col gap-4">
          <Button 
            className="bg-appPrimary hover:bg-appPrimaryHover text-white font-semibold h-14 text-lg
                      shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-[1.02] rounded-lg"
            onClick={() => setMode('find')}
          >
            <Search className="h-5 w-5 mr-2.5" />
            Find a Ride
          </Button>
          
          <Button 
            className="bg-appAccent hover:bg-appAccentHover text-appBackground font-semibold h-14 text-lg
                      shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-[1.02] rounded-lg"
            onClick={() => setMode('post')}
          >
            <Car className="h-5 w-5 mr-2.5" />
            Post a Ride
          </Button>
        </div>
      </div>

      {/* Floating Action Buttons - Removed for a cleaner look, main actions are prominent above */}
      {/* Map will be the main background element */}
    </div>
  );
};

export default HomeScreen;
