'use client'

import { useState, useEffect } from 'react'
import { Monitor, Zap, Palette, Shield, Volume2, User } from 'lucide-react'

export default function SettingsWindow() {
  const [appMode, setAppMode] = useState<'fullscreen' | 'windowed'>('fullscreen')
  const [devSidebarCollapsed, setDevSidebarCollapsed] = useState(true)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [colorCyclingEnabled, setColorCyclingEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)

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
    // Apply/remove color cycling class to body
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

  const SettingSection = ({ icon: Icon, title, children }: { icon: any, title: string, children: React.ReactNode }) => (
    <div className="bg-black/20 border border-gray-700/50 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-5 h-5 text-bitcoin-orange" />
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      {children}
    </div>
  )

  const SettingRow = ({ label, description, children }: { label: string, description?: string, children: React.ReactNode }) => (
    <div className="flex items-center justify-between py-2 border-b border-gray-700/30 last:border-b-0">
      <div className="flex-1 min-w-0 mr-4">
        <div className="text-white text-sm font-medium">{label}</div>
        {description && <div className="text-gray-400 text-xs mt-1">{description}</div>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  )

  const Toggle = ({ checked, onChange }: { checked: boolean, onChange: (checked: boolean) => void }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
        checked ? 'bg-bitcoin-orange' : 'bg-gray-600'
      }`}
    >
      <span
        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
    </button>
  )

  const RadioButton = ({ checked, label, description, onClick }: { checked: boolean, label: string, description?: string, onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`w-full text-left p-2 rounded border transition-all text-sm ${
        checked
          ? 'border-bitcoin-orange bg-bitcoin-orange/10 text-white'
          : 'border-gray-600 bg-gray-800/30 text-gray-300 hover:border-gray-500'
      }`}
    >
      <div className="font-medium">{label}</div>
      {description && <div className="text-xs text-gray-400 mt-1">{description}</div>}
    </button>
  )

  return (
    <div className="h-full overflow-y-auto bg-gray-900/50 backdrop-blur-sm">
      <div className="p-4">
        
        {/* App Behavior */}
        <SettingSection icon={Monitor} title="App Behavior">
          <SettingRow 
            label="App Opening Mode" 
            description="How apps open when launched"
          >
            <div className="space-y-2 min-w-[200px]">
              <RadioButton
                checked={appMode === 'fullscreen'}
                label="Fullscreen URLs"
                description="Apps open in same window"
                onClick={() => handleAppModeChange('fullscreen')}
              />
              <RadioButton
                checked={appMode === 'windowed'}
                label="Windowed Apps"
                description="Apps open in draggable windows"
                onClick={() => handleAppModeChange('windowed')}
              />
            </div>
          </SettingRow>
        </SettingSection>

        {/* Interface */}
        <SettingSection icon={Palette} title="Interface">
          <SettingRow 
            label="Developer Sidebar" 
            description="Default state on startup"
          >
            <div className="space-y-2 min-w-[200px]">
              <RadioButton
                checked={!devSidebarCollapsed}
                label="Expanded"
                description="Show sidebar expanded"
                onClick={() => handleDevSidebarToggle(false)}
              />
              <RadioButton
                checked={devSidebarCollapsed}
                label="Collapsed"
                description="Show sidebar collapsed"
                onClick={() => handleDevSidebarToggle(true)}
              />
            </div>
          </SettingRow>
          
          <SettingRow 
            label="Color Cycling" 
            description="Rainbow animations on Bitcoin symbol and Developer Hub"
          >
            <Toggle checked={colorCyclingEnabled} onChange={handleColorCyclingToggle} />
          </SettingRow>
          
          <SettingRow 
            label="UI Animations" 
            description="Window transitions and effects"
          >
            <Toggle checked={animationsEnabled} onChange={handleAnimationsToggle} />
          </SettingRow>
        </SettingSection>

        {/* System */}
        <SettingSection icon={Shield} title="System">
          <SettingRow 
            label="Notifications" 
            description="System notifications and alerts"
          >
            <Toggle checked={notificationsEnabled} onChange={handleNotificationsToggle} />
          </SettingRow>
          
          <SettingRow 
            label="Sound Effects" 
            description="System sounds and audio feedback"
          >
            <Toggle checked={soundEnabled} onChange={handleSoundToggle} />
          </SettingRow>
        </SettingSection>

        {/* About */}
        <SettingSection icon={User} title="About Bitcoin OS">
          <div className="text-gray-300 space-y-1 text-sm">
            <div className="font-medium">Version 1.0.0</div>
            <div className="text-gray-400">The Operating System for Bitcoin</div>
            <div className="text-gray-400">© 2025 The Bitcoin Corporation LTD</div>
            <div className="text-gray-400 text-xs">Company No. 16735102</div>
          </div>
        </SettingSection>

      </div>
    </div>
  )
}