'use client'

import { AlertTriangle } from 'lucide-react'
import './ProofOfConceptBar.css'

interface ProofOfConceptBarProps {
  appName?: string
  message?: string
}

export default function ProofOfConceptBar({ 
  appName, 
  message = "PROOF OF CONCEPT - This is a demonstration of Bitcoin OS" 
}: ProofOfConceptBarProps) {
  const displayMessage = appName ? `PROOF OF CONCEPT - ${appName} powered by Bitcoin OS` : message

  return (
    <div className="poc-bar">
      <div className="poc-content">
        <AlertTriangle className="w-4 h-4 poc-icon" />
        <span className="poc-text">{displayMessage}</span>
        <AlertTriangle className="w-4 h-4 poc-icon" />
      </div>
    </div>
  )
}