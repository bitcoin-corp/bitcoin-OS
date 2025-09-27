'use client'

import React from 'react'
import ProofOfConceptBar from './ProofOfConceptBar'
import TopMenuBar from './TopMenuBar'
import DevSidebar from './DevSidebar'
import Dock from './Dock'
import { useDevSidebar, useIsMobile } from '../hooks'
import type { BitcoinOSConfig } from '../types'

interface BitcoinOSProviderProps {
  children: React.ReactNode
  config: BitcoinOSConfig
}

export default function BitcoinOSProvider({ children, config }: BitcoinOSProviderProps) {
  const {
    context,
    showDevSidebar: showDevSidebarProp = true,
    showDock = true,
    showPocBar = true,
    customStyles,
    onAppOpen
  } = config

  const [showDevSidebar, setShowDevSidebar] = useDevSidebar()
  const isMobile = useIsMobile()

  // Apply custom styles if provided
  React.useEffect(() => {
    if (customStyles) {
      const styleElement = document.createElement('style')
      styleElement.textContent = customStyles
      document.head.appendChild(styleElement)
      return () => {
        if (document.head.contains(styleElement)) {
          document.head.removeChild(styleElement)
        }
      }
    }
  }, [customStyles])

  const shouldShowDevSidebar = showDevSidebarProp && showDevSidebar && !isMobile

  return (
    <div className="h-screen flex flex-col relative bg-black">
      {/* Proof of Concept Bar */}
      {showPocBar && (
        <ProofOfConceptBar 
          appName={context.appName}
        />
      )}
      
      {/* Top Menu Bar */}
      <TopMenuBar 
        context={context}
        onOpenApp={onAppOpen}
        showBAppsMenu={true}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 bitcoin-mesh" />
        
        {/* Dev Sidebar */}
        {shouldShowDevSidebar && (
          <DevSidebar 
            context={context}
          />
        )}
        
        {/* Main Content */}
        <div className={`relative h-full ${shouldShowDevSidebar ? 'pl-64' : ''}`}>
          {children}
        </div>
        
        {/* Dock */}
        {showDock && (
          <Dock 
            context={context}
            onAppClick={onAppOpen ? (app) => onAppOpen(app.name) : undefined}
          />
        )}
      </div>
    </div>
  )
}