"use client";
import React, { useEffect, useState } from "react";
import GameHeader from "./game-header";
import GamePlayerCard from "./game-player-card";
import Parchi from "./parchi";
import { PlayerView, Player } from "@/lib/types";
import { deletePlayerView, getPlayerView } from "@/store/indexedDB";
import {Hand} from "./hand"

const avatars = ["/user-avtars/avtar1.png","/user-avtars/avtar2.png","/user-avtars/avtar3.png","/user-avtars/avtar4.png"]


const GameComponent = () => {
  const [gameState, setGameState] = useState<PlayerView>()
  useEffect(() => {
    const mountGame = async () => {
      const playerView: PlayerView | undefined = await getPlayerView();
      if (!playerView) {
        return;
      }
      setGameState(playerView);
      console.log(playerView);
      await deletePlayerView();
    }

    mountGame();
  }, []);

  return (
    <main className="flex flex-col justify-between gap-3 md:gap-5 h-screen w-screen overflow-hidden">
      <GameHeader />
      <div className="flex justify-around">
        {gameState?.players.slice(0, 3).map((player) => (
          <GamePlayerCard key={player.id} name={player.name} avtar={avatars[Math.floor(Math.random()*5)]} />
        ))}
      </div>
      <button className="bg-red-500 mt-3 rounded-full hover:scale-110 text-2xl text-center font-extrabold tracking-widest w-40 h-40 mx-auto">THAPP!!</button>
      <Hand 
        hand={gameState?.hand || []} 
        isTurn={gameState?.currentPlayerIndex === gameState?.playerIndex}
        handlePass={(message) => {
          console.log("Passing card:", message);
        }}
      />
    </main>
  );
};

export default GameComponent;
