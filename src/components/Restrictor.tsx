'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useWebSocketContext } from '../context/RoomContext'
import { useGameContext } from '../context/GameContext'
import { useRouter } from 'next/navigation'

interface ProtectPageProps {
  children: React.ReactNode
}

const ProtectPage: React.FC<ProtectPageProps> = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {isConnected,cleanRoom} = useWebSocketContext();
  const {gameStatus,clearGame}=useGameContext();
  const router = useRouter();

  useEffect(()=>{
    const checkAuth = () =>{
      if (pathname === '/') return

      if(pathname === '/lobby' && !isConnected){
        router.replace('/');
        router.refresh()
        return
      }

      if(pathname === '/game' && (!isConnected || !gameStatus)){
        router.replace('/');
        router.refresh()
        return
      }
    }
    checkAuth();
  },[pathname,isConnected,gameStatus,router])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const shouldWarn = true 
      if (shouldWarn) {
        e.preventDefault()
        e.returnValue = '' 
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  useEffect(() => {
    const url = `${pathname}/${searchParams}`
    const handleNavigationAttempt = () => {
    const shouldWarn = isConnected && gameStatus;
      if (shouldWarn) {
        if (!confirm('Are you sure you want to leave unfinished game?')) {
          window.history.pushState(null, '', url) 
        }else{
          cleanRoom();
          clearGame();
        }
      }
    }

    window.addEventListener('popstate', handleNavigationAttempt)

    return () => {
      window.removeEventListener('popstate', handleNavigationAttempt)
    }
  }, [pathname,searchParams])

  return <>{children}</>
}

export default ProtectPage
