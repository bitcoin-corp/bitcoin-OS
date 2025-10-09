'use client'

import { useState, useEffect } from 'react'
import { X, Settings, Palette, Monitor, Volume2, Wifi, Battery, Sparkles, Type, Zap, Download, Upload, Check } from 'lucide-react'
import { 
  getCurrentThemeConfig, 
  setThemeConfig, 
  colorThemes, 
  fontThemes, 
  animationPresets, 
  presetThemes,
  exportTheme,
  importTheme,
  type ThemeConfig,
  type ColorTheme,
  type IconTheme,
  type AnimationStyle,
  type FontTheme
} from '@/lib/advanced-themes'

interface SystemPreferencesProps {
  isOpen: boolean
  onClose: () => void
}

export default function SystemPreferences({ isOpen, onClose }: SystemPreferencesProps) {
  const [activeTab, setActiveTab] = useState('appearance')
  const [themeConfig, setLocalThemeConfig] = useState<ThemeConfig>(getCurrentThemeConfig())
  const [showImportExport, setShowImportExport] = useState(false)
  const [importJson, setImportJson] = useState('')

  // Load saved preferences on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLocalThemeConfig(getCurrentThemeConfig())
    }
  }, [isOpen])

  // Handle theme changes
  const handleThemeChange = (updates: Partial<ThemeConfig>) => {
    const newConfig = { ...themeConfig, ...updates }
    setLocalThemeConfig(newConfig)
    setThemeConfig(updates)
  }

  // Apply preset theme
  const applyPreset = (presetName: string) => {
    const preset = presetThemes[presetName]
    if (preset) {
      setLocalThemeConfig(preset)
      setThemeConfig(preset)
    }
  }

  if (!isOpen) return null

  const tabs = [
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'display', name: 'Display', icon: Monitor },
    { id: 'sound', name: 'Sound', icon: Volume2 },
    { id: 'network', name: 'Network', icon: Wifi },
    { id: 'battery', name: 'Battery', icon: Battery },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-600 w-[800px] h-[600px] flex overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between bg-gray-800/80 px-6 py-4 border-b border-gray-600 z-10">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-gray-300" />
            <h2 className="text-xl font-semibold text-white">System Preferences</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Sidebar */}
        <div className="w-64 bg-gray-800/60 border-r border-gray-600 pt-20 pb-6">
          <div className="px-4 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 pt-20 pb-6 px-6 overflow-y-auto">
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Appearance Settings</h3>
                
                {/* Icon Theme Section */}
                <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700">
                  <h4 className="text-base font-medium text-white mb-3">Icon Theme</h4>
                  <p className="text-gray-400 text-sm mb-4">
                    Choose the icon style for your desktop and dock
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {/* Lucide Theme */}
                    <div
                      className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        iconTheme === 'lucide'
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      onClick={() => handleThemeChange('lucide')}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="text-white font-medium">Lucide Icons</div>
                        <div className="flex gap-2">
                          {/* Preview icons from Lucide */}
                          <div className="w-8 h-8 text-blue-500">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                              <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                              <line x1="12" y1="22.08" x2="12" y2="12"/>
                            </svg>
                          </div>
                          <div className="w-8 h-8 text-green-500">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
                              <path d="m12 12 4 4-4 4-4-4 4-4"/>
                            </svg>
                          </div>
                          <div className="w-8 h-8 text-purple-500">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M9 12h6"/>
                              <path d="M9 16h6"/>
                              <path d="m3 7 3-3 3 3"/>
                              <path d="M6 18V4"/>
                              <path d="m15 7 3-3 3 3"/>
                              <path d="M18 18V4"/>
                            </svg>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 text-center">
                          Clean, minimal line icons
                        </div>
                      </div>
                      {iconTheme === 'lucide' && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* React Icons Theme */}
                    <div
                      className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        iconTheme === 'react-icons'
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      onClick={() => handleThemeChange('react-icons')}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="text-white font-medium">Material Icons</div>
                        <div className="flex gap-2">
                          {/* Preview icons from React Icons */}
                          <div className="w-8 h-8 text-blue-500">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                            </svg>
                          </div>
                          <div className="w-8 h-8 text-green-500">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                          </div>
                          <div className="w-8 h-8 text-purple-500">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 text-center">
                          Filled, modern material icons
                        </div>
                      </div>
                      {iconTheme === 'react-icons' && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'display' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white mb-4">Display Settings</h3>
              <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700">
                <p className="text-gray-400">Display settings coming soon...</p>
              </div>
            </div>
          )}

          {activeTab === 'sound' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white mb-4">Sound Settings</h3>
              <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700">
                <p className="text-gray-400">Sound settings coming soon...</p>
              </div>
            </div>
          )}

          {activeTab === 'network' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white mb-4">Network Settings</h3>
              <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700">
                <p className="text-gray-400">Network settings coming soon...</p>
              </div>
            </div>
          )}

          {activeTab === 'battery' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white mb-4">Battery Settings</h3>
              <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700">
                <p className="text-gray-400">Battery settings coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}