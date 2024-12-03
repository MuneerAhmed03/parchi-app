"use client";
import Image from "next/image";
import React, { FC } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"; 

export interface UserCardProps {
  playerName: string;
  playerAvtar?: string;
  playerStatus: boolean;
  tilt: number;
}

const UserCard: FC<UserCardProps> = ({ playerName, playerAvtar, playerStatus, tilt }) => {
  return (
    <div
      className="bg-[#E6E6E6] flex flex-col p-3 items-center justify-around w-64 md:w-[340px] md:h-44 lg:w-[420px] lg:h-48 border-2 border-black  transition-all duration-300 ease-in-out"
      style={{
        transform: `rotate(${tilt}deg)`, 
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, scale 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `rotate(${tilt + 3}deg) scale(1.1)`; 
        e.currentTarget.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)"; 
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotate(${tilt}deg)`; 
        e.currentTarget.style.boxShadow = "none"; 
      }}
    >
      <img src={playerAvtar} alt="user" width={70} height={70} />
      <p className="font-bold text-lg md:text-xl font-pencil">{playerName}</p>
      <button className={`${playerStatus ? "bg-green-500 text-white" : "text-black"} bg-white hover:bg-[#ffa726] hover:text-white font-bold w-full border-2 border-black rounded-3xl px-3 py-2`}>{playerStatus ? "Ready!" : "Ready to Play"}</button>
    </div>
  );
};

export default UserCard;
