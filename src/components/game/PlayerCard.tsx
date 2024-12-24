import React from 'react';
import Image from "next/image";
import { User } from 'lucide-react';
import { CrayonAvatar as Avatar } from '../Avatar';
interface PlayerCardProps {
  name: string;
  isCurrentPlayer?: boolean;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const avatars = ["/user-avtars/avtar1.png", "/user-avtars/avtar2.png", "/user-avtars/avtar3.png", "/user-avtars/avtar4.png"];

export function PlayerCard({ name, isCurrentPlayer = false, position }: PlayerCardProps) {
  
  const positionStyles = {
    top: 'top-6 md:top-12 left-1/2 -translate-x-1/2',
    bottom: 'bottom-4 md:bottom-12 left-1/2 -translate-x-1/2',
    left: 'left-6 md:left-12  top-1/3 md:top-1/2  md:-translate-y-1/2 ',
    right: 'right-6 md:right-12 top-1/3 md:top-1/2  md:-translate-y-1/2',
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
      bg-[#E6E6E6]
      
      /* Mobile: Vertical layout */
      w-24 h-32
      p-2
      
      /* Desktop: Horizontal layout */
      md:w-[120px] md:h-40
      md:p-4

      /* Pulse animation when it's player's turn */
      ${isCurrentPlayer ? 'motion:reduce:animate-bounce ring-2 ring-blue-900' : ''}
    `}>
      <div className="
        flex
        flex-col
        items-center
        gap-1
        
       
      ">
        <div className="
        flex
        flex-col
        items-center
        gap-1
        
        /* Switch to horizontal on desktop */
        
        md:gap-3
      ">
        <Avatar
          name={name}
          isActive={isCurrentPlayer}
          className="w-12 h-12"
        />
        <div className="text-center md:text-left">
          <p className={`
            font-medium 
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
    </div>
  );
}