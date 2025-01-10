"use client"

import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trophy, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface WinningModalProps {
  isOpen: boolean
  onClose: () => void
  onPlayAgain: () => void
  onExit:()=>void
  winnerName: string
}

export default  function Winnerodal({ isOpen, onClose, onPlayAgain, winnerName,onExit }: WinningModalProps) {
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
      <DialogContent className="sm:max-w-md border-0 bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_0_30px_10px_rgba(251,191,36,0.3)]">
        <DialogHeader className="relative">

          <DialogTitle asChild>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center space-y-4 pt-4"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Trophy className="h-16 w-16 text-amber-200 drop-shadow-[0_2px_8px_rgba(251,191,36,0.5)]" />
              </motion.div>
              <h2 className="bg-gradient-to-r from-amber-200 to-yellow-100 bg-clip-text text-transparent text-4xl font-bold tracking-tight">
                Winner!
              </h2>
            </motion.div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6 p-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full transform -rotate-3" />
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 transform rotate-3 border border-white/20">
              <p className="text-2xl font-bold text-center text-white break-words shadow-sm">
                {winnerName}
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full"
          >
            <Button
              onClick={onPlayAgain}
              className="flex-1 bg-amber-200 text-amber-900 hover:bg-amber-100 rounded-full text-lg font-semibold px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-amber-100/50"
            >
              Play Again
            </Button>
            <Button
              onClick={onExit}
              variant="ghost"
              className="flex-1 bg-white/10 hover:bg-white/20 text-white rounded-full text-lg font-semibold px-8 py-6 backdrop-blur-sm transition-all duration-300 border-2 border-white/20"
            >
              Exit
            </Button>
          </motion.div>
        </div>
      </DialogContent>
      {isOpen && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.15}
          colors={['#fbbf24', '#f59e0b', '#d97706', '#92400e']}
        />
      )}
    </Dialog>
  )
}

