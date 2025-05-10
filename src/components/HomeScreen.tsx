import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Car, Search, User, Menu } from 'lucide-react';

const HomeScreen: React.FC = () => {
  const { setMode } = useAppContext();

  return (
    <div 
      className="relative h-full flex flex-col text-appText bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/bck.jpg')` }} // Assuming bck.jpg is in the public folder
    >
      {/* Overlay to ensure text readability over the background */}
      <div className="absolute inset-0 bg-appBackground/70 z-0"></div>

      {/* Content needs to be above the overlay, hence z-10 or higher */}
      {/* Top Bar */}
      <div className="relative z-10 p-4 flex justify-between items-center bg-appCard/80 backdrop-blur-md shadow-lg border-b border-appBorder">
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

      {/* Welcome Overlay - this is the main content area, ensure it is above the background overlay */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="w-[90%] max-w-md 
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
      </div>
    </div>
  );
};

export default HomeScreen;
