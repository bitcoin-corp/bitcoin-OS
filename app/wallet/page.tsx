'use client'

import { useEffect, useState } from 'react'

export default function WalletPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="w-full h-screen bg-black">
      {isLoaded && (
        <iframe
          src="http://localhost:1050"
          className="w-full h-full border-0"
          title="Bitcoin Wallet"
          allow="clipboard-write; clipboard-read"
        />
      )}
    </div>
  )
}