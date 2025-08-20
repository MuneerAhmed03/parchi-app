import { LogOut as Exit, Share2 as Share } from "lucide-react";
import React from "react";
import { useGameContext } from "@/context/GameContext";
import { Button } from "../ui/button";
import { toast } from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

interface headerProps {
  handleLeaveRoom: () => void;
}

const Header: React.FC<headerProps> = ({ handleLeaveRoom }) => {
  const { roomId } = useGameContext();

  const copyRoomId = async () => {
    const url = `${BASE_URL}/?join=${roomId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Invite link copied to clipboard");
    } catch (e) {
      toast.error("Failed to copy invite link");
    }
  };

  return (
    <div
      className="bg-white/10 backdrop-blur-sm rounded-lg47) md:p-4 p-2 mx-auto relative flex items-center justify-between md:w-1/2 w-5/6"
    >
      <div className="flex items-center gap-2">
        <span className="font-medium text-black">Room ID:</span>
        <span className="bg-white/20 px-3 py-1 rounded-md font-mono text-black">
          {roomId}
        </span>
      </div>
      <div className="flex md:gap-2 gap-4">
        <Button
          variant="secondary"
          size="sm"
          className="gap-2 bg-white"
          onClick={copyRoomId}
        >
          <Share className="h-4 w-4" />
          <span className="hidden md:block">Share</span>
        </Button>
        <Button
          variant="destructive"
          className="bg-[#d32f2f]"
          size="sm"
          onClick={handleLeaveRoom}
        >
          <Exit className="h-4 w-4" />
          <span className="hidden md:block">Leave Room</span>
        </Button>
      </div>
    </div>
  );
};

export default Header;
