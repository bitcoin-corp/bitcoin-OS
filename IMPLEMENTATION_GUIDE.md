# Bitcoin-OS Shared Components Implementation Guide

This guide explains how to integrate the standardized Bitcoin-OS dock and state management systems into both existing and new applications.

## Overview

We've created two shared packages:
1. **`@bitcoin-os/dock`** - Unified dock components
2. **`@bitcoin-os/state`** - Standardized state management

## Package Structure

```
/Users/b0ase/Projects/bitcoin-OS/packages/
├── bitcoin-os-dock/          # Dock components package
│   ├── src/
│   │   ├── components/        # DockManager, Dock, MinimalDock
│   │   ├── styles/           # CSS files
│   │   └── lib/              # Icon theming system
│   └── dist/                 # Built package
└── bitcoin-os-state/         # State management package
    ├── src/
    │   ├── context/          # React Context providers
    │   ├── hooks/            # Standardized hooks
    │   └── utils/            # State management utilities
    └── dist/                 # Built package
```

## Quick Start for New Apps

### 1. Installation

```bash
# Install both packages (when published)
npm install @bitcoin-os/dock @bitcoin-os/state

# For development, use local packages:
cd /Users/b0ase/Projects/bitcoin-OS/packages/bitcoin-os-dock
npm install && npm run build

cd /Users/b0ase/Projects/bitcoin-OS/packages/bitcoin-os-state  
npm install && npm run build

# In your app, install locally:
npm install file:../bitcoin-OS/packages/bitcoin-os-dock
npm install file:../bitcoin-OS/packages/bitcoin-os-state
```

### 2. Basic Integration

```tsx
// App.tsx
import React from 'react';
import { BitcoinOSProvider } from '@bitcoin-os/state';
import { DockManager } from '@bitcoin-os/dock';

function App() {
  return (
    <BitcoinOSProvider currentApp="your-app-id">
      {/* Your app content */}
      <main>
        <h1>Your Bitcoin-OS App</h1>
        {/* App components */}
      </main>
      
      {/* Bitcoin-OS Dock */}
      <DockManager currentApp="your-app-id" />
    </BitcoinOSProvider>
  );
}

export default App;
```

### 3. Using State Management

```tsx
// Component.tsx
import React from 'react';
import { useBitcoinOS } from '@bitcoin-os/state';

function MyComponent() {
  const { state, updateDarkMode, updateDockStyle } = useBitcoinOS();

  return (
    <div>
      <p>Current theme: {state.darkMode ? 'Dark' : 'Light'}</p>
      <p>Dock style: {state.dockStyle}</p>
      
      <button onClick={() => updateDarkMode(!state.darkMode)}>
        Toggle Theme
      </button>
      
      <button onClick={() => updateDockStyle(state.dockStyle === 'minimal' ? 'large' : 'minimal')}>
        Toggle Dock
      </button>
    </div>
  );
}
```

## Migration for Existing Apps

### Bitcoin-Spreadsheets (Current Implementation)

The current implementation already works! To migrate to shared packages:

```tsx
// Replace current imports:
// import DockManager from './components/DockManager';

// With package import:
import { DockManager } from '@bitcoin-os/dock';
import { BitcoinOSProvider, useBitcoinOS } from '@bitcoin-os/state';

// Wrap your app:
function App() {
  return (
    <BitcoinOSProvider currentApp="bitcoin-spreadsheet">
      {/* Existing app content */}
      <DockManager currentApp="bitcoin-spreadsheet" />
    </BitcoinOSProvider>
  );
}
```

### For Next.js Apps (Bitcoin-Writer, etc.)

```tsx
// pages/_app.tsx or app/layout.tsx
import { BitcoinOSProvider } from '@bitcoin-os/state';
import { DockManager } from '@bitcoin-os/dock';

export default function App({ Component, pageProps }) {
  return (
    <BitcoinOSProvider currentApp="bitcoin-writer">
      <Component {...pageProps} />
      <DockManager currentApp="bitcoin-writer" />
    </BitcoinOSProvider>
  );
}
```

## Advanced Usage

### Custom State Management

```tsx
import { useDockState, StateManager } from '@bitcoin-os/state';

function CustomComponent() {
  // Use individual hooks
  const { dockStyle, updateDockStyle } = useDockState();
  
  // Or use the state manager directly
  useEffect(() => {
    const unsubscribe = StateManager.subscribe('customSetting', (value) => {
      console.log('Custom setting changed:', value);
    });
    
    return unsubscribe;
  }, []);

  const handleCustomSetting = () => {
    StateManager.setState('customSetting', 'new value');
  };

  return (
    <div>
      <p>Dock: {dockStyle}</p>
      <button onClick={handleCustomSetting}>Update Custom Setting</button>
    </div>
  );
}
```

### Icon Theme Switching

```tsx
import { getThemedIcon, getCurrentTheme } from '@bitcoin-os/dock';
import { useBitcoinOS } from '@bitcoin-os/state';

function IconThemeSelector() {
  const { state, updateIconTheme } = useBitcoinOS();
  
  const themes = [
    'lucide',
    'react-icons', 
    'tabler',
    'heroicons',
    'feather',
    'phosphor',
    'remix',
    'bootstrap'
  ];

  return (
    <select 
      value={state.iconTheme} 
      onChange={(e) => updateIconTheme(e.target.value)}
    >
      {themes.map(theme => (
        <option key={theme} value={theme}>
          {theme}
        </option>
      ))}
    </select>
  );
}
```

## State Keys Reference

### Standard Keys
- `bitcoinOS-dock-style`: `'minimal' | 'large'`
- `bitcoinOS-icon-theme`: Theme name string
- `bitcoinOS-dark-mode`: `'true' | 'false'`
- `bitcoinOS-auth`: Authentication state (sessionStorage)

### App-Specific Keys Format
- `bitcoinOS-{app-id}-{setting-name}`
- Example: `bitcoinOS-spreadsheet-auto-save`

## Events Reference

### Global Events
```typescript
// Dock style changes
window.addEventListener('dockStyleChanged', (e: CustomEvent) => {
  console.log('New dock style:', e.detail); // 'minimal' | 'large'
});

// Icon theme changes
window.addEventListener('iconThemeChanged', (e: CustomEvent) => {
  console.log('New icon theme:', e.detail); // theme name
});

// Dark mode changes
window.addEventListener('darkModeChanged', (e: CustomEvent) => {
  console.log('Dark mode:', e.detail); // boolean
});

// Generic state changes
window.addEventListener('stateChanged', (e: CustomEvent) => {
  console.log('State change:', e.detail); // { type, value, timestamp }
});
```

## App ID Registry

Use these standardized app IDs:

```typescript
const BITCOIN_OS_APPS = {
  // Core OS
  'bitcoin-os': 'Bitcoin OS',
  
  // Productivity
  'bitcoin-wallet': 'Bitcoin Wallet',
  'bitcoin-email': 'Bitcoin Email', 
  'bitcoin-writer': 'Bitcoin Writer',
  'bitcoin-spreadsheet': 'Bitcoin Spreadsheet',
  'bitcoin-code': 'Bitcoin Code',
  'bitcoin-drive': 'Bitcoin Drive',
  'bitcoin-calendar': 'Bitcoin Calendar',
  
  // Media & Content
  'bitcoin-music': 'Bitcoin Music',
  'bitcoin-video': 'Bitcoin Video',
  'bitcoin-photos': 'Bitcoin Photos',
  'bitcoin-paint': 'Bitcoin Paint',
  
  // Communication & Social
  'bitcoin-chat': 'Bitcoin Chat',
  'bitcoin-social': 'Bitcoin Social',
  'bitcoin-maps': 'Bitcoin Maps',
  
  // Utilities & Tools
  'bitcoin-search': 'Bitcoin Search',
  'bitcoin-exchange': 'Bitcoin Exchange',
  'bitcoin-3d': 'Bitcoin 3D',
  'bitcoin-games': 'Bitcoin Games',
  'bitcoin-books': 'Bitcoin Books',
  'bitcoin-domains': 'Bitcoin Domains',
  
  // Professional
  'bitcoin-jobs': 'Bitcoin Jobs',
  'bitcoin-education': 'Bitcoin Education',
  'bitcoin-identity': 'Bitcoin Identity',
  
  // Stores & Markets
  'bapps-store': 'Bitcoin Apps Store',
} as const;
```

## Development Setup

### Building Packages

```bash
# Build dock package
cd /Users/b0ase/Projects/bitcoin-OS/packages/bitcoin-os-dock
npm run build

# Build state package  
cd /Users/b0ase/Projects/bitcoin-OS/packages/bitcoin-os-state
npm run build
```

### Testing Integration

1. **Build packages** (see above)
2. **Link locally** in your app:
   ```bash
   npm install file:../bitcoin-OS/packages/bitcoin-os-dock
   npm install file:../bitcoin-OS/packages/bitcoin-os-state
   ```
3. **Test functionality**:
   - Dock starts in minimal mode
   - Dock expands/collapses properly
   - State persists across refreshes
   - Cross-component communication works

### Publishing (Future)

```bash
# When ready to publish to npm:
cd packages/bitcoin-os-dock
npm publish

cd ../bitcoin-os-state  
npm publish
```

## Benefits

### For Developers
- **Consistency**: Same dock behavior across all apps
- **Less Code**: No need to reimplement dock logic
- **Type Safety**: TypeScript definitions included
- **Easy Updates**: Update all apps by updating packages

### For Users
- **Familiar Experience**: Same dock behavior everywhere
- **Persistent Settings**: Preferences carry across apps
- **Smooth Transitions**: Seamless navigation between Bitcoin-OS apps

## Troubleshooting

### Common Issues

1. **"Cannot resolve @bitcoin-os/dock"**
   - Ensure packages are built: `npm run build`
   - Check local installation: `npm ls @bitcoin-os/dock`

2. **Dock doesn't start in minimal mode**
   - Verify `DockManager` is used, not `Dock` directly
   - Check localStorage for existing `bitcoinOS-dock-style`

3. **State not persisting**
   - Ensure `BitcoinOSProvider` wraps your app
   - Check localStorage permissions
   - Verify localStorage keys use `bitcoinOS-` prefix

4. **Icons not displaying**
   - Install required icon libraries: `npm install lucide-react react-icons`
   - Check console for import errors

### Debug Mode

```typescript
// Enable debug mode
StateManager.setState('debug', true);

// View all state
console.log(StateManager.getAllState());

// Listen for all state changes
window.addEventListener('stateChanged', (e) => {
  console.log('State change:', e.detail);
});
```

This implementation provides a solid foundation for consistent, maintainable Bitcoin-OS applications while preserving the flexibility for app-specific customizations.