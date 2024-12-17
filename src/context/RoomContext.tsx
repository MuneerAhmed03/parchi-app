"use client";
import React , {createContext,useContext,ReactNode,useRef,useState} from 'react';
import useWebSocket from './useWebSocket';
import { LargeNumberLike } from 'crypto';

interface WebSocketContextType{
    isConnected :boolean;
    messages:any[];
    sendMessage:(message:any)=>boolean;
    lastProcessedEventIndex : number;
    updateLastProcessedEventIndex: (index:number)=>void;
}

const WebSocketContext=createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider:React.FC<{children:ReactNode}>=({children}) =>{
    const {isConnected,messages,sendMessage}=useWebSocket("ws://localhost:8082");
    const[lastProcessedEventIndex,setLastProcessedEventIndex]=useState<number>(-1);

    const updateLastProcessedEventIndex = (index:number)=>{
        setLastProcessedEventIndex(index);
    }

    return (
        <WebSocketContext.Provider value={{isConnected,messages,sendMessage,lastProcessedEventIndex,updateLastProcessedEventIndex}}>
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
