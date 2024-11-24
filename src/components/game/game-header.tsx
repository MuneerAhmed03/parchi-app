import { Home, UserRound, Volume2 } from "lucide-react";
import React from "react";

const GameHeader = () => {
  return (
    <header className="h-20 flex justify-between px-5 items-center bg-white bg-opacity-35 backdrop-blur-md shadow-sm">
      <button className="bg-transparent">
        <Home className="text-black" />
      </button>
      <div className="bg-white text-2xl text-black font-bold rounded-3xl px-8 py-2">Your Turn</div>
      <div className="flex gap-5">
        <button className="bg-transparent">
          <Volume2 className="text-black" />
        </button>
        <button className="bg-transparent">
          <UserRound className="text-black" />
        </button>
      </div>
    </header>
  );
};

export default GameHeader;
