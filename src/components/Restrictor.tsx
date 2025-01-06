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
  const pathname = usePathname()
  const {isConnected} = useWebSocketContext();
  const {gameStatus}=useGameContext();
  const router = useRouter();

  useEffect(()=>{
    const checkAuth = () =>{
      if (pathname === '/') return

      if(pathname === '/lobby' && !isConnected){
        router.push('/');
        router.refresh()
        return
      }

      if(pathname === '/game' && (!isConnected || gameStatus)){
        router.push('/');
        router.refresh()
        return
      }
    }
    checkAuth();
  },[pathname,isConnected,gameStatus,router])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const shouldWarn = true // Replace with your condition, e.g., unsaved changes
      if (shouldWarn) {
        e.preventDefault()
        e.returnValue = '' 
      }
    }

    // Add the event listener for the beforeunload event to detect refresh or closing
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  useEffect(() => {
    const url = `${pathname}`
    
    const handleNavigationAttempt = () => {
      const shouldWarn = true // Replace with your condition, e.g., unsaved changes
      if (shouldWarn) {
        if (!confirm('Are you sure you want to leave this page? Unsaved changes will be lost.')) {
          window.history.pushState(null, '', url) // Prevent navigation if canceled
        }else{

        }
      }
    }

    // Watch for pathname changes or searchParams changes
    window.addEventListener('popstate', handleNavigationAttempt)

    return () => {
      window.removeEventListener('popstate', handleNavigationAttempt)
    }
  }, [pathname])

  return <>{children}</>
}

export default ProtectPage
