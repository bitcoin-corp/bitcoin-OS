'use client'

import { AlertTriangle } from 'lucide-react'

export default function ProofOfConceptBar() {
  return (
    <div className="bg-gray-900/95 backdrop-blur-md border-b border-gray-700 text-gray-300 px-4 py-2 text-center text-sm font-medium flex items-center justify-center gap-2">
      <AlertTriangle className="w-4 h-4 text-bitcoin-orange" />
      <span>PROOF OF CONCEPT - This is a demonstration of Bitcoin OS</span>
      <AlertTriangle className="w-4 h-4 text-bitcoin-orange" />
    </div>
  )
}