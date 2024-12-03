"use client";
import React , {createContext,useContext,ReactNode} from 'react';
import useWebSocket from './useWebSocket';

interface WebSocketContextType{
    isConnected :boolean;
    messages:any[];
    sendMessage:(message:any)=>void;
}

const WebSocketContext=createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider:React.FC<{children:ReactNode}>=({children}) =>{
    const {isConnected,messages,sendMessage}=useWebSocket("ws://localhost:3000");

    return (
        <WebSocketContext.Provider value={{isConnected,messages,sendMessage}}>
            {children}
        </WebSocketContext.Provider>
    )
}

export const useWebSocketContext=()=>{
    const context = useContext(WebSocketContext);
    if(!context){
        throw new Error("useWebSocketContext must be used within a WebSocketProvider");
    }
    return context;
}
