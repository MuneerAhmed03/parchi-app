import React from "react";

interface CardProps {
  value: string;
  selected?: boolean;
  isTurn: boolean;
  onClick?: () => void;
}

export function Card({ value, selected = false, onClick, isTurn }: CardProps) {
  return (
    <div
      onClick={
        isTurn
          ? onClick
          : () => {
              console.log("getting clicked without turn");
              return;
            }
      }
      className={`
        w-[58.88px] md:w-[120px]
        h-[88.32px] md:h-[180px]
        px-2
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
        ${selected ? "ring-2 ring-blue-500 -translate-y-2 md:-translate-y-4 bg-white" : ""}
      `}
    >
      <span
        className="text-base md:text-lg font-semibold break-words 
      overflow-hidden 
      text-center"
      >
        {value}
      </span>
    </div>
  );
}
