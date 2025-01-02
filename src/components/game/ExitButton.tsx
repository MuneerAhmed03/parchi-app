import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWebSocketContext } from "@/context/RoomContext";
import { useGameContext } from "@/context/GameContext";

export default function ExitButton() {
  const router = useRouter();
  const { sendMessage } = useWebSocketContext();
  const { roomId, playerId } = useGameContext();

  const handleExit = () => {
    sendMessage({
      type: "room_exit",
      roomId,
      playerId,
    });
    router.push("/");
  };

  return (
    <Dialog>
      <DialogTrigger className="fixed top-2 right-2 md:top-4 md:right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:shadow-xl z-50">
        <LogOut className="w-6 h-6 text-red-600" />
      </DialogTrigger>
      <DialogContent className="bg-white font-pencil max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-center text-primary">
            Exit Game
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-4">
          <p className="text-center text-gray-700 text-sm md:text-base">
            Are you sure you want to leave the game?
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleExit}
              className="px-6 py-2 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-all duration-300"
            >
              Yes
            </button>
            <DialogTrigger className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-300 transition-all duration-300">
              No
            </DialogTrigger>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 