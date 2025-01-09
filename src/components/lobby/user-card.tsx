"use client";
import Image from "next/image";
import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGameContext } from "@/context/GameContext";
import { CrayonAvatar as Avatar } from "../Avatar";
import { validateTitle } from "../../lib/validation/validateTitle";

export interface UserCardProps {
  playerName: string | null;
  playerStatus: string | null;
  tilt: number;
  handleSubmit?: (message: any) => void;
  validateInput?: (input: string) => boolean;
  isCurrentPlayer: boolean;
}

const UserCard: FC<UserCardProps> = ({
  playerName,
  playerStatus,
  tilt,
  handleSubmit,
  isCurrentPlayer,
  validateInput
}) => {
  const [title, setTitle] = useState<string | null>(playerStatus);
  const { playerId, roomId } = useGameContext();
  const [validationErrors, setValidationErrors] = useState({
    title: "",
  });

  const cleanTitle = (title: string) => {
    if (!title) return '';
    return title.charAt(0).toUpperCase() + title.slice(1);
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const error = validateTitle(event.target.value);
    setValidationErrors((prev) => ({
      title: error,
    }));
    setTitle(cleanTitle(event.target.value));
  };

  const handleButtonClick = () => {
    if (!title) return;

    if (validateInput && validateInput(title)) {
      setValidationErrors((prev) => ({
        title: "Title should be unique",
      }))
      return;
    };

    if (handleSubmit) {
      handleSubmit({
        type: "submit_title",
        data: {
          title,
          roomId,
          playerId,
        },
      });
    }
  };


  const cardStyle = {
    transform: `rotate(${tilt}deg)`,
    transition:
      "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, scale 0.3s ease-in-out",
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
      className="bg-[#E6E6E6] flex flex-col p-3 items-center justify-around w-64 h-36 md:w-[340px] md:h-44 lg:w-[420px] lg:h-48 border-2 border-black"
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {playerName &&
        <Avatar name={playerName} className="w-12 h-12" />
      }
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
                  <DialogTitle className="text-center font-bold">
                    Submit Card Title
                  </DialogTitle>
                  <div className="w-full flex flex-col items-center gap-4">
                    <Input
                      id="roomId"
                      className="w-full font-semibold text-center"
                      value={title || ""}
                      onChange={handleChange}
                      autoComplete="off"
                      aria-autocomplete="none"
                    />
                    {validationErrors.title && (
                      <p className="text-red-500 text-xs text-center w-full">
                        {validationErrors.title}
                      </p>
                    )}
                    <button
                      className={`w-full ${validationErrors.title && "cursor-not-allowed bg-gray-400 hover:bg-gray-500"
                        }`}
                      onClick={handleButtonClick}
                      disabled={!!validationErrors.title}
                    >
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
