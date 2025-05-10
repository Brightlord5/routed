import React, { useState } from 'react';
import { ArrowLeft, Filter, ArrowRight, Car, Bus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Interface for transit route legs
interface TransitRouteLeg {
  type: 'walk' | 'bus' | 'metro' | 'train';
  icon?: React.ReactNode;
  line?: string;
  lineColor?: string;
  distance?: string;
  duration?: number; // in minutes
  status?: 'on time' | 'delayed' | 'scheduled';
}

// Interface for transit route
interface TransitRoute {
  id: string;
  departureTime: string;
  arrivalTime: string;
  duration: {
    hours: number;
    minutes: number;
  };
  status?: 'on time' | 'delayed' | 'scheduled';
  startLocation: string;
  endLocation: string;
  legs: TransitRouteLeg[];
}

// Mock data for transit routes
const transitRoutes: TransitRoute[] = [
  {
    id: '1',
    departureTime: '3:57 PM',
    arrivalTime: '5:08 PM',
    duration: {
      hours: 1,
      minutes: 12
    },
    legs: [
      { type: 'walk', duration: 4 },
      { 
        type: 'bus', 
        line: '36A/320', 
        lineColor: '#9c27b0', 
        status: 'on time' 
      },
      { 
        type: 'bus', 
        line: '50', 
        lineColor: '#9c27b0', 
        status: 'delayed' 
      },
      { type: 'walk', duration: 10 }
    ],
    startLocation: 'Bits Pilani 1'
  },
  {
    id: '2',
    departureTime: '3:58 PM',
    arrivalTime: '5:08 PM',
    duration: {
      hours: 1,
      minutes: 11
    },
    legs: [
      { type: 'walk', duration: 17 },
      { 
        type: 'bus', 
        line: '50', 
        lineColor: '#9c27b0', 
        status: 'delayed' 
      },
      { type: 'walk', duration: 10 }
    ],
    startLocation: 'Dubai Outsource City 4-1'
  },
  {
    id: '3',
    departureTime: '3:45 PM',
    arrivalTime: '5:35 PM',
    duration: {
      hours: 1,
      minutes: 50
    },
    legs: [
      { type: 'walk', duration: 3 },
      { 
        type: 'bus', 
        line: '36B', 
        lineColor: '#9c27b0', 
        status: 'on time' 
      },
      { 
        type: 'bus', 
        line: 'X25', 
        lineColor: '#9c27b0', 
        status: 'delayed' 
      },
      { type: 'walk', duration: 4 },
      { 
        type: 'metro', 
        line: 'MRed1/MRed2', 
        lineColor: '#e91e63', 
        status: 'on time' 
      },
      { type: 'walk', duration: 13 }
    ],
    startLocation: 'Bits Pilani 2'
  },
  {
    id: '4',
    departureTime: '4:06 PM',
    arrivalTime: '5:53 PM',
    duration: {
      hours: 1,
      minutes: 47
    },
    legs: [
      { type: 'walk', duration: 3 },
      { type: 'bus' },
      { type: 'walk', duration: 7 },
      { 
        type: 'bus', 
        line: '30', 
        lineColor: '#9c27b0', 
        status: 'delayed' 
      },
      { type: 'walk', duration: 12 }
    ],
    startLocation: 'Bits Pilani 2'
  },
  {
    id: '5',
    departureTime: '5:27 PM',
    arrivalTime: '6:45 PM',
    duration: {
      hours: 1,
      minutes: 19
    },
    legs: [
      { type: 'walk', duration: 4 },
      { 
        type: 'bus', 
        line: '36A/320', 
        lineColor: '#9c27b0',
        status: 'on time' 
      },
      { 
        type: 'bus', 
        line: '50', 
        lineColor: '#9c27b0',
        status: 'scheduled' 
      },
      { type: 'walk', duration: 10 }
    ],
    startLocation: 'Bits Pilani 1'
  }
];

const PublicTransitOptions = () => {
  const [selectedFilter, setSelectedFilter] = useState('transit');
  const [currentTime, setCurrentTime] = useState('3:43 PM');

  // Helper to render the walking icon and time
  const renderWalking = (duration: number) => {
    return (
      <div className="flex items-center text-gray-400">
        <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5 5.5C14.3284 5.5 15 4.82843 15 4C15 3.17157 14.3284 2.5 13.5 2.5C12.6716 2.5 12 3.17157 12 4C12 4.82843 12.6716 5.5 13.5 5.5Z" fill="currentColor"/>
          <path d="M6.5 22.5V19L8 15.5V10.5L13.5 7.5L11.5 14.5H17L19 21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 10.5L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span>{duration}</span>
      </div>
    );
  };

  // Helper to render the bus icon and line
  const renderBus = (line: string, color: string) => {
    return (
      <div className="flex items-center">
        <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M7 21V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M17 21V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M4 11H20" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9 16H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M14 16H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <div className="px-2 py-1 rounded text-white text-xs font-medium" style={{ backgroundColor: color }}>
          {line}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto bg-appBackground text-appText">
      {/* Header */}
      <div className="bg-appCard px-4 py-5 shadow-md">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-medium">Public transport</h1>
          <div className="flex space-x-2">
            <button className="rounded-full p-2 bg-appBorder text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9H21M9 15L3 15M21 15H15M9 15C9 16.6569 7.65685 18 6 18C4.34315 18 3 16.6569 3 15M9 15C9 13.3431 7.65685 12 6 12C4.34315 12 3 13.3431 3 15M15 15C15 16.6569 16.3431 18 18 18C19.6569 18 21 16.6569 21 15M15 15C15 13.3431 16.3431 12 18 12C19.6569 12 21 13.3431 21 15M3 9C3 7.34315 4.34315 6 6 6C7.65685 6 9 7.34315 9 9M3 9C3 10.6569 4.34315 12 6 12C7.65685 12 9 10.6569 9 9M21 9C21 7.34315 19.6569 6 18 6C16.3431 6 15 7.34315 15 9M21 9C21 10.6569 19.6569 12 18 12C16.3431 12 15 10.6569 15 9M9 9H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="rounded-full p-2 bg-appBorder text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Transit Option Tabs */}
        <div className="flex justify-around mb-4">
          <div className="flex flex-col items-center">
            <div className="bg-appBorder rounded-full p-3 mb-2">
              <Car className="w-5 h-5" />
            </div>
            <span className="text-xs">25 min</span>
          </div>
          <div className={cn("flex flex-col items-center relative", {
            "after:absolute after:bottom-[-8px] after:w-full after:h-0.5 after:bg-appPrimary": selectedFilter === 'transit'
          })}>
            <div className="bg-appPrimary rounded-full p-3 mb-2">
              <Bus className="w-5 h-5" />
            </div>
            <span className="text-xs">1 hr 12</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-appBorder rounded-full p-3 mb-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 5.5C14.3284 5.5 15 4.82843 15 4C15 3.17157 14.3284 2.5 13.5 2.5C12.6716 2.5 12 3.17157 12 4C12 4.82843 12.6716 5.5 13.5 5.5Z" fill="currentColor"/>
                <path d="M6.5 22.5V19L8 15.5V10.5L13.5 7.5L11.5 14.5H17L19 21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 10.5L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-xs">6 hr</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-appBorder rounded-full p-3 mb-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 3V7M10 3V7M5 10H19M19 10V18C19 19.1046 18.1046 20 17 20H7C5.89543 20 5 19.1046 5 18V10M7 2H17C18.1046 2 19 2.89543 19 4V7H5V4C5 2.89543 5.89543 2 7 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-xs">25 min</span>
          </div>
        </div>

        {/* Time Controls */}
        <div className="flex justify-between items-center mt-4 bg-appCard/70 rounded p-2">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4V20M4 4H20M4 4C2.89543 4 2 3.10457 2 2M20 4V20M20 4C21.1046 4 22 3.10457 22 2M4 20H20M4 20C2.89543 20 2 20.8954 2 22M20 20C21.1046 20 22 20.8954 22 22M22 2H2M22 22H2M9.5 8.5V15.5M9.5 15.5L7 13M9.5 15.5L12 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Leave 3:43 PM</span>
            <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex items-center">
            <span>Modes</span>
            <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex items-center">
            <span>Filter by</span>
            <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Transit Routes List */}
      <div className="px-3 py-4">
        {transitRoutes.map((route) => (
          <div key={route.id} className="mb-6 border-b border-appBorder pb-6">
            {/* Route header with time */}
            <div className="flex mb-3">
              <div className="w-16 text-2xl font-semibold mr-4">
                <div className="text-3xl font-bold">{route.duration.hours}h</div>
                <div className="text-xl font-normal">{route.duration.minutes}m</div>
              </div>
              <div className="flex-1">
                <div className="text-xl mb-1">{route.departureTime} – {route.arrivalTime}</div>
                <div className="flex items-center flex-wrap">
                  {route.legs.map((leg, index) => (
                    <React.Fragment key={index}>
                      {leg.type === 'walk' && leg.duration && renderWalking(leg.duration)}
                      {leg.type === 'bus' && leg.line && leg.lineColor && (
                        <div className="flex items-center mr-2">
                          {index > 0 && <ArrowRight className="w-4 h-4 mx-1 text-gray-400" />}
                          {renderBus(leg.line, leg.lineColor)}
                        </div>
                      )}
                      {leg.type === 'metro' && leg.line && leg.lineColor && (
                        <div className="flex items-center mr-2">
                          {index > 0 && <ArrowRight className="w-4 h-4 mx-1 text-gray-400" />}
                          {renderBus(leg.line, leg.lineColor)}
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Status info */}
            <div className="pl-20 text-sm">
              {route.legs.some(leg => leg.status === 'delayed') ? (
                <div>
                  in{' '}
                  {route.legs.find(leg => leg.type === 'walk')?.duration}{' '}
                  min{' '}
                  <span className="text-green-500">(on time)</span>,{' '}
                  {route.legs.find(leg => leg.status === 'delayed' && leg.type === 'bus')?.status && (
                    <span className="text-red-500">(delayed)</span>
                  )}{' '}
                  from {route.startLocation}
                </div>
              ) : route.legs.some(leg => leg.status === 'scheduled') ? (
                <div>
                  at {route.departureTime}{' '}
                  <span className="text-green-500">(on time)</span>,{' '}
                  {route.arrivalTime}{' '}
                  <span className="text-yellow-500">(scheduled)</span>
                  {' '}from {route.startLocation}
                </div>
              ) : (
                <div>
                  in{' '}
                  {route.legs.find(leg => leg.type === 'walk')?.duration}{' '}
                  min{' '}
                  <span className="text-green-500">(on time)</span>,{' '}
                  {route.legs.find(leg => leg.status === 'delayed')?.status}{' '}
                  from {route.startLocation}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicTransitOptions; 