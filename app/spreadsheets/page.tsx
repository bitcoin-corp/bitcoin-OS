'use client'

import { useEffect, useState } from 'react'

export default function SpreadsheetsPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="w-full h-screen bg-black">
      {isLoaded && (
        <iframe
          src="http://localhost:3020"
          className="w-full h-full border-0"
          title="Bitcoin Spreadsheets"
          allow="clipboard-write; clipboard-read"
        />
      )}
    </div>
  )
}