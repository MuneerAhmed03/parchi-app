"use client"
import React from 'react';
import ReactConfetti from 'react-confetti';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface WinnerModalProps {
  isOpen: boolean;
  winnerName: string;
  onClose: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ isOpen, winnerName, onClose }) => {
  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white font-pencil relative overflow-hidden border-4 border-black">
        {isOpen && <ReactConfetti recycle={true} numberOfPieces={200} />}
        
        <div className="flex flex-col items-center gap-6 py-8">
          {/* <div className="relative w-24 h-24">
            <Image
              src="/trophy.png"
              alt="Trophy"
              fill
              className="object-contain animate-bounce"
            />
          </div> */}
          
          <h2 className="text-4xl font-bold text-center text-primary animate-pulse">
            🎉 Winner! 🎉
          </h2>
          
          <div className="bg-[#ffa726] p-6 rounded-xl border-2 border-black transform rotate-2 shadow-lg">
            <p className="text-2xl font-bold text-center break-words">
              {winnerName}
            </p>
          </div>
          
          <button
            onClick={() => router.push('/')}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full 
              font-bold text-lg transform hover:scale-105 transition-all duration-300 
              border-2 border-black shadow-lg"
          >
            Play Again
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WinnerModal; 