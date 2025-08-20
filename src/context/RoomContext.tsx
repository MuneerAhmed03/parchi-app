"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
} from "react";
import useWebSocket from "./useWebSocket";

const WS_URL = process.env.NEXT_PUBLIC_BACKEND_WS_URL || "ws://localhost:8080/ws";

interface WebSocketContextType {
  handleConnect: (roomId: string) => Promise<void>;
  handleDisconnect: () => void;
  isConnected: boolean;
  messages: any[];
  sendMessage: (message: any) => boolean;
  lastProcessedEventIndex: number;
  updateLastProcessedEventIndex: (index: number) => void;
  cleanRoom: () => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined,
);

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isConnected, messages, sendMessage, connect, disconnect, clearRoom } =
    useWebSocket(WS_URL);
  const [lastProcessedEventIndex, setLastProcessedEventIndex] =
    useState<number>(-1);

  const cleanRoom = () => {
    clearRoom();
    setLastProcessedEventIndex(-1);
  }

  const updateLastProcessedEventIndex = (index: number) => {
    setLastProcessedEventIndex(index);
  };

  const handleConnect = (roomId: string) => {
    return connect(roomId);
  };
  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <WebSocketContext.Provider
      value={{
        handleConnect,
        handleDisconnect,
        isConnected,
        messages,
        sendMessage,
        lastProcessedEventIndex,
        updateLastProcessedEventIndex,
        cleanRoom
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error(
      "useWebSocketContext must be used within a WebSocketProvider",
    );
  }
  return context;
};
