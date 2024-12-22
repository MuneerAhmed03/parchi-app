"use client";
import Image from "next/image";
import React, { FC, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGameContext } from "@/context/GameContext";

export interface UserCardProps {
  playerName: string | null;
  playerAvtar?: string;
  playerStatus: string | null;
  tilt: number;
  handleSubmit?: (message: any) => void;
  isCurrentPlayer: boolean;
}

const UserCard: FC<UserCardProps> = ({ playerName, playerAvtar, playerStatus, tilt, handleSubmit, isCurrentPlayer }) => {
  const [title, setTitle] = useState<string | null>(playerStatus);
  const {
    playerId,
    roomId
  } = useGameContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleButtonClick = () => {
    if (handleSubmit) {
      handleSubmit({
        type: "submit_title",
        data: { 
          title,
          roomId,
          playerId},
      });
    }
  };

  const cardStyle = {
    transform: `rotate(${tilt}deg)`,
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, scale 0.3s ease-in-out",
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = `rotate(${tilt + 3}deg) scale(1.1)`;
    e.currentTarget.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = `rotate(${tilt}deg)`;
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div
      className="bg-[#E6E6E6] flex flex-col p-3 items-center justify-around w-64 md:w-[340px] md:h-44 lg:w-[420px] lg:h-48 border-2 border-black"
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image src={playerAvtar || ""} alt="user avatar" width={70} height={70} />
      <p className="font-bold text-lg md:text-xl font-pencil">
        {playerName || "Waiting for the user"}
      </p>
      {playerName && (
        <>
          {isCurrentPlayer ? (
            playerStatus === null ? (
              <Dialog>
                <DialogTrigger
                  className="bg-white text-black border-2 border-black hover:bg-[#ffa726] hover:text-white font-bold w-full rounded-3xl px-3 py-2"
                  disabled={!!playerStatus}
                >
                  Submit Title..
                </DialogTrigger>
                <DialogContent className="bg-white font-pencil text-primary">
                  <DialogTitle className="text-center font-bold">Submit Card Title</DialogTitle>
                  <div className="grid gap-4 place-items-center py-4">
                    <Input
                      id="roomId"
                      className="w-full font-semibold text-center"
                      value={title || ""}
                      onChange={handleChange}
                    />
                    <button className="w-full" onClick={handleButtonClick}>
                      Submit
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <div className="text-center font-bold text-lg md:text-xl font-pencil">
                {playerStatus}
              </div>
            )
          ) : (
            <div className="text-center font-bold text-lg md:text-xl font-pencil">
              {playerStatus || "Waiting for player to submit title"}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserCard;
