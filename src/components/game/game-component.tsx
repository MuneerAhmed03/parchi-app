import React from "react";
import GameHeader from "./game-header";
import { players } from "../lobby/lobby-component";
import GamePlayerCard from "./game-player-card";
import Parchi from "./parchi";

const GameComponent = () => {
  return (
    <main className="flex flex-col gap-7 h-screen w-screen overflow-hidden">
      <GameHeader />
      <div className="flex justify-around">
        {players.slice(0, 3).map((player) => (
          <GamePlayerCard key={player.id} name={player.name} avtar={player.avtar} />
        ))}
      </div>
      <button className="bg-red-500 rounded-full text-2xl text-center font-extrabold tracking-widest w-40 h-40 mx-auto">THAPPA!!</button>
      <div className="flex-1 bg-white border-white border-2 bg-opacity-25 backdrop-blur rounded-t-2xl w-2/3 mx-auto p-5 flex flex-col gap-5">
        <button className="text-center text-2xl w-fit mx-auto font-extrabold bg-green-600 tracking-widest">Pass</button>
        <div className="flex gap-5 w-fit mx-auto">
          {players.map((player) => (
            <Parchi key={player.id} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default GameComponent;
