import React from "react";

interface CardProps {
  value: string;
  selected?: boolean;
  isTurn: boolean;
  onClick?: () => void;
}

export function Card({ value, selected = false, onClick, isTurn }: CardProps) {
  return (
    <div className="relative">

      <div
        onClick={isTurn ? onClick : undefined}
        className={`
          /* Base card structure */
          relative
          w-[73.60px] md:w-[120px]
          h-[110.40px] md:h-[180px]
          px-2
          rounded-lg 
          flex 
          items-center 
          justify-center 
          transition-all
          duration-300
          font-pencil
          /* Card appearance based on turn state */
          ${isTurn ? `
            bg-white
            shadow-lg
            ${selected ? `
              ring-4
              ring-blue-500
              -translate-y-4
              shadow-xl
            ` : `
              hover:-translate-y-2
              hover:shadow-xl
              hover:ring-2
              hover:ring-blue-300
            `}
            cursor-pointer
          ` : `
            bg-gray-100
            shadow-md
            cursor-not-allowed
            grayscale
          `}
        `}
      >
        <span className={`
          text-base md:text-lg 
          font-semibold 
          break-words 
          overflow-hidden 
          text-center
          ${isTurn ? 'text-gray-800' : 'text-gray-500'}
        `}>
          {value}
        </span>

      </div>
    </div>
  );
}