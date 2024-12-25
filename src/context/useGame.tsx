import { useEffect, useRef, useState } from "react";
import { PlayerView, Player } from "@/lib/types";

const useGame = () => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameState, setGameState] = useState<PlayerView | null>(null);

  return {
    roomId,
    playerId,
    players,
    setRoomId,
    setPlayerId,
    setPlayers,
    setGameState,
  };
};

export default useGame;
