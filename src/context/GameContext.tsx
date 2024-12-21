"use client"
import React ,{ createContext,useContext,ReactNode,useState,useMemo }from 'react';
import { Player, PlayerView } from '@/lib/types';

interface GameContextType{
    handlePlayerId:(player:string)=>void;
    handleRoomId:(room:string)=>void;
    handlePlayers:(playerArr:Player[])=>void;
    handlePlayerView:(playerViewArg:PlayerView)=>void;
    playerId:string;
    roomId:string;
    players:Player[];
    playerView:PlayerView|null
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameContextProvider:React.FC<{children:ReactNode}>=({children})=>{
    const [roomId,setRoomId]=useState<string>("");
    const [playerId,setPlayerId]=useState<string>("");
    const [players,setPlayers]=useState<Player[]>([]);
    const [playerView,setPlayerView]=useState<PlayerView|null>(null);

    const handlePlayerId = (player:string) => {
        setPlayerId(player);
    }
   const handleRoomId = (room:string) => {    setRoomId(room);
}
  const handlePlayers = (playerArr:Player[]) => {
        setPlayers(playerArr);
    }
    const handlePlayerView = (playerViewArg:PlayerView) => {
        setPlayerView(playerViewArg)
    }

    const contextValue = useMemo(()=>({
        roomId,
        playerId,
        players,
        playerView,
        handlePlayerId,
        handleRoomId,
        handlePlayers,
        handlePlayerView
    }),
    [ roomId, playerId , players, playerView]
)

    return (
        <GameContext.Provider value = {contextValue}>
            {children}
        </GameContext.Provider>
    )
}

export const useGameContext=()=>{
    const context = useContext(GameContext);
    if(!context){
        throw new Error("useGameContext must be used within GameContext provider")
    }
    return context;
}