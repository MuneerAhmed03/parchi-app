"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useEffect
} from "react";
import { PlayerLobby, PlayerView } from "@/lib/types";
import Cookies from 'js-cookie';

interface GameContextType {
  handlePlayerId: (player: string) => void;
  handleRoomId: (room: string) => void;
  handlePlayers: (playerArr: PlayerLobby[]) => void;
  handlePlayerView: (playerViewArg: PlayerView) => void;
  playerId: string;
  roomId: string;
  playersArr: PlayerLobby[];
  currentPlayerView: PlayerView | null;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [roomId, setRoomId] = useState<string>("");
  const [playerId, setPlayerId] = useState<string>("");
  const [players, setPlayers] = useState<PlayerLobby[]>([]);
  const [playerView, setPlayerView] = useState<PlayerView | null>(null);

  const handlePlayerId = (player: string) => {
    setPlayerId(player);
  };
  const handleRoomId = (room: string) => {
    setRoomId(room);
  };
  const handlePlayers = (playerArr: PlayerLobby[]) => {
    setPlayers(playerArr);
  };
  const handlePlayerView = (playerViewArg: PlayerView) => {
    setPlayerView(playerViewArg);
  };

  useEffect(() => {
    if (roomId) {
      Cookies.set('roomId', roomId); 
    }
  }, [roomId])


  const contextValue = useMemo(
    () => ({
      roomId,
      playerId,
      playersArr: players,
      currentPlayerView: playerView,
      handlePlayerId,
      handleRoomId,
      handlePlayers,
      handlePlayerView,
    }),
    [roomId, playerId, players, playerView],
  );

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within GameContext provider");
  }
  return context;
};
