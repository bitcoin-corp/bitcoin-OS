'use client'

import { useEffect, useState } from 'react'
import { Bitcoin } from 'lucide-react'

export default function BootScreen() {
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('Initializing Bitcoin OS...')
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    const messages = [
      'Loading blockchain modules...',
      'Connecting to Bitcoin network...',
      'Initializing wallet services...',
      'Starting decentralized apps...',
      'Welcome to Bitcoin OS!'
    ]

    let currentProgress = 0
    let messageIndex = 0

    const interval = setInterval(() => {
      currentProgress += 25 // Much faster progress
      setProgress(currentProgress)

      if (currentProgress % 25 === 0 && messageIndex < messages.length) {
        setMessage(messages[messageIndex])
        messageIndex++
      }

      if (currentProgress >= 100) {
        clearInterval(interval)
        // Start fade out before component unmounts
        setTimeout(() => {
          setIsFadingOut(true)
        }, 200)
      }
    }, 15) // Faster updates

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`h-screen bg-black flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
      isFadingOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
    }`}>
      <div className="text-center space-y-8">
        <div className="flex justify-center">
          <span className="text-yellow-400 text-8xl font-bold animate-pulse">₿</span>
        </div>
        
        <h1 className="text-4xl font-bold">
          <span className="text-yellow-500">Bitcoin</span>
          <span className="text-white ml-2">OS</span>
        </h1>
        
        <div className="w-64 space-y-2">
          <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-yellow-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-400">{message}</p>
        </div>
        
        <p className="text-xs text-gray-600">
          © 2025 The Bitcoin Corporation LTD (16735102)
        </p>
      </div>
    </div>
  )
}