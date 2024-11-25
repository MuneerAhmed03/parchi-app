"use client";
import Image from "next/image";
import React, { FC } from "react";

export interface UserCardProps {
  playerName: string;
  playerAvtar: string;
  playerStatus: boolean;
  tilt: number;
}

const UserCard: FC<UserCardProps> = ({ playerName, playerAvtar, playerStatus, tilt }) => {
  return (
    <div
      className="bg-white flex flex-col p-3 items-center justify-around w-64 md:w-[340px] md:h-44 lg:w-[420px] lg:h-48 border-2 border-black rounded-xl transition-all duration-300 ease-in-out"
      style={{
        transform: `rotate(${tilt}deg)`, // Apply initial tilt using inline style
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, scale 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `rotate(${tilt + 3}deg) scale(1.1)`; // Hover effect for rotate and scale
        e.currentTarget.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)"; // Add shadow on hover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotate(${tilt}deg)`; // Reset to original tilt
        e.currentTarget.style.boxShadow = "none"; // Remove shadow on hover end
      }}
    >
      <Image src={playerAvtar} alt="user" width={70} height={70} />
      <p className="font-bold text-lg md:text-xl font-pencil">{playerName}</p>
      <button className={`${playerStatus ? "bg-green-500 text-white" : "text-black"} bg-white hover:bg-[#ffa726] hover:text-white font-bold w-full border-2 border-black rounded-3xl px-3 py-2`}>{playerStatus ? "Ready!" : "Ready to Play"}</button>
    </div>
  );
};

export default UserCard;
