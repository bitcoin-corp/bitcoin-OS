# Bitcoin-OS State Management Standards

## Overview
This document defines the standardized state management patterns for all Bitcoin-OS applications to ensure consistency, interoperability, and maintainability across the ecosystem.

## Core Principles

### 1. Shared State Categories
All Bitcoin-OS apps should implement these standardized state categories:

#### Dock State
- **Key**: `dockStyle`
- **Values**: `'minimal' | 'large'`
- **Storage**: localStorage
- **Default**: `'minimal'`
- **Events**: `dockStyleChanged`

#### Theme State
- **Key**: `bitcoinOS-icon-theme`
- **Values**: `'lucide' | 'react-icons' | 'tabler' | 'heroicons' | 'feather' | 'phosphor' | 'remix' | 'bootstrap'`
- **Storage**: localStorage
- **Default**: `'lucide'`
- **Events**: `iconThemeChanged`

#### Dark Mode State
- **Key**: `darkMode`
- **Values**: `true | false`
- **Storage**: localStorage
- **Default**: `true`
- **Events**: `darkModeChanged`

#### Authentication State
- **Key**: `isAuthenticated`
- **Storage**: sessionStorage (for security)
- **Events**: `authStateChanged`

### 2. Event-Driven Communication

All cross-component state changes must use custom events for loose coupling:

```typescript
// Dispatch state change
window.dispatchEvent(new CustomEvent('stateChanged', { 
  detail: { 
    type: 'dockStyle', 
    value: newValue,
    timestamp: Date.now()
  } 
}));

// Listen for state changes
useEffect(() => {
  const handleStateChange = (event: CustomEvent) => {
    const { type, value } = event.detail;
    if (type === 'dockStyle') {
      setDockStyle(value);
    }
  };
  
  window.addEventListener('stateChanged', handleStateChange);
  return () => window.removeEventListener('stateChanged', handleStateChange);
}, []);
```

### 3. Standardized Storage Keys

All localStorage keys must follow this pattern:
- Global settings: `bitcoinOS-{setting-name}`
- App-specific: `bitcoinOS-{app-id}-{setting-name}`

Examples:
- `bitcoinOS-dock-style`
- `bitcoinOS-icon-theme`
- `bitcoinOS-dark-mode`
- `bitcoinOS-spreadsheet-auto-save`
- `bitcoinOS-writer-font-size`

## Implementation Patterns

### 1. State Hook Pattern
Create standardized hooks for each state type:

```typescript
// useDockState.ts
import { useState, useEffect } from 'react';

export const useDockState = () => {
  const [dockStyle, setDockStyle] = useState<'minimal' | 'large'>('minimal');

  useEffect(() => {
    const saved = localStorage.getItem('bitcoinOS-dock-style') as 'minimal' | 'large';
    if (saved) setDockStyle(saved);

    const handleChange = (event: CustomEvent) => {
      if (event.detail.type === 'dockStyle') {
        setDockStyle(event.detail.value);
      }
    };

    window.addEventListener('stateChanged', handleChange);
    return () => window.removeEventListener('stateChanged', handleChange);
  }, []);

  const updateDockStyle = (newStyle: 'minimal' | 'large') => {
    localStorage.setItem('bitcoinOS-dock-style', newStyle);
    setDockStyle(newStyle);
    window.dispatchEvent(new CustomEvent('stateChanged', {
      detail: { type: 'dockStyle', value: newStyle, timestamp: Date.now() }
    }));
  };

  return { dockStyle, updateDockStyle };
};
```

### 2. State Manager Class Pattern
For complex state management:

```typescript
// BitcoinOSStateManager.ts
class BitcoinOSStateManager {
  private static instance: BitcoinOSStateManager;
  private listeners: Map<string, Function[]> = new Map();

  static getInstance(): BitcoinOSStateManager {
    if (!BitcoinOSStateManager.instance) {
      BitcoinOSStateManager.instance = new BitcoinOSStateManager();
    }
    return BitcoinOSStateManager.instance;
  }

  getState<T>(key: string, defaultValue: T): T {
    const stored = localStorage.getItem(`bitcoinOS-${key}`);
    return stored ? JSON.parse(stored) : defaultValue;
  }

  setState<T>(key: string, value: T): void {
    localStorage.setItem(`bitcoinOS-${key}`, JSON.stringify(value));
    this.notifyListeners(key, value);
    
    window.dispatchEvent(new CustomEvent('stateChanged', {
      detail: { type: key, value, timestamp: Date.now() }
    }));
  }

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

  private notifyListeners(key: string, value: any): void {
    const callbacks = this.listeners.get(key);
    if (callbacks) {
      callbacks.forEach(callback => callback(value));
    }
  }
}

export default BitcoinOSStateManager;
```

### 3. Context Provider Pattern
For React applications:

```typescript
// BitcoinOSContext.tsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface BitcoinOSState {
  dockStyle: 'minimal' | 'large';
  iconTheme: string;
  darkMode: boolean;
  currentApp: string;
}

interface BitcoinOSContextType {
  state: BitcoinOSState;
  updateDockStyle: (style: 'minimal' | 'large') => void;
  updateIconTheme: (theme: string) => void;
  updateDarkMode: (enabled: boolean) => void;
  setCurrentApp: (appId: string) => void;
}

const BitcoinOSContext = createContext<BitcoinOSContextType | null>(null);

const initialState: BitcoinOSState = {
  dockStyle: 'minimal',
  iconTheme: 'lucide',
  darkMode: true,
  currentApp: 'bitcoin-os'
};

type Action = 
  | { type: 'UPDATE_DOCK_STYLE'; payload: 'minimal' | 'large' }
  | { type: 'UPDATE_ICON_THEME'; payload: string }
  | { type: 'UPDATE_DARK_MODE'; payload: boolean }
  | { type: 'SET_CURRENT_APP'; payload: string };

function reducer(state: BitcoinOSState, action: Action): BitcoinOSState {
  switch (action.type) {
    case 'UPDATE_DOCK_STYLE':
      return { ...state, dockStyle: action.payload };
    case 'UPDATE_ICON_THEME':
      return { ...state, iconTheme: action.payload };
    case 'UPDATE_DARK_MODE':
      return { ...state, darkMode: action.payload };
    case 'SET_CURRENT_APP':
      return { ...state, currentApp: action.payload };
    default:
      return state;
  }
}

export const BitcoinOSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load initial state from localStorage
  useEffect(() => {
    const dockStyle = localStorage.getItem('bitcoinOS-dock-style') as 'minimal' | 'large';
    const iconTheme = localStorage.getItem('bitcoinOS-icon-theme') || 'lucide';
    const darkMode = localStorage.getItem('bitcoinOS-dark-mode') !== 'false';
    
    if (dockStyle) dispatch({ type: 'UPDATE_DOCK_STYLE', payload: dockStyle });
    dispatch({ type: 'UPDATE_ICON_THEME', payload: iconTheme });
    dispatch({ type: 'UPDATE_DARK_MODE', payload: darkMode });
  }, []);

  const updateDockStyle = (style: 'minimal' | 'large') => {
    localStorage.setItem('bitcoinOS-dock-style', style);
    dispatch({ type: 'UPDATE_DOCK_STYLE', payload: style });
    window.dispatchEvent(new CustomEvent('dockStyleChanged', { detail: style }));
  };

  const updateIconTheme = (theme: string) => {
    localStorage.setItem('bitcoinOS-icon-theme', theme);
    dispatch({ type: 'UPDATE_ICON_THEME', payload: theme });
    window.dispatchEvent(new CustomEvent('iconThemeChanged', { detail: theme }));
  };

  const updateDarkMode = (enabled: boolean) => {
    localStorage.setItem('bitcoinOS-dark-mode', enabled.toString());
    dispatch({ type: 'UPDATE_DARK_MODE', payload: enabled });
    window.dispatchEvent(new CustomEvent('darkModeChanged', { detail: enabled }));
  };

  const setCurrentApp = (appId: string) => {
    dispatch({ type: 'SET_CURRENT_APP', payload: appId });
  };

  return (
    <BitcoinOSContext.Provider value={{
      state,
      updateDockStyle,
      updateIconTheme,
      updateDarkMode,
      setCurrentApp
    }}>
      {children}
    </BitcoinOSContext.Provider>
  );
};

export const useBitcoinOS = () => {
  const context = useContext(BitcoinOSContext);
  if (!context) {
    throw new Error('useBitcoinOS must be used within a BitcoinOSProvider');
  }
  return context;
};
```

## Migration Guidelines

### For Existing Apps

1. **Audit Current State Management**
   - Identify all localStorage keys
   - Document current state variables
   - Map to standardized categories

2. **Rename Storage Keys**
   - Update to `bitcoinOS-{key}` pattern
   - Migrate existing user data

3. **Implement Event System**
   - Add event listeners for cross-component communication
   - Replace direct state mutations with event dispatches

4. **Add State Hooks**
   - Create or import standardized state hooks
   - Replace local state management with shared patterns

### For New Apps

1. **Use Shared Package**
   ```bash
   npm install @bitcoin-os/dock @bitcoin-os/state
   ```

2. **Wrap App in Provider**
   ```tsx
   import { BitcoinOSProvider } from '@bitcoin-os/state';
   import { DockManager } from '@bitcoin-os/dock';
   
   function App() {
     return (
       <BitcoinOSProvider>
         <YourAppContent />
         <DockManager currentApp="your-app-id" />
       </BitcoinOSProvider>
     );
   }
   ```

3. **Use Standard Hooks**
   ```tsx
   import { useBitcoinOS } from '@bitcoin-os/state';
   
   function Component() {
     const { state, updateDarkMode } = useBitcoinOS();
     // Component logic
   }
   ```

## Testing Standards

All state management must include:

1. **Unit Tests**
   - Test state persistence
   - Test event dispatching
   - Test cross-component communication

2. **Integration Tests**
   - Test state synchronization between components
   - Test localStorage persistence across sessions

3. **E2E Tests**
   - Test complete user workflows
   - Test state consistency across app navigation

## Benefits

1. **Consistency**: Uniform behavior across all Bitcoin-OS apps
2. **Interoperability**: Apps can share state and communicate effectively
3. **Maintainability**: Standardized patterns reduce complexity
4. **User Experience**: Seamless experience across the ecosystem
5. **Developer Experience**: Predictable patterns and shared utilities