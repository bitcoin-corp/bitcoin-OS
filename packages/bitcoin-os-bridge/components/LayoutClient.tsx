'use client'

import React, { useState, useEffect } from 'react'
import PocBar from './PocBar'
import Taskbar from './Taskbar'
import DevSidebar from './DevSidebar'
import AppWrapper from './AppWrapper'
import Footer from './Footer'
import Dock from './Dock'
import type { AppContext } from '../types'

interface LayoutClientProps {
  children: React.ReactNode
  context?: AppContext
}

export default function LayoutClient({ 
  children, 
  context = { appName: 'Bitcoin OS', exchangeUrl: '/exchange' }
}: LayoutClientProps) {
  const [isDevSidebarCollapsed, setIsDevSidebarCollapsed] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Get initial state from localStorage
    const saved = localStorage.getItem('devSidebarCollapsed')
    setIsDevSidebarCollapsed(saved !== null ? saved === 'true' : true)
  }, [])

  const handleDevSidebarCollapsedChange = (collapsed: boolean) => {
    setIsDevSidebarCollapsed(collapsed)
  }

  // Calculate margin based on DevSidebar state
  const contentMarginLeft = isDevSidebarCollapsed ? '60px' : '260px'

  if (!mounted) {
    // Return a placeholder with the default collapsed state during SSR
    return (
      <>
        <PocBar />
        <Taskbar />
        <DevSidebar context={context} />
        <div style={{ 
          marginTop: '72px',
          marginLeft: '60px', // Default to collapsed
          minHeight: 'calc(100vh - 72px)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'margin-left 0.3s ease'
        }}>
          <AppWrapper>
            <main style={{ flex: 1 }}>
              {children}
            </main>
          </AppWrapper>
          <Footer />
        </div>
        <Dock context={context} />
      </>
    )
  }

  return (
    <>
      <PocBar />
      <Taskbar />
      <DevSidebar context={context} />
      <div style={{ 
        marginTop: '72px', // Space for POC bar (32px) + Taskbar (28px) + some padding
        marginLeft: contentMarginLeft, // Dynamic margin based on DevSidebar state
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'margin-left 0.3s ease',
        paddingBottom: '100px' // Space for the Dock
      }}>
        <AppWrapper>
          <main style={{ flex: 1 }}>
            {children}
          </main>
        </AppWrapper>
        <Footer />
      </div>
      <Dock context={context} />
    </>
  )
}