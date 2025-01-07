"use client";
import Image from "next/image";
import Banner from "@/assets/parchi_banner-removebg.svg";
import StackedParchi from "@/components/StackedParchi";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useReducer, useState } from "react";
import { useWebSocketContext } from "@/context/RoomContext";
import { useGameContext } from "@/context/GameContext";
import { createRoom, joinRoom } from "@/lib/rooms";
import { useRouter, useSearchParams } from "next/navigation";
import { PlayerLobby } from "@/lib/types";
import { Toaster, toast } from "react-hot-toast";
import HelpModal from "@/components/HelpModal";
import { validateName } from "@/lib/validation/validateName";
import { validateRoomId } from "@/lib/validation/validateRoomId";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomIdParam = searchParams.get("join");
  const [isJoinRoom, setIsJoinRoom] = useState(false);
  const [createRoomForm, setCreateRoomForm] = useState({
    name: "",
  });
  const [joinRoomForm, setJoinRoomForm] = useState({
    name: "",
    roomId: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    createName: "",
    joinName: "",
    roomId: "",
  });
  const { handleConnect, messages, sendMessage, lastProcessedEventIndex, updateLastProcessedEventIndex } = useWebSocketContext();

  const { handlePlayerId, handleRoomId, handlePlayers, handlePlayerView } = useGameContext();

  useEffect(() => {
    if (roomIdParam) {
      console.log(roomIdParam);
      setJoinRoomForm((prev) => ({
        ...prev,
        roomId: roomIdParam,
      }));
      setIsJoinRoom(true);
    }
  }, [roomIdParam]);

  const handleInputChange = (formType: "create" | "join", field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (formType === "create") {
      setCreateRoomForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    } else {
      setJoinRoomForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    }

    // Validation
    if (formType === "create" && field === "name") {
      const error = validateName(value);
      setValidationErrors((prev) => ({
        ...prev,
        createName: error,
      }));
    }
    if (formType === "join" && field === "name") {
      const error = validateName(value);
      setValidationErrors((prev) => ({
        ...prev,
        joinName: error,
      }));
    }
    if (formType === "join" && field === "roomId") {
      const error = validateRoomId(value);
      setValidationErrors((prev) => ({
        ...prev,
        roomId: error,
      }));
    }
  };

  const handleCreateRoom = async () => {
    try {
      const { playerId, roomId } = await createRoom(createRoomForm.name);

      if (!playerId) {
        throw new Error("Player Id is missing");
      }

      handleRoomId(roomId);
      handlePlayerId(playerId);

      handleConnect(roomId)
        .then(() => {
          sendMessage({
            type: "join_room",
            roomId,
            playerId,
          });
        })
        .catch((error) => {
          console.log("ws not connected");
          return true;
        });
    } catch (error) {
      console.error("Error creating room :", error);
    }
  };

  const handleJoinRoom = async () => {
    try {
      const success = await joinRoom(joinRoomForm.roomId, joinRoomForm.name);

      if (!success.playerId) {
        throw new Error("Player Id is missing");
      }

      handleRoomId(success.roomId);
      handlePlayerId(success.playerId);

      handleConnect(success.roomId)
        .then(() => {
          sendMessage({
            type: "join_room",
            roomId: joinRoomForm.roomId,
            playerId: success.playerId,
          });
        })
        .catch((error) => {
          console.log("ws not connected");
          return true;
        });
    } catch (error: any) {
      if (error.message === "Room not found") {
        toast.error("Room not found. Please check the room ID and try again.", {
          duration: 3000,
          position: "top-center",
        });
      } else if (error.message === "Room is full") {
        toast.error("This room is full. Please try joining another room.", {
          duration: 3000,
          position: "top-center",
        });
      } else {
        toast.error("Failed to join room. Please try again.", {
          duration: 3000,
          position: "top-center",
        });
      }
      console.error("Error joining room:", error);
    }
  };

  useEffect(() => {
    if (messages.length > lastProcessedEventIndex + 1) {
      for (let i = lastProcessedEventIndex + 1; i < messages.length; i++) {
        const message = messages[i];
        if (message.type === "lobby") {
          setTimeout(() => {}, 1000);
          //@ts-ignore
          const updatedPlayers: PlayerLobby[] = message.data?.map((player) => ({
            playerName: player.name,
            playerId: player.id,
            title: player.title,
          }));
          handlePlayers(updatedPlayers);
          router.push("/lobby");
          updateLastProcessedEventIndex(i);
          console.log(lastProcessedEventIndex);
          break;
        } else if (message.type === "gameState") {
          handlePlayerView(message.data);
          updateLastProcessedEventIndex(messages.length - 1);
          router.push("/game");
        } else {
          console.log("messagefrom page.tsx", message);
        }
      }
      updateLastProcessedEventIndex(messages.length - 1);
    }
  }, [messages, lastProcessedEventIndex, updateLastProcessedEventIndex]);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <HelpModal className="top" />
      <header className="w-full relative flex justify-center items-center py-4">
        <div className="relative w-full max-w-[500px] mx-auto">
          <Image src={Banner} alt="Banner" layout="responsive" width={500} height={216} className="w-full md:p-0 p-4" />
          <div className="absolute font-pencil inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-[#1976d2] transform hover:scale-105 transition-transform drop-shadow-[2px_2px_2px_rgba(0,0,0,0.8)]">P a r c h i</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center mb-20 font-pencil relative overflow-hidden">
        <div className="w-full max-w-[90vw] h-[60vh] relative">
          <div className="absolute inset-0 z-20">
            <StackedParchi count={4} />
          </div>
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-20">
            <Dialog>
              <DialogTrigger className="bg-white border-2 border-zinc-600 px-4 py-2   rotate-6 rounded-lg shadow-md text-primary hover:bg-gray-100 transition-colors min-w-32 min-h-12">Create Room</DialogTrigger>
              <DialogContent className="bg-white font-pencil">
                <DialogTitle className="text-center font-bold">Create Room</DialogTitle>
                <div className="grid gap-4 place-items-center py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right font-bold">
                      Enter Name
                    </Label>
                    <Input id="name" className="col-span-3" value={createRoomForm.name} onChange={handleInputChange("create", "name")} autoComplete="off" aria-autocomplete="none" />
                    {validationErrors.createName && <p className="text-red-500 text-xs col-span-4 text-right">{validationErrors.createName}</p>}
                  </div>
                  <button className={`w-full ${validationErrors.createName && "cursor-not-allowed bg-gray-400 hover:bg-gray-500"}`} onClick={handleCreateRoom} disabled={!!validationErrors.createName}>
                    Create Room
                  </button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={isJoinRoom} onOpenChange={setIsJoinRoom}>
              <DialogTrigger className="bg-white border-2 border-zinc-600 px-4 py-2 -rotate-6 rounded-lg shadow-md text-primary hover:bg-gray-100 transition-colors justify-items-stretch min-w-36 min-h-12">Join Room</DialogTrigger>
              <DialogContent className="bg-white font-pencil text-primary">
                <DialogTitle className="text-center font-bold">Join Room</DialogTitle>
                <div className="grid gap-4 place-items-center py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right font-bold">
                      Enter Name
                    </Label>
                    <Input id="name" className="col-span-3" value={joinRoomForm.name} onChange={handleInputChange("join", "name")} autoComplete="off" aria-autocomplete="none" />
                    {validationErrors.joinName && <p className="text-red-500 col-span-4 text-xs text-right">{validationErrors.joinName}</p>}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="roomID" className="text-right font-bold">
                      Enter Room ID
                    </Label>
                    <Input id="roomId" className="col-span-3" value={joinRoomForm.roomId} onChange={handleInputChange("join", "roomId")} autoComplete="off" aria-autocomplete="none" />
                    {validationErrors.roomId && <p className="text-red-500 col-span-4 text-right text-xs">{validationErrors.roomId}</p>}
                  </div>
                  <button className={`w-full ${(validationErrors.joinName || validationErrors.roomId) && "cursor-not-allowed bg-gray-400 hover:bg-gray-500"}`} onClick={handleJoinRoom} disabled={!!validationErrors.joinName || !!validationErrors.roomId}>
                    Join Room
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>
    </div>
  );
}
