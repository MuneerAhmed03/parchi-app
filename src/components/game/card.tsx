import React from 'react';

interface CardProps {
  value: string;
  selected?: boolean;
  onClick?: () => void;
}

export function Card({ value, selected = false, onClick }: CardProps) {
  console.log("[Card] Rendering:", { value, selected });
  
  return (
    <div
      onClick={onClick}
      className={`
        w-16 md:w-24
        h-24 md:h-36
        bg-white/90 
        backdrop-blur-sm
        rounded-lg 
        shadow-lg 
        flex 
        items-center 
        justify-center 
        cursor-pointer 
        transition-all
        duration-300
        hover:bg-white
        hover:-translate-y-2
        hover:shadow-xl
        active:scale-95
        font-pencil
        ${selected ? 'ring-2 ring-blue-500 -translate-y-2 md:-translate-y-4 bg-white' : ''}
      `}
    >
      <span className="text-base md:text-lg font-semibold">
        {value}
      </span>
    </div>
  );
}