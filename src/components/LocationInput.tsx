
import React, { useState } from 'react';
import { Check, ChevronsUpDown, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Location } from '@/types';
import { dubaiLocations } from '@/context/AppContext';

interface LocationInputProps {
  placeholder: string;
  value: Location | null;
  onChange: (value: Location | null) => void;
  className?: string;
}

const LocationInput: React.FC<LocationInputProps> = ({
  placeholder,
  value,
  onChange,
  className,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between border-0 bg-gray-50 hover:bg-gray-100",
            "shadow-none text-left h-12 relative pl-10",
            className
          )}
        >
          <MapPin className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-maps-secondaryText" />
          <span className={cn("truncate", !value && "text-muted-foreground")}>
            {value ? value.name : placeholder}
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[calc(100vw-2rem)] p-0 max-w-md z-50">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {dubaiLocations.map((location) => (
                <CommandItem
                  key={location.name}
                  value={location.name}
                  onSelect={() => {
                    onChange({
                      name: location.name,
                      coordinates: location.coordinates as [number, number] 
                    });
                    setOpen(false);
                  }}
                  className="flex items-center"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value?.name === location.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <MapPin className="h-4 w-4 mr-2 text-maps-secondaryText" />
                  {location.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LocationInput;
