// Advanced Theme System for Bitcoin OS

// Icon theme types - expanded set
export type IconTheme = 'lucide' | 'react-icons' | 'tabler' | 'heroicons' | 'feather' | 'phosphor' | 'remix' | 'bootstrap'

// Color theme types  
export type ColorTheme = 'dark' | 'light' | 'midnight' | 'sunset' | 'ocean' | 'forest' | 'bitcoin' | 'matrix' | 'cyberpunk' | 'vapor'

// Animation styles
export type AnimationStyle = 'none' | 'subtle' | 'smooth' | 'bouncy' | 'glitch' | 'neon' | 'retro'

// Font themes
export type FontTheme = 'system' | 'modern' | 'classic' | 'mono' | 'pixel' | 'elegant'

// Complete theme configuration
export interface ThemeConfig {
  iconTheme: IconTheme
  colorTheme: ColorTheme
  animationStyle: AnimationStyle
  fontTheme: FontTheme
  accentColor?: string
  backgroundPattern?: 'none' | 'dots' | 'grid' | 'circuit' | 'waves'
  windowStyle?: 'modern' | 'classic' | 'minimal' | 'glass'
  soundEnabled?: boolean
}

// Color theme definitions
export const colorThemes: Record<ColorTheme, {
  name: string
  colors: {
    bgPrimary: string
    bgSecondary: string
    bgTertiary: string
    textPrimary: string
    textSecondary: string
    accent: string
    accentHover: string
    border: string
    shadow: string
  }
  description: string
}> = {
  dark: {
    name: 'Dark Mode',
    colors: {
      bgPrimary: '#000000',
      bgSecondary: '#111111',
      bgTertiary: '#1a1a1a',
      textPrimary: '#ffffff',
      textSecondary: '#a0a0a0',
      accent: '#f7931a',
      accentHover: '#ffa940',
      border: '#333333',
      shadow: 'rgba(0,0,0,0.5)'
    },
    description: 'Classic dark theme with high contrast'
  },
  light: {
    name: 'Light Mode',
    colors: {
      bgPrimary: '#ffffff',
      bgSecondary: '#f3f4f6',
      bgTertiary: '#e5e7eb',
      textPrimary: '#111827',
      textSecondary: '#6b7280',
      accent: '#f7931a',
      accentHover: '#e88200',
      border: '#d1d5db',
      shadow: 'rgba(0,0,0,0.1)'
    },
    description: 'Clean light theme for daytime use'
  },
  midnight: {
    name: 'Midnight',
    colors: {
      bgPrimary: '#0f0f23',
      bgSecondary: '#1a1a3e',
      bgTertiary: '#25254d',
      textPrimary: '#e0e0ff',
      textSecondary: '#a0a0ff',
      accent: '#7c3aed',
      accentHover: '#8b5cf6',
      border: '#4c4c7c',
      shadow: 'rgba(124,58,237,0.2)'
    },
    description: 'Deep purple midnight theme'
  },
  sunset: {
    name: 'Sunset',
    colors: {
      bgPrimary: '#1a0f1f',
      bgSecondary: '#2a1f3f',
      bgTertiary: '#3a2f4f',
      textPrimary: '#ffd4a3',
      textSecondary: '#ff9f7f',
      accent: '#ff6b6b',
      accentHover: '#ff8787',
      border: '#5a4f6f',
      shadow: 'rgba(255,107,107,0.2)'
    },
    description: 'Warm sunset colors'
  },
  ocean: {
    name: 'Ocean',
    colors: {
      bgPrimary: '#001e3c',
      bgSecondary: '#003366',
      bgTertiary: '#004080',
      textPrimary: '#b3d9ff',
      textSecondary: '#66b2ff',
      accent: '#00bcd4',
      accentHover: '#00acc1',
      border: '#0066cc',
      shadow: 'rgba(0,188,212,0.2)'
    },
    description: 'Deep ocean blue theme'
  },
  forest: {
    name: 'Forest',
    colors: {
      bgPrimary: '#0d1f0d',
      bgSecondary: '#1a3a1a',
      bgTertiary: '#264d26',
      textPrimary: '#c1e1c1',
      textSecondary: '#81c784',
      accent: '#4caf50',
      accentHover: '#66bb6a',
      border: '#2e7d32',
      shadow: 'rgba(76,175,80,0.2)'
    },
    description: 'Natural forest green theme'
  },
  bitcoin: {
    name: 'Bitcoin',
    colors: {
      bgPrimary: '#1a0f00',
      bgSecondary: '#2a1f00',
      bgTertiary: '#3a2f00',
      textPrimary: '#f7931a',
      textSecondary: '#ffa940',
      accent: '#f7931a',
      accentHover: '#ffb84d',
      border: '#663300',
      shadow: 'rgba(247,147,26,0.3)'
    },
    description: 'Bitcoin orange theme'
  },
  matrix: {
    name: 'Matrix',
    colors: {
      bgPrimary: '#000000',
      bgSecondary: '#001100',
      bgTertiary: '#002200',
      textPrimary: '#00ff00',
      textSecondary: '#00cc00',
      accent: '#00ff00',
      accentHover: '#00ff44',
      border: '#003300',
      shadow: 'rgba(0,255,0,0.3)'
    },
    description: 'Enter the Matrix'
  },
  cyberpunk: {
    name: 'Cyberpunk',
    colors: {
      bgPrimary: '#0a0e27',
      bgSecondary: '#1a1e37',
      bgTertiary: '#2a2e47',
      textPrimary: '#ff00ff',
      textSecondary: '#00ffff',
      accent: '#ff00ff',
      accentHover: '#ff44ff',
      border: '#ff00ff44',
      shadow: 'rgba(255,0,255,0.3)'
    },
    description: 'Neon cyberpunk aesthetic'
  },
  vapor: {
    name: 'Vaporwave',
    colors: {
      bgPrimary: '#1a0033',
      bgSecondary: '#330066',
      bgTertiary: '#4d0099',
      textPrimary: '#ff71ce',
      textSecondary: '#01cdfe',
      accent: '#b967ff',
      accentHover: '#c580ff',
      border: '#ff71ce44',
      shadow: 'rgba(185,103,255,0.3)'
    },
    description: 'Aesthetic vaporwave theme'
  }
}

// Font theme definitions
export const fontThemes: Record<FontTheme, {
  name: string
  fontFamily: string
  fontSize: string
  fontWeight: string
}> = {
  system: {
    name: 'System Default',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: '400'
  },
  modern: {
    name: 'Modern',
    fontFamily: '"Inter", "Helvetica Neue", sans-serif',
    fontSize: '14px',
    fontWeight: '400'
  },
  classic: {
    name: 'Classic',
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontSize: '15px',
    fontWeight: '400'
  },
  mono: {
    name: 'Monospace',
    fontFamily: '"SF Mono", "Monaco", "Inconsolata", monospace',
    fontSize: '13px',
    fontWeight: '400'
  },
  pixel: {
    name: 'Pixel',
    fontFamily: '"Press Start 2P", monospace',
    fontSize: '12px',
    fontWeight: '400'
  },
  elegant: {
    name: 'Elegant',
    fontFamily: '"Playfair Display", "Didot", serif',
    fontSize: '15px',
    fontWeight: '400'
  }
}

// Animation presets
export const animationPresets: Record<AnimationStyle, {
  name: string
  transition: string
  hover: string
  active: string
  description: string
}> = {
  none: {
    name: 'No Animations',
    transition: 'none',
    hover: '',
    active: '',
    description: 'Disable all animations'
  },
  subtle: {
    name: 'Subtle',
    transition: 'all 0.15s ease',
    hover: 'transform: translateY(-1px)',
    active: 'transform: scale(0.98)',
    description: 'Minimal, subtle animations'
  },
  smooth: {
    name: 'Smooth',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    hover: 'transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15)',
    active: 'transform: scale(0.95)',
    description: 'Smooth, elegant transitions'
  },
  bouncy: {
    name: 'Bouncy',
    transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    hover: 'transform: translateY(-4px) scale(1.02)',
    active: 'transform: scale(0.9)',
    description: 'Playful, bouncy animations'
  },
  glitch: {
    name: 'Glitch',
    transition: 'all 0.1s steps(3)',
    hover: 'transform: translate(1px, 1px); filter: hue-rotate(90deg)',
    active: 'transform: translate(-1px, -1px); filter: invert(1)',
    description: 'Glitchy, digital effect'
  },
  neon: {
    name: 'Neon Glow',
    transition: 'all 0.3s ease',
    hover: 'box-shadow: 0 0 20px currentColor, 0 0 40px currentColor',
    active: 'filter: brightness(1.5)',
    description: 'Neon glow effects'
  },
  retro: {
    name: 'Retro',
    transition: 'all 0.2s linear',
    hover: 'transform: skew(-2deg); box-shadow: 4px 4px 0px rgba(0,0,0,0.5)',
    active: 'transform: skew(2deg)',
    description: 'Retro 80s style'
  }
}

// Get current theme configuration
export const getCurrentThemeConfig = (): ThemeConfig => {
  if (typeof window === 'undefined') {
    return {
      iconTheme: 'lucide',
      colorTheme: 'dark',
      animationStyle: 'smooth',
      fontTheme: 'system',
      soundEnabled: true
    }
  }
  
  return {
    iconTheme: (localStorage.getItem('bitcoinOS-icon-theme') as IconTheme) || 'lucide',
    colorTheme: (localStorage.getItem('bitcoinOS-color-theme') as ColorTheme) || 'dark',
    animationStyle: (localStorage.getItem('bitcoinOS-animation-style') as AnimationStyle) || 'smooth',
    fontTheme: (localStorage.getItem('bitcoinOS-font-theme') as FontTheme) || 'system',
    accentColor: localStorage.getItem('bitcoinOS-accent-color') || undefined,
    backgroundPattern: (localStorage.getItem('bitcoinOS-bg-pattern') as any) || 'none',
    windowStyle: (localStorage.getItem('bitcoinOS-window-style') as any) || 'modern',
    soundEnabled: localStorage.getItem('bitcoinOS-sound-enabled') !== 'false'
  }
}

// Set complete theme configuration
export const setThemeConfig = (config: Partial<ThemeConfig>) => {
  if (typeof window === 'undefined') return
  
  Object.entries(config).forEach(([key, value]) => {
    if (value !== undefined) {
      localStorage.setItem(`bitcoinOS-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, String(value))
    }
  })
  
  // Apply the theme
  applyTheme(getCurrentThemeConfig())
  
  // Dispatch events
  window.dispatchEvent(new CustomEvent('themeConfigChanged', { detail: config }))
}

// Apply complete theme to document
export const applyTheme = (config: ThemeConfig) => {
  if (typeof document === 'undefined') return
  
  const root = document.documentElement
  const theme = colorThemes[config.colorTheme]
  const font = fontThemes[config.fontTheme]
  const animation = animationPresets[config.animationStyle]
  
  // Apply color theme
  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase()
    root.style.setProperty(`--${cssVar}`, value)
  })
  
  // Apply font theme
  root.style.setProperty('--font-family', font.fontFamily)
  root.style.setProperty('--font-size', font.fontSize)
  root.style.setProperty('--font-weight', font.fontWeight)
  
  // Apply animation preset
  root.style.setProperty('--transition', animation.transition)
  root.style.setProperty('--hover-effect', animation.hover)
  root.style.setProperty('--active-effect', animation.active)
  
  // Apply custom accent color if provided
  if (config.accentColor) {
    root.style.setProperty('--accent', config.accentColor)
  }
  
  // Apply background pattern class
  document.body.className = document.body.className.replace(/bg-pattern-\w+/, '')
  if (config.backgroundPattern && config.backgroundPattern !== 'none') {
    document.body.classList.add(`bg-pattern-${config.backgroundPattern}`)
  }
  
  // Apply window style class
  document.body.className = document.body.className.replace(/window-style-\w+/, '')
  if (config.windowStyle) {
    document.body.classList.add(`window-style-${config.windowStyle}`)
  }
}

// Export theme as JSON for sharing
export const exportTheme = (config: ThemeConfig): string => {
  return JSON.stringify(config, null, 2)
}

// Import theme from JSON
export const importTheme = (json: string): ThemeConfig | null => {
  try {
    const config = JSON.parse(json)
    setThemeConfig(config)
    return config
  } catch (e) {
    console.error('Invalid theme JSON:', e)
    return null
  }
}

// Preset theme combinations
export const presetThemes: Record<string, ThemeConfig> = {
  'bitcoin-classic': {
    iconTheme: 'lucide',
    colorTheme: 'bitcoin',
    animationStyle: 'smooth',
    fontTheme: 'modern',
    backgroundPattern: 'circuit',
    windowStyle: 'glass'
  },
  'hacker-mode': {
    iconTheme: 'phosphor',
    colorTheme: 'matrix',
    animationStyle: 'glitch',
    fontTheme: 'mono',
    backgroundPattern: 'grid',
    windowStyle: 'minimal'
  },
  'synthwave': {
    iconTheme: 'react-icons',
    colorTheme: 'vapor',
    animationStyle: 'neon',
    fontTheme: 'modern',
    backgroundPattern: 'waves',
    windowStyle: 'glass'
  },
  'professional': {
    iconTheme: 'feather',
    colorTheme: 'light',
    animationStyle: 'subtle',
    fontTheme: 'system',
    backgroundPattern: 'none',
    windowStyle: 'modern'
  },
  'zen': {
    iconTheme: 'tabler',
    colorTheme: 'forest',
    animationStyle: 'smooth',
    fontTheme: 'elegant',
    backgroundPattern: 'dots',
    windowStyle: 'minimal'
  }
}