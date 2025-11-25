/**
 * BitcoinOS State Manager - Singleton class for centralized state management
 */
export class BitcoinOSStateManager {
  private static instance: BitcoinOSStateManager;
  private listeners: Map<string, Function[]> = new Map();

  private constructor() {
    // Private constructor for singleton pattern
  }

  static getInstance(): BitcoinOSStateManager {
    if (!BitcoinOSStateManager.instance) {
      BitcoinOSStateManager.instance = new BitcoinOSStateManager();
    }
    return BitcoinOSStateManager.instance;
  }

  /**
   * Get state value from localStorage with Bitcoin-OS prefix
   */
  getState<T>(key: string, defaultValue: T): T {
    try {
      const stored = localStorage.getItem(`bitcoinOS-${key}`);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.warn(`Failed to parse state for key: ${key}`, error);
      return defaultValue;
    }
  }

  /**
   * Set state value in localStorage and notify listeners
   */
  setState<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`bitcoinOS-${key}`, JSON.stringify(value));
      this.notifyListeners(key, value);
      
      // Dispatch global state change event
      window.dispatchEvent(new CustomEvent('stateChanged', {
        detail: { type: key, value, timestamp: Date.now() }
      }));

      // Dispatch specific event for backward compatibility
      window.dispatchEvent(new CustomEvent(`${key}Changed`, { detail: value }));
    } catch (error) {
      console.error(`Failed to set state for key: ${key}`, error);
    }
  }

  /**
   * Subscribe to state changes for a specific key
   */
  subscribe(key: string, callback: Function): () => void {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, []);
    }
    this.listeners.get(key)!.push(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.listeners.get(key);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) callbacks.splice(index, 1);
      }
    };
  }

  /**
   * Clear all state data (useful for logout/reset)
   */
  clearAllState(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('bitcoinOS-')) {
        localStorage.removeItem(key);
      }
    });

    // Notify all listeners of the clear
    this.listeners.clear();
    window.dispatchEvent(new CustomEvent('stateCleared', { detail: { timestamp: Date.now() } }));
  }

  /**
   * Get all Bitcoin-OS state keys and values
   */
  getAllState(): Record<string, any> {
    const state: Record<string, any> = {};
    const keys = Object.keys(localStorage);
    
    keys.forEach(key => {
      if (key.startsWith('bitcoinOS-')) {
        const cleanKey = key.replace('bitcoinOS-', '');
        try {
          state[cleanKey] = JSON.parse(localStorage.getItem(key) || '');
        } catch {
          state[cleanKey] = localStorage.getItem(key);
        }
      }
    });

    return state;
  }

  /**
   * Migrate old state keys to new format
   */
  migrateState(oldKeys: Record<string, string>): void {
    Object.entries(oldKeys).forEach(([oldKey, newKey]) => {
      const value = localStorage.getItem(oldKey);
      if (value) {
        localStorage.setItem(`bitcoinOS-${newKey}`, value);
        localStorage.removeItem(oldKey);
      }
    });
  }

  private notifyListeners(key: string, value: any): void {
    const callbacks = this.listeners.get(key);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(value);
        } catch (error) {
          console.error(`Error in state listener for key: ${key}`, error);
        }
      });
    }
  }
}

// Export singleton instance
export default BitcoinOSStateManager.getInstance();