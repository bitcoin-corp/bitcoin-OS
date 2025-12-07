class BitcoinOSStateManager {
  private static instance: BitcoinOSStateManager
  private listeners: Map<string, Function[]> = new Map()
  private cache: Map<string, any> = new Map()

  static getInstance(): BitcoinOSStateManager {
    if (!BitcoinOSStateManager.instance) {
      BitcoinOSStateManager.instance = new BitcoinOSStateManager()
    }
    return BitcoinOSStateManager.instance
  }

  private constructor() {
    // Load initial state from localStorage
    this.loadFromStorage()
    
    // Listen for storage events (cross-tab communication)
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (event) => {
        if (event.key?.startsWith('bitcoinOS-')) {
          const key = event.key.replace('bitcoinOS-', '')
          const value = event.newValue ? JSON.parse(event.newValue) : null
          this.cache.set(key, value)
          this.notifyListeners(key, value)
        }
      })
    }
  }

  getState<T>(key: string, defaultValue?: T): T {
    if (this.cache.has(key)) {
      return this.cache.get(key)
    }

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`bitcoinOS-${key}`)
      if (stored !== null) {
        try {
          const value = JSON.parse(stored)
          this.cache.set(key, value)
          return value
        } catch (error) {
          console.error(`Error parsing localStorage value for key: ${key}`, error)
        }
      }
    }

    const value = defaultValue !== undefined ? defaultValue : null
    this.cache.set(key, value)
    return value as T
  }

  setState<T>(key: string, value: T): void {
    const previousValue = this.cache.get(key)
    this.cache.set(key, value)

    // Store in localStorage
    if (typeof window !== 'undefined') {
      try {
        if (value === null || value === undefined) {
          localStorage.removeItem(`bitcoinOS-${key}`)
        } else {
          localStorage.setItem(`bitcoinOS-${key}`, JSON.stringify(value))
        }
      } catch (error) {
        console.error(`Error storing value in localStorage for key: ${key}`, error)
      }
    }

    // Notify listeners only if value changed
    if (previousValue !== value) {
      this.notifyListeners(key, value)
      
      // Dispatch global state change event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('stateChanged', {
          detail: { 
            type: key, 
            value, 
            previousValue,
            timestamp: Date.now() 
          }
        }))
      }
    }
  }

  subscribe(key: string, callback: (value: any, previousValue?: any) => void): () => void {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, [])
    }
    this.listeners.get(key)!.push(callback)

    // Return unsubscribe function
    return () => {
      const callbacks = this.listeners.get(key)
      if (callbacks) {
        const index = callbacks.indexOf(callback)
        if (index > -1) callbacks.splice(index, 1)
      }
    }
  }

  subscribeToMultiple(keys: string[], callback: (changes: Record<string, any>) => void): () => void {
    const unsubscribeFunctions: (() => void)[] = []

    keys.forEach(key => {
      const unsubscribe = this.subscribe(key, (value) => {
        const changes = { [key]: value }
        callback(changes)
      })
      unsubscribeFunctions.push(unsubscribe)
    })

    // Return function to unsubscribe from all
    return () => {
      unsubscribeFunctions.forEach(unsubscribe => unsubscribe())
    }
  }

  removeState(key: string): void {
    this.cache.delete(key)
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`bitcoinOS-${key}`)
    }

    this.notifyListeners(key, null)
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('stateChanged', {
        detail: { 
          type: key, 
          value: null, 
          timestamp: Date.now() 
        }
      }))
    }
  }

  clearAll(prefix?: string): void {
    if (prefix) {
      // Clear only keys with specific prefix
      const keysToRemove = Array.from(this.cache.keys()).filter(key => key.startsWith(prefix))
      keysToRemove.forEach(key => this.removeState(key))
    } else {
      // Clear all Bitcoin-OS state
      this.cache.clear()
      
      if (typeof window !== 'undefined') {
        const keysToRemove: string[] = []
        
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          if (key?.startsWith('bitcoinOS-')) {
            keysToRemove.push(key)
          }
        }
        
        keysToRemove.forEach(key => localStorage.removeItem(key))
      }

      // Notify all listeners that their state was cleared
      this.listeners.forEach((callbacks, key) => {
        this.notifyListeners(key, null)
      })
    }
  }

  getAllState(): Record<string, any> {
    const state: Record<string, any> = {}
    this.cache.forEach((value, key) => {
      state[key] = value
    })
    return state
  }

  exportState(): string {
    return JSON.stringify(this.getAllState(), null, 2)
  }

  importState(stateJson: string): void {
    try {
      const state = JSON.parse(stateJson)
      Object.entries(state).forEach(([key, value]) => {
        this.setState(key, value)
      })
    } catch (error) {
      console.error('Error importing state:', error)
      throw new Error('Invalid state JSON')
    }
  }

  private notifyListeners(key: string, value: any): void {
    const callbacks = this.listeners.get(key)
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(value)
        } catch (error) {
          console.error(`Error in state listener for key: ${key}`, error)
        }
      })
    }
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return

    try {
      for (let i = 0; i < localStorage.length; i++) {
        const fullKey = localStorage.key(i)
        if (fullKey?.startsWith('bitcoinOS-')) {
          const key = fullKey.replace('bitcoinOS-', '')
          const value = localStorage.getItem(fullKey)
          
          if (value !== null) {
            try {
              this.cache.set(key, JSON.parse(value))
            } catch (error) {
              console.error(`Error parsing stored value for key: ${key}`, error)
            }
          }
        }
      }
    } catch (error) {
      console.error('Error loading state from localStorage:', error)
    }
  }

  // Utility methods for common state patterns
  
  // Dock state management
  getDockStyle(): 'minimal' | 'large' {
    return this.getState('dock-style', 'minimal')
  }

  setDockStyle(style: 'minimal' | 'large'): void {
    this.setState('dock-style', style)
  }

  // Theme management
  getIconTheme(): string {
    return this.getState('icon-theme', 'lucide')
  }

  setIconTheme(theme: string): void {
    this.setState('icon-theme', theme)
  }

  getDarkMode(): boolean {
    return this.getState('dark-mode', true)
  }

  setDarkMode(enabled: boolean): void {
    this.setState('dark-mode', enabled)
  }

  // Auth state helpers
  isAuthenticated(): boolean {
    return this.getState('auth-authenticated', false)
  }

  getCurrentApp(): string {
    return this.getState('current-app', 'bitcoin-os')
  }

  setCurrentApp(appId: string): void {
    this.setState('current-app', appId)
  }
}

export default BitcoinOSStateManager