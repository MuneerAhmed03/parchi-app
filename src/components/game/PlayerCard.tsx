import React from 'react';
import Image from "next/image";
import { User } from 'lucide-react';

interface PlayerCardProps {
  name: string;
  isCurrentPlayer?: boolean;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const avatars = ["/user-avtars/avtar1.png", "/user-avtars/avtar2.png", "/user-avtars/avtar3.png", "/user-avtars/avtar4.png"];

export function PlayerCard({ name, isCurrentPlayer = false, position }: PlayerCardProps) {
  
  const positionStyles = {
    top: 'top-4 left-1/2 -translate-x-1/2',
    bottom: 'bottom-4 left-1/2 -translate-x-1/2',
    left: 'left-4 top-1/2 -translate-y-1/2',
    right: 'right-4 top-1/2 -translate-y-1/2',
  };

  return (
    <div className={`
      absolute 
      ${positionStyles[position]}
      bg-white/90
      backdrop-blur-sm
      rounded-lg 
      shadow-lg 
      transition-all
      duration-300
      hover:bg-white
      hover:shadow-xl
      hover:scale-105
      border border-2
      
      
      /* Mobile: Vertical layout */
      w-24 h-32
      p-2
      
      /* Desktop: Horizontal layout */
      md:w-48 md:h-24
      md:p-4

      /* Pulse animation when it's player's turn */
      ${isCurrentPlayer ? '   border-red-700' : 'black'}
    `}>
      <div className="
        flex
        flex-col
        items-center
        gap-1
        
        /* Switch to horizontal on desktop */
        md:flex-row
        md:gap-3
        md:mt-2
      ">
        <div className={`
          w-12 h-12
          rounded-full 
          flex 
          items-center 
          justify-center
          transition-colors
          duration-300
          ${isCurrentPlayer ? 'bg-green-100 ring-2 ring-green-400' : 'bg-gray-100'}
        `}>
          <User className={`
            w-6 h-6 
            transition-colors
            duration-300
            ${isCurrentPlayer ? 'text-green-600' : 'text-gray-600'}
          `} />
        </div>
        <div className="text-center md:text-left">
          <p className={`
            font-semibold 
            text-sm md:text-base
            transition-colors
            duration-300
            ${isCurrentPlayer ? 'text-green-600' : 'text-gray-700'}
          `}>
            {name}
          </p>
          
        </div>
      </div>
    </div>
  );
}