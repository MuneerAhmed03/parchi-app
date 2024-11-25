"use client";
import React, { createContext, useContext, useState, useRef } from "react";

interface Player {
  id: string;
  name: string;
}

interface RoomContextType {
  roomId: string | null; // Current room ID
  playerId: string | null; // Current player ID
  players: Player[]; // List of players in the room
  createRoom: (playerId: string) => Promise<void>; // Function to create a room
  joinRoom: (roomId: string, playerId: string) => Promise<void>; // Function to join a room
  sendMessage: (message: any) => void; // Send message via WebSocket
}

const RoomContext = createContext<RoomContextType | null>(null);

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]); // Players in the current room
  const socketRef = useRef<WebSocket | null>(null); // WebSocket instance

  // Create a new room
  const createRoom = async (playerId: string) => {
    const response = await fetch("/create-room", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerId }),
    });

    if (!response.ok) {
      throw new Error("Failed to create room.");
    }

    const roomId = await response.text(); // Room ID returned as plain text
    setRoomId(roomId);
    setPlayerId(playerId);
    createWebSocketConnection(roomId); // Establish WebSocket connection
  };

  // Join an existing room
  const joinRoom = async (roomId: string, playerId: string) => {
    const response = await fetch("/join-room", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId, playerId }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error("Failed to join room. The room might be full or does not exist.");
    }

    setRoomId(roomId);
    setPlayerId(playerId);
    createWebSocketConnection(roomId); // Establish WebSocket connection
  };

  // Establish WebSocket connection for the room
  const createWebSocketConnection = (roomId: string) => {
    if (socketRef.current) {
      socketRef.current.close(); // Close existing WebSocket connection
    }

    const socket = new WebSocket(`ws://localhost:3000/ws?roomId=${roomId}`);
    socketRef.current = socket;

    // Handle incoming messages
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "lobbyUpdate") {
        setPlayers(data.players); // Update the list of players in the room
      } else if (data.type === "gameStart") {
        console.log("Game is starting! Redirect to the game page...");
        // Redirect logic can be added here
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };

  // Send a message via WebSocket
  const sendMessage = (message: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not open. Unable to send message.");
    }
  };

  return (
    <RoomContext.Provider
      value={{
        roomId,
        playerId,
        players,
        createRoom,
        joinRoom,
        sendMessage,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoomContext must be used within a RoomProvider");
  }
  return context;
};
