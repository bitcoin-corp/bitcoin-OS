'use client'

import { useEffect, useState } from 'react'

export default function ExchangePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="w-full h-screen bg-black">
      {isLoaded && (
        <iframe
          src="http://localhost:3000"
          className="w-full h-full border-0"
          title="Bitcoin Exchange"
          allow="clipboard-write; clipboard-read"
        />
      )}
    </div>
  )
}