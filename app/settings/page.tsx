'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Monitor, Palette, Shield, User } from 'lucide-react'
import Link from 'next/link'
import ProofOfConceptBar from '@/components/ProofOfConceptBar'
import TopMenuBar from '@/components/TopMenuBar'
import DevSidebar from '@/components/DevSidebar'
import Dock from '@/components/Dock'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function SettingsPage() {
  const [appMode, setAppMode] = useState<'fullscreen' | 'windowed'>('fullscreen')
  const [devSidebarCollapsed, setDevSidebarCollapsed] = useState(true)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [colorCyclingEnabled, setColorCyclingEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showDevSidebar, setShowDevSidebar] = useState(true)
  const isMobile = useIsMobile()

  useEffect(() => {
    // Load current preferences
    if (typeof window !== 'undefined') {
      const savedAppMode = localStorage.getItem('appMode') as 'fullscreen' | 'windowed' || 'fullscreen'
      const savedDevSidebarCollapsed = localStorage.getItem('devSidebarCollapsed') === 'true'
      const savedAnimationsEnabled = localStorage.getItem('animationsEnabled') !== 'false'
      const savedColorCyclingEnabled = localStorage.getItem('colorCyclingEnabled') !== 'false'
      const savedNotificationsEnabled = localStorage.getItem('notificationsEnabled') !== 'false'
      const savedSoundEnabled = localStorage.getItem('soundEnabled') !== 'false'
      
      setAppMode(savedAppMode)
      setDevSidebarCollapsed(savedDevSidebarCollapsed)
      setAnimationsEnabled(savedAnimationsEnabled)
      setColorCyclingEnabled(savedColorCyclingEnabled)
      setNotificationsEnabled(savedNotificationsEnabled)
      setSoundEnabled(savedSoundEnabled)
      
      // Apply current settings to document
      if (!savedAnimationsEnabled) {
        document.body.classList.add('no-animations')
      }
      if (!savedColorCyclingEnabled) {
        document.body.classList.add('no-color-cycling')
      }
    }
  }, [])

  useEffect(() => {
    // Keyboard shortcut for dev sidebar
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'd') {
        e.preventDefault()
        setShowDevSidebar(!showDevSidebar)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [showDevSidebar])

  const handleAppModeChange = (mode: 'fullscreen' | 'windowed') => {
    setAppMode(mode)
    localStorage.setItem('appMode', mode)
  }

  const handleDevSidebarToggle = (collapsed: boolean) => {
    setDevSidebarCollapsed(collapsed)
    localStorage.setItem('devSidebarCollapsed', collapsed.toString())
  }

  const handleAnimationsToggle = (enabled: boolean) => {
    setAnimationsEnabled(enabled)
    localStorage.setItem('animationsEnabled', enabled.toString())
    if (enabled) {
      document.body.classList.remove('no-animations')
    } else {
      document.body.classList.add('no-animations')
    }
  }

  const handleColorCyclingToggle = (enabled: boolean) => {
    setColorCyclingEnabled(enabled)
    localStorage.setItem('colorCyclingEnabled', enabled.toString())
    if (enabled) {
      document.body.classList.remove('no-color-cycling')
    } else {
      document.body.classList.add('no-color-cycling')
    }
  }

  const handleNotificationsToggle = (enabled: boolean) => {
    setNotificationsEnabled(enabled)
    localStorage.setItem('notificationsEnabled', enabled.toString())
  }

  const handleSoundToggle = (enabled: boolean) => {
    setSoundEnabled(enabled)
    localStorage.setItem('soundEnabled', enabled.toString())
  }

  const openApp = (appName: string) => {
    // Handle app opening - for settings page, we can just show placeholder
    console.log('Opening app:', appName)
  }

  const SettingSection = ({ icon: Icon, title, children }: { icon: any, title: string, children: React.ReactNode }) => (
    <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6 text-bitcoin-orange" />
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      {children}
    </div>
  )

  const SettingRow = ({ label, description, children }: { label: string, description?: string, children: React.ReactNode }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-800 last:border-b-0">
      <div>
        <div className="text-white font-medium">{label}</div>
        {description && <div className="text-gray-400 text-sm">{description}</div>}
      </div>
      <div>{children}</div>
    </div>
  )

  const Toggle = ({ checked, onChange }: { checked: boolean, onChange: (checked: boolean) => void }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-bitcoin-orange' : 'bg-gray-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )

  const RadioGroup = ({ options, value, onChange }: { options: Array<{value: string, label: string, description?: string}>, value: string, onChange: (value: string) => void }) => (
    <div className="space-y-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`w-full text-left p-3 rounded-lg border transition-all ${
            value === option.value
              ? 'border-bitcoin-orange bg-bitcoin-orange/10 text-white'
              : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600'
          }`}
        >
          <div className="font-medium">{option.label}</div>
          {option.description && <div className="text-sm text-gray-400 mt-1">{option.description}</div>}
        </button>
      ))}
    </div>
  )

  return (
    <div className="h-screen flex flex-col relative bg-black">
      <ProofOfConceptBar />
      <TopMenuBar onOpenApp={openApp} />
      
      <div className="flex-1 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 bitcoin-mesh" />
        
        {/* Dev Sidebar */}
        {showDevSidebar && !isMobile && <DevSidebar />}
        
        {/* Dock */}
        <Dock />
        
        {/* Settings Content */}
        <div className={`absolute inset-0 overflow-y-auto ${showDevSidebar && !isMobile ? 'pl-64' : ''}`}>
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-6 h-6" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-white">System Preferences</h1>
                  <p className="text-gray-400">Customize your Bitcoin OS experience</p>
                </div>
              </div>
            </div>
        
            {/* App Behavior */}
            <SettingSection icon={Monitor} title="App Behavior">
              <SettingRow 
                label="App Opening Mode" 
                description="Choose how apps open when launched"
              >
                <RadioGroup
                  options={[
                    { value: 'fullscreen', label: 'Fullscreen URLs', description: 'Apps open in the same window (recommended)' },
                    { value: 'windowed', label: 'Windowed Apps', description: 'Apps open in draggable windows on desktop' }
                  ]}
                  value={appMode}
                  onChange={handleAppModeChange}
                />
              </SettingRow>
            </SettingSection>

            {/* Interface */}
            <SettingSection icon={Palette} title="Interface">
              <SettingRow 
                label="Developer Sidebar" 
                description="Default state of the developer sidebar on startup"
              >
                <RadioGroup
                  options={[
                    { value: 'false', label: 'Expanded', description: 'Show sidebar expanded by default' },
                    { value: 'true', label: 'Collapsed', description: 'Show sidebar collapsed by default (recommended)' }
                  ]}
                  value={devSidebarCollapsed.toString()}
                  onChange={(value) => handleDevSidebarToggle(value === 'true')}
                />
              </SettingRow>
              
              <SettingRow 
                label="Color Cycling Animations" 
                description="Rainbow color animations on Bitcoin symbol and Developer Hub text"
              >
                <Toggle checked={colorCyclingEnabled} onChange={handleColorCyclingToggle} />
              </SettingRow>
              
              <SettingRow 
                label="UI Animations" 
                description="Window transitions, hover effects, and other animations"
              >
                <Toggle checked={animationsEnabled} onChange={handleAnimationsToggle} />
              </SettingRow>
            </SettingSection>

            {/* System */}
            <SettingSection icon={Shield} title="System">
              <SettingRow 
                label="Notifications" 
                description="Show system notifications and alerts"
              >
                <Toggle checked={notificationsEnabled} onChange={handleNotificationsToggle} />
              </SettingRow>
              
              <SettingRow 
                label="Sound Effects" 
                description="Play sounds for system events and interactions"
              >
                <Toggle checked={soundEnabled} onChange={handleSoundToggle} />
              </SettingRow>
            </SettingSection>

            {/* About */}
            <SettingSection icon={User} title="About Bitcoin OS">
              <div className="text-gray-300 space-y-2">
                <div>Version 1.0.0</div>
                <div className="text-gray-400">The Operating System for Bitcoin</div>
                <div className="text-gray-400">© 2025 The Bitcoin Corporation LTD</div>
                <div className="text-gray-400">Registered in England and Wales • Company No. 16735102</div>
              </div>
            </SettingSection>

          </div>
        </div>
      </div>
    </div>
  )
}