"use client";
import Image from "next/image";
import Banner from "@/assets/parchi_banner-removebg.svg";
import StackedParchi from "@/components/StackedParchi";
import { FiMenu } from "react-icons/fi";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full relative flex justify-center items-center py-4">
        <Popover>
          <PopoverTrigger className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100 focus:outline-none" aria-label="Toggle Menu">
            <FiMenu className="text-3xl hover:text-gray-700 rounded-md" />
          </PopoverTrigger>
          <PopoverContent className="w-80 absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100 focus:outline-none">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Dimensions</h4>
                <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="relative w-full max-w-[500px] mx-auto">
          <Image src={Banner} alt="Banner" layout="responsive" width={500} height={216} className="w-full md:p-0 p-4" />
          <div className="absolute font-pencil inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-[#1976d2] transform hover:scale-105 transition-transform drop-shadow-[2px_2px_2px_rgba(0,0,0,0.8)]">P a r c h i</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center font-pencil relative">
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
                    <Input id="name" className="col-span-3" />
                  </div>
                  <button className="w-full">Create Room</button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger className="bg-white border-2 border-zinc-600 px-4 py-2   -rotate-6 rounded-lg shadow-md text-primary hover:bg-gray-100 transition-colors justify-items-stretch min-w-36 min-h-12">Join Room</DialogTrigger>
              <DialogContent className="bg-white font-pencil text-primary">
                <DialogTitle className="text-center font-bold">Join Room</DialogTitle>
                <div className="grid gap-4 place-items-center py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right font-bold">
                      Enter Name
                    </Label>
                    <Input id="name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="roomID" className="text-right font-bold">
                      Enter Room ID
                    </Label>
                    <Input id="roomId" className="col-span-3" />
                  </div>
                  <button className="w-full">Join Room</button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>
    </div>
  );
}
