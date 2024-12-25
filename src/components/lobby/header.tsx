import { CopyIcon } from "lucide-react";
import React from "react";
import { useGameContext } from "@/context/GameContext";

const Header = () => {
  const { roomId } = useGameContext();
  return (
    <div className="bg-white max-w-[500px] w-full mx-auto flex flex-col gap-1 md:flex-row justify-between items-center px-2 py-1 md:px-5 md:py-3 border-2 border-black rounded-xl">
      <div className="font-extrabold text-lg md:text-xl inline-flex gap-2 items-center">
        {`Room ID: ${roomId}`}{" "}
        <CopyIcon className="h-5 w-5 cursor-pointer text-gray-500" />
      </div>

      <button className="bg-red-500 text-white text-sm md:text-base font-bold px-4 py-1 rounded-3xl">
        Leave Room
      </button>
    </div>
  );
};

export default Header;
