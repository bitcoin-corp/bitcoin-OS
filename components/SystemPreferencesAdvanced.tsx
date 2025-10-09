'use client'

import { useState, useEffect } from 'react'
import { 
  X, Settings, Palette, Monitor, Volume2, Wifi, Battery, 
  Sparkles, Type, Zap, Download, Upload, Check,
  Sun, Moon, Sunrise, Cloud, Trees, Bitcoin,
  Cpu, Grid3X3, Waves, Circle
} from 'lucide-react'
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

export default function SystemPreferencesAdvanced({ isOpen, onClose }: SystemPreferencesProps) {
  const [activeTab, setActiveTab] = useState('themes')
  const [themeConfig, setLocalThemeConfig] = useState<ThemeConfig>(getCurrentThemeConfig())
  const [showImportExport, setShowImportExport] = useState(false)
  const [importJson, setImportJson] = useState('')
  const [customAccent, setCustomAccent] = useState(themeConfig.accentColor || '#f7931a')

  // Load saved preferences on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && isOpen) {
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

  // Export current theme
  const handleExport = () => {
    const json = exportTheme(themeConfig)
    navigator.clipboard.writeText(json)
    alert('Theme configuration copied to clipboard!')
  }

  // Import theme
  const handleImport = () => {
    const result = importTheme(importJson)
    if (result) {
      setLocalThemeConfig(result)
      setImportJson('')
      setShowImportExport(false)
      alert('Theme imported successfully!')
    } else {
      alert('Invalid theme JSON')
    }
  }

  if (!isOpen) return null

  const tabs = [
    { id: 'themes', name: 'Themes', icon: Sparkles },
    { id: 'colors', name: 'Colors', icon: Palette },
    { id: 'icons', name: 'Icons', icon: Grid3X3 },
    { id: 'typography', name: 'Typography', icon: Type },
    { id: 'animations', name: 'Animations', icon: Zap },
    { id: 'display', name: 'Display', icon: Monitor },
    { id: 'sound', name: 'Sound', icon: Volume2 },
  ]

  const iconThemes: { value: IconTheme; label: string; description: string }[] = [
    { value: 'lucide', label: 'Lucide Icons', description: 'Clean, minimal line icons' },
    { value: 'react-icons', label: 'Material Icons', description: 'Google Material Design icons' },
    { value: 'tabler', label: 'Tabler Icons', description: 'Over 2000+ SVG icons' },
    { value: 'heroicons', label: 'Hero Icons', description: 'Beautiful hand-crafted SVG icons' },
    { value: 'feather', label: 'Feather Icons', description: 'Simply beautiful open source icons' },
    { value: 'phosphor', label: 'Phosphor Icons', description: 'Flexible icon family' },
    { value: 'remix', label: 'Remix Icons', description: 'Open source neutral style icons' },
    { value: 'bootstrap', label: 'Bootstrap Icons', description: 'Official Bootstrap icon library' },
  ]

  const backgroundPatterns: { value: string; label: string; icon: any }[] = [
    { value: 'none', label: 'None', icon: X },
    { value: 'dots', label: 'Dots', icon: Circle },
    { value: 'grid', label: 'Grid', icon: Grid3X3 },
    { value: 'circuit', label: 'Circuit', icon: Cpu },
    { value: 'waves', label: 'Waves', icon: Waves },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-600 w-[900px] h-[700px] flex overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between bg-gray-800/80 px-6 py-4 border-b border-gray-600 z-10">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-gray-300" />
            <h2 className="text-xl font-semibold text-white">System Preferences</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowImportExport(!showImportExport)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title="Import/Export Theme"
            >
              {showImportExport ? <Upload className="w-5 h-5 text-gray-400" /> : <Download className="w-5 h-5 text-gray-400" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-64 bg-gray-800/60 border-r border-gray-600 pt-20 pb-6 overflow-y-auto">
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
          {/* Import/Export Section */}
          {showImportExport && (
            <div className="mb-6 p-4 bg-gray-800/40 rounded-xl border border-gray-700">
              <h4 className="text-white font-medium mb-3">Import/Export Theme</h4>
              <div className="space-y-3">
                <button
                  onClick={handleExport}
                  className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Export Current Theme to Clipboard
                </button>
                <textarea
                  value={importJson}
                  onChange={(e) => setImportJson(e.target.value)}
                  placeholder="Paste theme JSON here..."
                  className="w-full h-32 px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
                <button
                  onClick={handleImport}
                  disabled={!importJson}
                  className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Import Theme
                </button>
              </div>
            </div>
          )}

          {/* Themes Tab */}
          {activeTab === 'themes' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Quick Theme Presets</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(presetThemes).map(([name, preset]) => (
                    <button
                      key={name}
                      onClick={() => applyPreset(name)}
                      className="p-4 bg-gray-800/40 hover:bg-gray-700/40 rounded-xl border border-gray-700 hover:border-gray-600 transition-all"
                    >
                      <div className="text-white font-medium mb-1">
                        {name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {preset.colorTheme} • {preset.iconTheme} • {preset.animationStyle}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Colors Tab */}
          {activeTab === 'colors' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Color Themes</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(colorThemes).map(([key, theme]) => (
                    <button
                      key={key}
                      onClick={() => handleThemeChange({ colorTheme: key as ColorTheme })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        themeConfig.colorTheme === key
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-medium">{theme.name}</span>
                        {themeConfig.colorTheme === key && (
                          <Check className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                      <div className="flex gap-2 mb-2">
                        <div 
                          className="w-8 h-8 rounded-full border border-gray-600"
                          style={{ backgroundColor: theme.colors.bgPrimary }}
                        />
                        <div 
                          className="w-8 h-8 rounded-full border border-gray-600"
                          style={{ backgroundColor: theme.colors.bgSecondary }}
                        />
                        <div 
                          className="w-8 h-8 rounded-full border border-gray-600"
                          style={{ backgroundColor: theme.colors.accent }}
                        />
                        <div 
                          className="w-8 h-8 rounded-full border border-gray-600"
                          style={{ backgroundColor: theme.colors.textPrimary }}
                        />
                      </div>
                      <p className="text-gray-400 text-sm">{theme.description}</p>
                    </button>
                  ))}
                </div>

                {/* Custom Accent Color */}
                <div className="mt-6 p-4 bg-gray-800/40 rounded-xl border border-gray-700">
                  <h4 className="text-white font-medium mb-3">Custom Accent Color</h4>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={customAccent}
                      onChange={(e) => {
                        setCustomAccent(e.target.value)
                        handleThemeChange({ accentColor: e.target.value })
                      }}
                      className="w-20 h-10 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={customAccent}
                      onChange={(e) => {
                        setCustomAccent(e.target.value)
                        handleThemeChange({ accentColor: e.target.value })
                      }}
                      className="flex-1 px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                      placeholder="#f7931a"
                    />
                  </div>
                </div>

                {/* Background Pattern */}
                <div className="mt-6 p-4 bg-gray-800/40 rounded-xl border border-gray-700">
                  <h4 className="text-white font-medium mb-3">Background Pattern</h4>
                  <div className="grid grid-cols-5 gap-3">
                    {backgroundPatterns.map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        onClick={() => handleThemeChange({ backgroundPattern: value as any })}
                        className={`p-3 rounded-lg border transition-all ${
                          themeConfig.backgroundPattern === value
                            ? 'border-blue-500 bg-blue-500/20'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <Icon className="w-6 h-6 text-gray-300 mx-auto mb-1" />
                        <span className="text-xs text-gray-400">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Icons Tab */}
          {activeTab === 'icons' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Icon Libraries</h3>
                <div className="space-y-3">
                  {iconThemes.map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => handleThemeChange({ iconTheme: theme.value })}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        themeConfig.iconTheme === theme.value
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{theme.label}</span>
                        {themeConfig.iconTheme === theme.value && (
                          <Check className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{theme.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Typography Tab */}
          {activeTab === 'typography' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Font Themes</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(fontThemes).map(([key, font]) => (
                    <button
                      key={key}
                      onClick={() => handleThemeChange({ fontTheme: key as FontTheme })}
                      style={{ fontFamily: font.fontFamily }}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        themeConfig.fontTheme === key
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{font.name}</span>
                        {themeConfig.fontTheme === key && (
                          <Check className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                      <p className="text-gray-400" style={{ fontSize: font.fontSize }}>
                        The quick brown fox jumps over the lazy dog
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Animations Tab */}
          {activeTab === 'animations' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Animation Styles</h3>
                <div className="space-y-3">
                  {Object.entries(animationPresets).map(([key, preset]) => (
                    <button
                      key={key}
                      onClick={() => handleThemeChange({ animationStyle: key as AnimationStyle })}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        themeConfig.animationStyle === key
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{preset.name}</span>
                        {themeConfig.animationStyle === key && (
                          <Check className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{preset.description}</p>
                    </button>
                  ))}
                </div>

                {/* Window Style */}
                <div className="mt-6 p-4 bg-gray-800/40 rounded-xl border border-gray-700">
                  <h4 className="text-white font-medium mb-3">Window Style</h4>
                  <div className="grid grid-cols-4 gap-3">
                    {['modern', 'classic', 'minimal', 'glass'].map((style) => (
                      <button
                        key={style}
                        onClick={() => handleThemeChange({ windowStyle: style as any })}
                        className={`p-3 rounded-lg border transition-all ${
                          themeConfig.windowStyle === style
                            ? 'border-blue-500 bg-blue-500/20'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <span className="text-sm text-gray-300 capitalize">{style}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Display Tab */}
          {activeTab === 'display' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white mb-4">Display Settings</h3>
              <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700">
                <p className="text-gray-400">Display settings coming soon...</p>
              </div>
            </div>
          )}

          {/* Sound Tab */}
          {activeTab === 'sound' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white mb-4">Sound Settings</h3>
              <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={themeConfig.soundEnabled}
                    onChange={(e) => handleThemeChange({ soundEnabled: e.target.checked })}
                    className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-white">Enable system sounds</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}