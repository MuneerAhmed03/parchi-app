"use client";
import React, { useEffect, useState, useRef } from "react";
import UserCard from "./user-card";
import Header from "./header";
import StatusBar from "./status-bar";
import { useWebSocketContext } from "@/context/RoomContext";
import { useGameContext } from "@/context/GameContext";
import { useRouter } from "next/navigation";
import { PlayerView, PlayerLobby } from "@/lib/types";
import HelpModal from "../HelpModal";


const LobbyComponent = () => {
  const getRandomTilt = () => Math.random() * 4 - 2;
  const {
    isConnected,
    messages,
    sendMessage,
    lastProcessedEventIndex,
    updateLastProcessedEventIndex,
    cleanRoom
  } = useWebSocketContext();
  const { playerId, playersArr, handlePlayerView, handlePlayers,roomId,handleGameStatus,clearGame } =
    useGameContext();
  const router = useRouter();
  const [players, setPlayers] = useState<PlayerLobby[]>([]);
  const [playerid, setPlayerid] = useState<string | null>(null);

  useEffect(() => {
    setPlayerid(playerId);
    setPlayers(playersArr);
  }, []);

  useEffect(() => {
    if (messages.length > lastProcessedEventIndex + 1) {
      for (let i = lastProcessedEventIndex + 1; i < messages.length; i++) {
        const message = messages[i];
        if (message.type === "lobby") {
          //@ts-ignore
          const updatePlayers: Player[] = message.data.map((item) => ({
            playerName: item.name,
            playerId: item.id,
            title: item.title,
          }));

          setPlayers(updatePlayers);
          handlePlayers(updatePlayers);
        } else if (message.type === "game_start") {
          handlePlayerView(message.data);
          updateLastProcessedEventIndex(messages.length - 1);
          handleGameStatus(true);
          router.replace("/game"); 
          break;
        } else if(message.type ==="player_disconnect"){
          const name = players.find(p=> p.playerId === message.data)?.playerName;
          alert(`${name} got disconnected`);
        }
      }
      updateLastProcessedEventIndex(messages.length - 1);
    }
  }, [
    messages,
    router,
    lastProcessedEventIndex,
    updateLastProcessedEventIndex,
  ]);

  const playerSlots = Array.from(
    { length: 4 },
    (_, index) => players[index] || null,
  );

  const currentIndex = playerSlots.findIndex(
    (player) => player?.playerId === playerid,
  );

  const handleLeaveRoom = ()=>{
    sendMessage({
      type:"room_exit",
      roomId,
      playerId
    })
    cleanRoom();
    clearGame();
    router.replace("/")
  }

  const validateTitle = (input : string)=>{
    return players.some((player) => player.title === input)
  }

  if(!isConnected){
    return 
    <div className="bg-[#ffa726] px-3 py-5 flex flex-col justify-around gap-5 overflow-hidden w-screen h-screen">

    </div>
  }

  return (
    <div className="bg-[#ffa726] px-3 py-5 flex flex-col justify-around gap-5 overflow-hidden w-screen h-screen">
      <Header handleLeaveRoom={handleLeaveRoom} />
      <HelpModal className="top" />
      <div className="grid gap-3 grid-cols-1 p-2 md:grid-cols-2 lg:gap-5 justify-center place-items-center w-full md:w-fit mx-auto max-md:overflow-y-auto">
        {playerSlots.map((player, index) =>
          player ? (
            <UserCard
              key={player.playerId}
              playerName={player.playerName}
              playerStatus={player.title}
              tilt={getRandomTilt()}
              isCurrentPlayer={index === currentIndex}
              {...(isConnected ? { handleSubmit: sendMessage, validateInput:validateTitle } : {})}
            />
          ) : (
            <UserCard
              key={index}
              playerName={null}
              playerStatus={null}
              isCurrentPlayer={false}
              tilt={getRandomTilt()}
            />
          ),
        )}
      </div>
      <StatusBar playersReady={players.length} />
    </div>
  );
};

export default LobbyComponent;
