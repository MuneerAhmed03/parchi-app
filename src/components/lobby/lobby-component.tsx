"use client"
import React, { useEffect, useState, useRef } from "react";
import UserCard from "./user-card";
import Header from "./header";
import StatusBar from "./status-bar";
import { useWebSocketContext } from "@/context/RoomContext";
import { useRouter } from "next/navigation";

interface Player {
  playerName: string;
  playerId: string;
  title: string | null;
}

const avatars = ["/user-avtars/avtar1.png","/user-avtars/avtar2.png","/user-avtars/avtar3.png","/user-avtars/avtar4.png"]

const LobbyComponent = () => {
  const getRandomTilt = () => Math.random() * 4 - 2;
  const { isConnected, messages, sendMessage } = useWebSocketContext();
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([
    {
      playerName: 'Alice',
      playerId: 'player1',
      title: 'Champion',
    },
    {
      playerName: 'Bob',
      playerId: 'player2',
      title: null,
    },
  ]);

  const lastEventRef = useRef<number>(-1);

  useEffect(() => {
    if (messages.length > lastEventRef.current + 1) {
      for (let i = lastEventRef.current + 1; i < messages.length; i++) {
        const message = messages[i];
        if (message.type === "lobby") {
          setPlayers(message.data); // Assuming `message.data` is an array of players
        } else if (message.type === "game_start") {
          setTimeout(() => {}, 1000);
          router.push("/game");
        }
      }
      lastEventRef.current = messages.length - 1;
    }
  }, [messages, router]);

  const playerSlots = Array.from({ length: 4 }, (_, index) => players[index] || null);

  return (
    <div className="bg-[#ffa726] px-3 py-5 flex flex-col justify-around gap-5 overflow-hidden w-screen h-screen">
      <Header />
      <div className="grid gap-3 grid-cols-1 p-2 md:grid-cols-2 lg:gap-5 justify-center place-items-center w-full md:w-fit mx-auto max-md:overflow-y-auto">
        {playerSlots.map((player, index) =>
          player ? (
            <UserCard
              key={player.playerId}
              playerName={player.playerName}
              playerAvtar={avatars[Math.floor(Math.random()*5)]}
              playerStatus={player.title} 
              tilt={getRandomTilt()}
              playerIndex={index}
              {...(isConnected?{handleSubmit:sendMessage}:{})}
            />
          ) : (
            <UserCard
              key={index}
              playerName={null}
              playerStatus={null} 
              playerIndex={index}
              tilt={getRandomTilt()}
            />
          )
        )}
      </div>
      <StatusBar playersReady={players.length} />
    </div>
  );
};

export default LobbyComponent;
