'use client'

import React, { useState, useEffect } from 'react'

interface ClientOnlyAuthProps {
  children: React.ReactNode
}

export default function ClientOnlyAuth({ children }: ClientOnlyAuthProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // During SSR, render children without wallet
  if (!isMounted) {
    return <>{children}</>
  }

  // Client-side: render children only (wallet connection handled by taskbar)
  return (
    <>
      {children}
    </>
  )
}