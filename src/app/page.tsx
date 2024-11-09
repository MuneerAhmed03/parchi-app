"use client"
import Image from "next/image";
import Banner from "@/assets/parchi_banner-removebg.svg";
import StackedParchi from '@/components/StackedParchi';
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
 

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full relative flex justify-center items-center py-4">
        <Popover>
      <PopoverTrigger className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100 focus:outline-none"
          aria-label="Toggle Menu">
          <FiMenu className="text-3xl hover:text-gray-700 rounded-md" />
      </PopoverTrigger>
      <PopoverContent className="w-80 absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100 focus:outline-none">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>

        {/* Banner and Title */}
        <div className="relative w-full max-w-[500px] mx-auto">
          <Image
            src={Banner}
            alt="Banner"
            layout="responsive"
            width={500}
            height={216}
            className="w-full md:p-0 p-4"
          />
          <div className="absolute font-pencil inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-[#1976d2] transform hover:scale-105 transition-transform drop-shadow-[2px_2px_2px_rgba(0,0,0,0.8)]">
              P a r c h i
            </h1>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-[90vw] h-[60vh]">
          <div className="font-pencil z-50 flex items-center justify-center">
          <Dialog>
          <DialogTrigger>
            Join Room
      </DialogTrigger>
          </Dialog>
          </div>
          <StackedParchi count={4} />
        </div>
      </main>
    </div>
  );
}
