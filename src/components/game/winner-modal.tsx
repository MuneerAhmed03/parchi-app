"use client"

import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface WinningModalProps {
  isOpen: boolean
  onClose: () => void
  onPlayAgain: () => void
  winnerName: string
}

export default  function Winnerodal({ isOpen, onClose, onPlayAgain, winnerName }: WinningModalProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', updateWindowSize)
    updateWindowSize()

    return () => window.removeEventListener('resize', updateWindowSize)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#ffa726] text-card-foreground font-pencil">
        <DialogHeader>
          <DialogTitle className="text-center text-4xl font-bold text-primary animate-pulse">
            🎉 Winner 🎉
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 p-6">
        <div className="bg-[#ffa726] p-6  transform rotate-2 ">
            <p className="text-2xl font-bold text-center break-words">
              {winnerName}
            </p>
          </div>
          <div className="flex space-x-4">
            <Button onClick={onPlayAgain} className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-md hover:from-amber-600 hover:to-orange-600 transition-all text-md duration-300 font-medium">Play Again</Button>
            <span onClick={onClose} className="bg-blue/90
          backdrop-blur-sm
          px-4 md:px-8 
          py-2 md:py-3 
          text-sm
          font-semibold 
          text-gray-800 
          transition-all
          duration-300
          text-center
          hover:underline
          hover:scale-105
          active:scale-95
          disabled:opacity-50
          disabled:hover:scale-100
          disabled:cursor-not-allowed">Exit</span>
          </div>
        </div>
      </DialogContent>
      {isOpen && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={true}
          numberOfPieces={500}
        />
      )}
    </Dialog>
  )
}

