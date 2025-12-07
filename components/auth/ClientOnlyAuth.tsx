'use client'

import React, { useState, useEffect } from 'react'
import SimpleWalletWidget from './SimpleWalletWidget'

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

  // Client-side: render with wallet widget
  return (
    <>
      {children}
      <SimpleWalletWidget className="mr-4 mt-16" />
    </>
  )
}