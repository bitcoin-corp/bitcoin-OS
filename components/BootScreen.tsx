'use client'

import { useEffect, useState } from 'react'
import { BitcoinBOnly } from './BitcoinLogo'

export default function BootScreen() {
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('Initializing Bitcoin OS...')

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
      currentProgress += 5
      setProgress(currentProgress)

      if (currentProgress % 20 === 0 && messageIndex < messages.length) {
        setMessage(messages[messageIndex])
        messageIndex++
      }

      if (currentProgress >= 100) {
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center">
      <div className="text-center space-y-8">
        <div className="flex justify-center">
          <BitcoinBOnly className="text-yellow-500 animate-pulse" size={120} />
        </div>
        
        <h1 className="text-4xl font-bold">
          <span className="text-yellow-500">Bitcoin</span>
          <span className="text-white ml-2">OS</span>
        </h1>
        
        <div className="w-64 space-y-2">
          <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-yellow-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-400">{message}</p>
        </div>
        
        <p className="text-xs text-gray-600">
          © 2025 THE BITCOIN CORPORATION LTD
        </p>
      </div>
    </div>
  )
}