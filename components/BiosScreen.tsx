'use client'

import { useState, useEffect } from 'react'

interface BiosScreenProps {
  onComplete: () => void
  onUserInteraction?: () => void
}

export default function BiosScreen({ onComplete, onUserInteraction }: BiosScreenProps) {
  const [currentBootLine, setCurrentBootLine] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)

  const bootLines = [
    { text: 'Initializing Bitcoin Core...', status: 'ok' },
    { text: 'Loading Blockchain Headers...', status: 'ok' },
    { text: 'Verifying Wallet Security...', status: 'ok' },
    { text: 'Establishing P2P Connections...', status: 'loading', delay: 4000 },
    { text: 'Synchronizing Mempool...', status: 'loading', delay: 5000 },
    { text: 'Starting Mining Service...', status: 'loading', delay: 6000 }
  ]

  const [bootStatuses, setBootStatuses] = useState(bootLines.map(line => line.status))

  useEffect(() => {
    // Auto-start boot sequence and set up click listener for sound
    const autoStartTimer = setTimeout(() => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true)
        onUserInteraction?.()
        
        // Start boot sequence automatically
        const animateBootSequence = () => {
          if (currentBootLine < bootLines.length) {
            setTimeout(() => {
              setCurrentBootLine(prev => prev + 1)
            }, 20)
          }
        }
        animateBootSequence()
      }
    }, 200) // Auto-start after 200ms

    // Add click listener for sound (optional)
    const handleUserInteraction = () => {
      if (!hasUserInteracted) {
        clearTimeout(autoStartTimer)
        setHasUserInteracted(true)
        onUserInteraction?.()
        
        // Play startup sound if clicked
        const audio = new Audio('/startup4.wav')
        audio.volume = 0.7
        audio.play().catch(err => {
          console.log('Audio playback failed:', err)
        })
        
        // Start boot sequence
        const animateBootSequence = () => {
          if (currentBootLine < bootLines.length) {
            setTimeout(() => {
              setCurrentBootLine(prev => prev + 1)
            }, 20)
          }
        }
        animateBootSequence()
      }
    }

    document.addEventListener('keydown', handleUserInteraction)
    document.addEventListener('click', handleUserInteraction)
    document.addEventListener('touchstart', handleUserInteraction)

    return () => {
      clearTimeout(autoStartTimer)
      document.removeEventListener('keydown', handleUserInteraction)
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
    }
  }, [hasUserInteracted, onUserInteraction, currentBootLine])

  useEffect(() => {
    // Continue boot sequence animation
    if (hasUserInteracted && currentBootLine > 0 && currentBootLine < bootLines.length) {
      const timer = setTimeout(() => {
        setCurrentBootLine(prev => prev + 1)
      }, 20) // Much faster
      return () => clearTimeout(timer)
    }
  }, [currentBootLine, bootLines.length, hasUserInteracted])

  useEffect(() => {
    // Update loading statuses to OK
    bootLines.forEach((line, index) => {
      if (line.delay) {
        setTimeout(() => {
          setBootStatuses(prev => {
            const newStatuses = [...prev]
            newStatuses[index] = 'ok'
            return newStatuses
          })
        }, line.delay)
      }
    })
  }, [])

  useEffect(() => {
    // Start progress bar after user interaction and boot sequence
    if (hasUserInteracted && currentBootLine >= bootLines.length) {
      const progressTimer = setTimeout(() => {
        const updateProgress = () => {
          setProgress(prev => {
            const newProgress = prev + Math.random() * 25 + 20 // Much faster progress jumps
            if (newProgress >= 100) {
              setIsComplete(true)
              setTimeout(() => {
                onComplete()
              }, 100) // Much shorter completion delay
              return 100
            }
            setTimeout(updateProgress, 50) // Faster updates
            return newProgress
          })
        }
        updateProgress()
      }, 50) // Start progress bar almost immediately

      return () => clearTimeout(progressTimer)
    }
  }, [onComplete, hasUserInteracted, currentBootLine, bootLines.length])

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ok': return '[OK]'
      case 'loading': return '[LOADING]'
      case 'error': return '[ERROR]'
      default: return '[WAITING]'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ok': return 'text-green-400'
      case 'loading': return 'text-yellow-400'
      case 'error': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="w-full h-screen bg-black text-green-400 font-mono text-sm leading-relaxed p-5 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b-2 border-green-400 pb-2 mb-5">
        <div className="text-base font-bold" style={{ textShadow: '0 0 10px #00ff00' }}>
          Bitcoin OS BIOS
        </div>
        <div className="text-xs text-green-600">
          Version 1.0.0 - Build 2025.01.26
        </div>
      </div>

      {/* System Info */}
      <div className="mb-8">
        {[
          'CPU: Bitcoin Core Processor @ 3.7 GHz',
          'RAM: 256 GB DDR5 Memory',
          'Storage: 1 TB NVMe SSD (Blockchain Ready)',
          'Network: P2P Protocol v2.0 Enabled',
          'Security: SHA-256 Hardware Acceleration'
        ].map((info, index) => (
          <div 
            key={index}
            className="my-1 opacity-0 animate-fadeIn"
            style={{ animationDelay: `${0.2 + index * 0.2}s` }}
          >
            {info}
          </div>
        ))}
      </div>


      {/* Boot Sequence */}
      <div className="mt-5">
        {bootLines.map((line, index) => (
          <div
            key={index}
            className={`flex items-center my-2 transition-opacity duration-300 ${
              index < currentBootLine ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="flex-1">{line.text}</span>
            <span className={`ml-5 ${getStatusColor(bootStatuses[index])}`}>
              {getStatusText(bootStatuses[index])}
            </span>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-8 opacity-0 animate-fadeIn" style={{ animationDelay: '3s' }}>
        <div className="mb-2">System Boot Progress:</div>
        <div className="w-full max-w-lg h-5 border border-green-400 bg-green-900/20 mb-2">
          <div
            className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-500"
            style={{ 
              width: `${progress}%`,
              boxShadow: '0 0 10px #00ff00'
            }}
          />
        </div>
        <div>
          {isComplete ? (
            <>Boot Complete - Starting Bitcoin OS... <span className="animate-spin inline-block">⟳</span></>
          ) : (
            `${Math.floor(progress)}% Complete`
          )}
        </div>
      </div>

      {/* Bottom Info */}
      <div className="mt-auto pt-5 border-t border-green-400">
        <div className="opacity-0 animate-fadeIn" style={{ animationDelay: '2s' }}>
          Press DEL to enter BIOS Setup | F8 for Boot Menu | F12 for Network Boot
        </div>
        <div className="mt-2 text-green-600">
          {hasUserInteracted ? 'Starting Bitcoin OS...' : 'Initializing System...'}<span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse"></span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s forwards;
        }
      `}</style>
    </div>
  )
}