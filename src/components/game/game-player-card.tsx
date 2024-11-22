import Image from "next/image";
import React, { FC } from "react";

interface GamePlayerCardProps {
  name: string;
  avtar: string;
}

const GamePlayerCard: FC<GamePlayerCardProps> = ({ name, avtar }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg py-3 px-4 border-2 border-black flex flex-col items-center gap-2">
      <Image src={avtar} alt="user" width={70} height={70} />
      <p className="font-bold text-xl font-pencil">{name}</p>
    </div>
  );
};

export default GamePlayerCard;
