"use client";
import React, { useState } from "react";
import GameHeader from "./game-header";
import { players } from "../lobby/lobby-component";
import GamePlayerCard from "./game-player-card";
import Parchi from "./parchi";

const GameComponent = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);

  return (
    <main className="flex flex-col justify-between gap-3 md:gap-5 h-screen w-screen overflow-hidden">
      <GameHeader />
      <div className="flex justify-around">
        {players.slice(0, 3).map((player) => (
          <GamePlayerCard key={player.id} name={player.name} avtar={player.avtar} />
        ))}
      </div>
      <button className="bg-red-500 mt-3 rounded-full hover:scale-110 text-2xl text-center font-extrabold tracking-widest w-40 h-40 mx-auto">THAPPA!!</button>
      <div className="md:flex-1 w-full md:w-2/3 mx-auto justify-center items-center px-2 py-5 md:pb-2 flex md:gap-3">
        {players.map((player) => (
          <Parchi key={player.id} playerId={player.id} selectedPlayer={selectedPlayer} setSelectedPlayer={setSelectedPlayer} />
        ))}
      </div>
    </main>
  );
};

export default GameComponent;
