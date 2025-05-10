import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin, Search } from 'lucide-react';
import { Location } from '@/types';
import { dubaiLocations } from '@/context/AppContext';
import { cn } from '@/lib/utils';

interface LocationInputProps {
  value: Location | null;
  onChange: (location: Location | null) => void;
  placeholder?: string;
  className?: string;
}

const LocationInput: React.FC<LocationInputProps> = ({ value, onChange, placeholder, className }) => {
  const [inputValue, setInputValue] = useState(value?.name || '');
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value?.name || '');
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setInputValue(query);
    if (query.length > 0) {
      const filteredSuggestions = dubaiLocations.filter(loc =>
        loc.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      onChange(null); // Clear selected location if input is cleared
    }
  };

  const handleSuggestionClick = (location: Location) => {
    setInputValue(location.name);
    onChange(location);
    setShowSuggestions(false);
  };

  return (
    <div className={cn("relative w-full", className)} ref={wrapperRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-appTextSecondary" />
        <Input
          type="text"
          placeholder={placeholder || "Search location..."}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => inputValue && suggestions.length > 0 && setShowSuggestions(true)}
          className="pl-10 pr-3 py-2 w-full bg-appBackground border-appBorder focus:ring-appPrimary focus:border-appPrimary text-appText placeholder:text-appTextSecondary rounded-md"
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-appCard border border-appBorder rounded-md shadow-lg max-h-60 overflow-y-auto">
          <ScrollArea className="h-full">
            {suggestions.map((location, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(location)}
                className="flex items-center px-4 py-2.5 text-sm text-appTextSecondary hover:bg-appPrimary/10 hover:text-appPrimary cursor-pointer transition-colors"
              >
                <MapPin className="h-4 w-4 mr-2.5 text-appAccent" />
                {location.name}
              </div>
            ))}
          </ScrollArea>
        </div>
      )}
      {showSuggestions && inputValue && suggestions.length === 0 && (
         <div className="absolute z-10 w-full mt-1 bg-appCard border border-appBorder rounded-md shadow-lg p-4 text-sm text-appTextSecondary">
          No locations found matching "{inputValue}".
        </div>
      )}
    </div>
  );
};

export default LocationInput;
