"use client"
import React, { useState, useEffect } from 'react';
import { PlayerCard } from '@/components/game/PlayerCard';
import { Card } from '@/components/game/card';
import { Player, PlayerView } from "@/lib/types";
import { useWebSocketContext } from "@/context/RoomContext";
import { useGameContext } from "@/context/GameContext";
import WinnerModal from "./winner-modal";

const positions = ['left', 'top', 'right']

export default function GameTable() {
  const {
    playerId,
    currentPlayerView,
    handlePlayerView
  } = useGameContext();
  const {
    isConnected,
    messages,
    sendMessage,
    lastProcessedEventIndex,
    updateLastProcessedEventIndex
  } = useWebSocketContext();

  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [cards,setCards] = useState<{ title: string; id: string }[]>([]);
  const [gameState, setGameState] = useState<PlayerView>();
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [winner, setWinner] = useState("");
  const [board,setBoard] = useState<Player[]>([]);

  useEffect(() => {
    const mountGame = async () => {
      console.log("[GameTable] Mounting game with currentPlayerView:", currentPlayerView);
      
      const playerView = currentPlayerView;
      if (!playerView) {
        console.warn("[GameTable] No playerView available during mount");
        return;
      }

      console.log("[GameTable] Setting up board with players:", playerView.players);
      console.log("[GameTable] Player index:", playerView.playerIndex);
      
      const boardSetup = [...playerView.players.slice(playerView.playerIndex), ...playerView.players.slice(0, playerView.playerIndex)];
      console.log("[GameTable] Board setup result:", boardSetup);
      
      setBoard(boardSetup);
      setCards(playerView.hand);
      console.log("[GameTable] Initial hand:", playerView.hand);
      
      setGameState(playerView);
    }
    mountGame();
  }, [currentPlayerView]);

  useEffect(() => {
    console.log("[GameTable] Current board state:", board);
    console.log("[GameTable] Current cards:", cards);
    console.log("[GameTable] Current gameState:", gameState);
  }, [board, cards, gameState]);

  useEffect(() => {
    if (messages.length > lastProcessedEventIndex + 1) {
      console.log("[GameTable] Processing new messages:", 
        messages.slice(lastProcessedEventIndex + 1));
        
      for (let i = lastProcessedEventIndex + 1; i < messages.length; i++) {
        const message = messages[i];
        if (message.type === "gameState") {
          //@ts-ignore
          const updateGameState = message.data;
          setGameState(updateGameState);
          handlePlayerView(updateGameState);
        } else if (message.type === "game_end") {
          const winnerName = message.winner;
          setWinner(winnerName);
          setShowWinnerModal(true);
        }
      }


      updateLastProcessedEventIndex(messages.length - 1);
    }
  }, [messages, lastProcessedEventIndex, updateLastProcessedEventIndex]);

  console.log("[GameTable] Rendering with board:", board);
  console.log("[GameTable] Number of players to render:", board.slice(1).length);

  return (
    <div
      className="
        relative w-full h-screen 
        flex items-center justify-center
        bg-gradient-to-br from-orange-400 to-orange-500
        transition-colors duration-500
      "
    >
      {/* Table felt overlay */}
      {/* <div className="
        absolute inset-0 
        
        opacity-10
      " /> */}

      {/* Game area with subtle inner shadow */}
      {/* <div className="
        absolute inset-8
        rounded-[100px]
        shadow-inner
        bg-black/5
      " /> */}

      {board.slice(1).map((player, index) =>{

        const isCurrentPlayer = gameState ? 
        (gameState.currentPlayerIndex - gameState.playerIndex + 4) % 4 === index + 1 
        : false;
        
        if (gameState) {
          console.log("[GameTable] isCurrentPlayer?:", isCurrentPlayer);
          console.log("[GameTable] the index of player on the board",(gameState.currentPlayerIndex  - gameState.playerIndex + 4) % 4 )
        }

        return (
          <PlayerCard
            key={player.id}
            name={player.name}
            isCurrentPlayer={isCurrentPlayer}
            position={positions[index] as 'top' | 'bottom' | 'left' | 'right'}
          />)
      })}


      {/* Pass button */}
      <button
        className="
          bg-white/90
          backdrop-blur-sm
          px-4 md:px-8 
          py-2 md:py-3 
          text-sm md:text-base
          rounded-full 
          font-semibold 
          text-gray-800 
          shadow-lg
          transition-all
          duration-300
          hover:bg-white
          hover:shadow-xl
          hover:scale-105
          active:scale-95
          disabled:opacity-50
          disabled:hover:scale-100
          disabled:cursor-not-allowed
        "
        disabled={!selectedCard}
      >
        Pass Card
      </button>

      {/* Current player's cards */}
      <div className="
        absolute 
        bottom-2 md:bottom-4 
        left-1/2 
        -translate-x-1/2 
        flex 
        gap-2 md:gap-4
        p-4
        rounded-2xl
        bg-white/5
        backdrop-blur-sm
      ">
        {cards.map((card, index) => (
          <Card
            key={index}
            value={card.title}
            selected={index === selectedCard}
            onClick={() => setSelectedCard(index === selectedCard ? null : index)}
          />
        ))}
      </div>
    </div>
  );
}