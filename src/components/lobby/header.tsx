import { CopyIcon as Copy} from "lucide-react";
import React from "react";
import { useGameContext } from "@/context/GameContext";
import { useWebSocketContext } from "@/context/RoomContext";
import { Button } from "../ui/button";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

interface headerProps {
  handleLeaveRoom : ()=>void
}

const Header : React.FC<headerProps> = ({handleLeaveRoom}) => {
  const { roomId,playerId } = useGameContext();
  const {sendMessage} =useWebSocketContext()

  const copyRoomId = () =>{
    navigator.clipboard.writeText(`${BASE_URL}/?join=${roomId}`)
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:mx-auto relative flex items-center justify-between md:w-1/2">
    <div className="flex items-center gap-2">
      <span className="font-medium text-black">Room ID:</span>
      <span className="bg-white/20 px-3 py-1 rounded-md font-mono text-black">
        {roomId}
      </span>
    </div>
    <div className="flex gap-2">
      <Button
        variant="secondary"
        size="sm"
        className="gap-2 bg-white"
        onClick={copyRoomId}
      >
        <Copy className="h-4 w-4" />
        Copy
      </Button>
      <Button variant="destructive" className="bg-[#d32f2f]" size="sm" onClick={handleLeaveRoom}>
        Leave Room
      </Button>
    </div>
  </div>

  );
};

export default Header;
