'use client'

import { useEffect, useState } from 'react'

export default function MusicPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="w-full h-screen bg-black">
      {isLoaded && (
        <iframe
          src="http://localhost:3007"
          className="w-full h-full border-0"
          title="Bitcoin Music"
          allow="clipboard-write; clipboard-read; autoplay"
        />
      )}
    </div>
  )
}