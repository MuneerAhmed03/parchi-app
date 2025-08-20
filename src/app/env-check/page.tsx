// app/env-check/page.tsx  (App Router)
'use client'
import { useEffect } from 'react'

export default function EnvCheck() {
  useEffect(() => {
    console.log(
      'NEXT_PUBLIC_BACKEND_API_URL =',
      process.env.BACKEND_API_URL
    )
  }, [])
  return (
    <pre>{process.env.BACKEND_API_URL ?? 'undefined'}</pre>
    
  )
}
