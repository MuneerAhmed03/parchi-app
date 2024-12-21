"use client"
import React, { useEffect, useState, useRef } from "react";
import UserCard from "./user-card";
import Header from "./header";
import StatusBar from "./status-bar";
import { useWebSocketContext } from "@/context/RoomContext";
import { useRouter } from "next/navigation";
import {savePlayerView} from "@/store/indexedDB"
import { PlayerView } from "@/lib/types";
 
interface Player {
  playerName: string;
  playerId: string;
  title: string | null;
}

const avatars = ["/user-avtars/avtar1.png","/user-avtars/avtar2.png","/user-avtars/avtar3.png","/user-avtars/avtar4.png"]

const LobbyComponent = () => {
  const getRandomTilt = () => Math.random() * 4 - 2;
  const { 
    handleConnect,
    handleDisconnect,
    isConnected, 
    messages, 
    sendMessage, 
    lastProcessedEventIndex,
    updateLastProcessedEventIndex 
  } = useWebSocketContext();
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerid,setPlayerid] = useState<string|null>(null);

  useEffect(()=>{
    const playerListString = localStorage.getItem('players');
    if(!playerListString){
      console.log("local storage empty");
      return;
    }
    const playeruuid = localStorage.getItem('playerId')
    if(!playeruuid){
      console.log("local storage empty");
      return;
    }
    setPlayerid(playeruuid);
    const playerList = JSON.parse(playerListString);
    //@ts-ignore
    const updatedPlayers = playerList?.map((player) => ({
      playerName: player.name,
      playerId: player.id,
      title: player.title
    }));
    setPlayers(updatedPlayers);
  },[])

  useEffect(() => {
    const saveToDB = async (playerView:PlayerView) => {
      await savePlayerView(playerView);
      console.log("saved to index");
    }
    if (messages.length > lastProcessedEventIndex + 1) {
      for (let i = lastProcessedEventIndex + 1; i < messages.length; i++) {
        const message = messages[i];
        if (message.type === "lobby") {
          //@ts-ignore
          const updatePlayers : Player[]= message.data.map((item)=>({
            playerName: item.name,
            playerId: item.id,
            title: item.title,
          }))

          setPlayers(updatePlayers);
        }else if (message.type === "game_start") {
          setTimeout(() => {}, 1000);
          saveToDB(message.data).then(()=>{
            updateLastProcessedEventIndex(messages.length - 1);
            router.push("/game");
          });
          console.log("break loggesd");
          break;
        }
      }
      updateLastProcessedEventIndex(messages.length - 1);
    }
  }, [messages, router, lastProcessedEventIndex, updateLastProcessedEventIndex]);

  const playerSlots = Array.from({ length: 4 }, (_, index) => players[index] || null);

  const currentIndex = playerSlots.findIndex(player => player?.playerId === playerid);

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
              isCurrentPlayer={index === currentIndex}
              {...(isConnected?{handleSubmit:sendMessage}:{})}
            />
          ) : (
            <UserCard
              key={index}
              playerName={null}
              playerStatus={null} 
              isCurrentPlayer={false}
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
