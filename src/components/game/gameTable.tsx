"use client"
import React, { useState, useEffect } from 'react';
import { PlayerCard } from '@/components/game/PlayerCard';
import { Card } from '@/components/game/card';
import { Player, PlayerView } from "@/lib/types";
import { useWebSocketContext } from "@/context/RoomContext";
import { useGameContext } from "@/context/GameContext";
import WinnerModal from "./winner-modal";

const positions = ['left', 'top', 'right']

const checkWinning = (cards: { title: string; id: string }[]) => {
  return cards.length === 4 && cards.every(card => card.title === cards[0].title)
}

export default function GameTable() {
  const {
    roomId,
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
  const [cards, setCards] = useState<{ title: string; id: string }[]>([]);
  const [gameState, setGameState] = useState<PlayerView>();
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [isWinning, setIsWinning] = useState<boolean>(false);
  const [winner, setWinner] = useState("");
  const [board, setBoard] = useState<Player[]>([]);

  useEffect(() => {
    const mountGame = async () => {


      const playerView = currentPlayerView;
      if (!playerView) {
        console.warn("[GameTable] No playerView available during mount");
        return;
      }


      const boardSetup = [...playerView.players.slice(playerView.playerIndex), ...playerView.players.slice(0, playerView.playerIndex)];

      setBoard(boardSetup);
      setCards(playerView.hand);
      setGameState(playerView);
      setIsWinning(checkWinning(playerView.hand))
    }
    mountGame();
  }, [currentPlayerView]);

  useEffect(() => {
    if (messages.length > lastProcessedEventIndex + 1) {

      for (let i = lastProcessedEventIndex + 1; i < messages.length; i++) {
        const message = messages[i];
        if (message.type === "gameState") {
          //@ts-ignore
          const updateGameState = message.data;
          // setGameState(updateGameState);
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


  const handlePass = (cardIndex: number) => {

    sendMessage({
      type: "play_card",
      roomId,
      playerId,
      cardIndex
    }
    )
  }
  const handleClaimWin = () => {
    sendMessage({
      type: "claim_win",
      roomId,
      playerId
    })
  }

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
      <div className="
        absolute inset-0 
        bg-[url('/felt-pattern.png')]
        md:opacity-10
        
      " />

      {/* Game area with subtle inner shadow */}
      <div className="
        absolute inset-2 md:inset-8
        rounded-[100px]
        shadow-inner
        bg-black/5
      " />

      {board.slice(1).map((player, index) => {
        const isCurrentPlayer = gameState ?
          (gameState.currentPlayerIndex - gameState.playerIndex + 4) % 4 === index + 1
          : false;


        return (
          <PlayerCard
            key={player.id}
            name={player.name}
            isCurrentPlayer={isCurrentPlayer}
            position={positions[index] as 'top' | 'bottom' | 'left' | 'right'}
          />)
      })}

      <div className="
          flex flex-col
          items-center
        ">
        <button
          onClick={() => selectedCard !== null ? handlePass(selectedCard) : undefined}
          className="
        absolute
        top-[calc(100%-18rem)] 
        md:top-1/2
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
          mt-6
        "
          disabled={selectedCard === null}
        >
          Pass Card
        </button>

        <button
          onClick={handleClaimWin}
          className={`
            absolute
              mb-6
              bg-gradient-to-r
              from-yellow-400
              to-yellow-500
              text-white
              px-4 md:px-8 
              py-2 md:py-3 
              text-sm md:text-base
              rounded-full 
              font-bold
              shadow-lg
              transition-all
              duration-300
              hover:shadow-xl
              hover:scale-105
              hover:from-yellow-300
              hover:to-orange-300
              active:scale-95
              focus:outline-none
              focus:ring-2
              focus:ring-yellow-400
              focus:ring-offset-2
              ${isWinning ? '' : 'hidden'}`}

          aria-label="Claim win"
        >
          🎨 Claim Win!
        </button>
      </div>
      <div
        id="hand"
        className="
        absolute 
        bottom-6
        md:bottom-4 
        left-1/2 
        -translate-x-1/2 
        flex 
        gap-2 md:gap-4
        p-4
        rounded-2xl
        bg-white/5
        backdrop-blur-sm
        mb-8
      ">
        {cards.map((card, index) => (
          <Card
            key={index}
            value={card.title}
            selected={index === selectedCard}
            isTurn={gameState?.currentPlayerIndex === gameState?.playerIndex}
            onClick={() => {
              setSelectedCard(index === selectedCard ? null : index);
            }}
          />
        ))}
      </div>
      <WinnerModal 
        isOpen={showWinnerModal} 
        winnerName={winner} 
        onClose={() => setShowWinnerModal(false)} 
      />
    </div>
  );
}