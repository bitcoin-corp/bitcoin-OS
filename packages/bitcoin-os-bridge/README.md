# Bitcoin OS Bridge Components

Reusable React components for seamlessly integrating Bitcoin OS UI elements into any Bitcoin application.

## Features

- 🎨 **Unified UI Components**: ProofOfConceptBar, TopMenuBar, DevSidebar, and Dock
- 🔧 **Local Customization**: App-specific links and branding while maintaining global consistency
- 🎯 **TypeScript Support**: Full type safety and IntelliSense
- 📱 **Responsive Design**: Works on desktop and mobile
- 🎭 **Theme Support**: Color cycling animations and user preferences
- ⚡ **Easy Integration**: Single provider component for complete setup

## Installation

```bash
npm install @bitcoin-os/bridge
```

## Quick Start

### 1. Basic Integration

```tsx
import { BitcoinOSProvider } from '@bitcoin-os/bridge'

function App() {
  const config = {
    context: {
      appName: 'Bitcoin Writer',
      exchangeUrl: 'https://writer-exchange.vercel.app', // Custom exchange URL
    }
  }

  return (
    <BitcoinOSProvider config={config}>
      <div className="p-8">
        <h1>Your Bitcoin App Content</h1>
      </div>
    </BitcoinOSProvider>
  )
}
```

### 2. Advanced Configuration

```tsx
import { BitcoinOSProvider } from '@bitcoin-os/bridge'

function App() {
  const config = {
    context: {
      appName: 'Bitcoin Music',
      exchangeUrl: 'https://music-exchange.vercel.app',
      customMenuItems: [
        {
          label: 'Music',
          items: [
            { label: 'Upload Track', action: () => console.log('Upload') },
            { label: 'Playlists', href: '/playlists' }
          ]
        }
      ],
      branding: {
        name: 'Bitcoin Music',
        color: '#8b5cf6'
      }
    },
    showDevSidebar: true,
    showDock: true,
    showPocBar: true,
    customStyles: `
      .bitcoin-symbol { color: #8b5cf6 !important; }
    `,
    onAppOpen: (appName) => {
      console.log('Opening app:', appName)
      // Custom app opening logic
    }
  }

  return (
    <BitcoinOSProvider config={config}>
      <YourAppContent />
    </BitcoinOSProvider>
  )
}
```

### 3. Individual Components

You can also use components individually:

```tsx
import { 
  ProofOfConceptBar, 
  TopMenuBar, 
  DevSidebar, 
  Dock 
} from '@bitcoin-os/bridge'

function CustomLayout() {
  const context = {
    appName: 'Bitcoin Email',
    exchangeUrl: 'https://email-exchange.vercel.app'
  }

  return (
    <div className="h-screen flex flex-col">
      <ProofOfConceptBar appName="Bitcoin Email" />
      <TopMenuBar context={context} />
      
      <div className="flex flex-1">
        <DevSidebar context={context} />
        <main className="flex-1 pl-64">
          <YourContent />
        </main>
      </div>
      
      <Dock context={context} />
    </div>
  )
}
```

## Configuration Options

### AppContext

```tsx
interface AppContext {
  appName: string                 // Name of your app
  exchangeUrl?: string           // Custom exchange URL
  customMenuItems?: Menu[]       // Additional menu items
  theme?: 'default' | 'custom'   // Theme preference
  branding?: {                   // Custom branding
    name: string
    color: string
    logo?: string
  }
}
```

### BitcoinOSConfig

```tsx
interface BitcoinOSConfig {
  context: AppContext
  showDevSidebar?: boolean      // Show/hide dev sidebar (default: true)
  showDock?: boolean           // Show/hide dock (default: true)  
  showPocBar?: boolean         // Show/hide POC bar (default: true)
  customStyles?: string        // Custom CSS styles
  onAppOpen?: (appName: string) => void  // App opening handler
}
```

## Local Customization Examples

### Custom Exchange Links

Each app can have its own exchange:

```tsx
// Bitcoin Music
const musicConfig = {
  context: {
    appName: 'Bitcoin Music',
    exchangeUrl: 'https://music-exchange.vercel.app'  // Music marketplace
  }
}

// Bitcoin Writer  
const writerConfig = {
  context: {
    appName: 'Bitcoin Writer', 
    exchangeUrl: 'https://writer-exchange.vercel.app' // Writing marketplace
  }
}
```

### Custom Menu Items

Add app-specific menu items while keeping global structure:

```tsx
const config = {
  context: {
    appName: 'Bitcoin Drive',
    customMenuItems: [
      {
        label: 'Drive',
        items: [
          { label: 'Upload File', shortcut: '⌘U', action: () => uploadFile() },
          { label: 'Create Folder', shortcut: '⇧⌘N', action: () => createFolder() },
          { divider: true },
          { label: 'Share Settings', href: '/settings/sharing' }
        ]
      }
    ]
  }
}
```

### Custom Dock Apps

Add app-specific items to the dock:

```tsx
const customApps = [
  {
    name: 'Music Player',
    icon: Music,
    color: 'text-purple-500',
    url: '/player'
  }
]

<Dock context={context} customApps={customApps} />
```

## Styling and Theming

### Color Cycling Control

The color cycling animation can be controlled via CSS classes:

```css
/* Disable color cycling */
.no-color-cycling .bitcoin-symbol,
.no-color-cycling .dev-sidebar-title span {
  animation: none !important;
  color: #d946ef !important;
}

/* Disable all animations */
body.no-animations * {
  animation-duration: 0s !important;
  transition-duration: 0s !important;
}
```

### Custom Styling

Pass custom styles through the config:

```tsx
const config = {
  customStyles: `
    .bitcoin-symbol { 
      color: #your-brand-color !important; 
    }
    .dev-sidebar-title span {
      color: #your-brand-color !important;
    }
  `
}
```

## Components Reference

### ProofOfConceptBar

Displays a proof of concept banner with optional app name.

Props:
- `appName?: string` - App name to display
- `message?: string` - Custom message

### TopMenuBar

macOS-style menu bar with Bitcoin apps dropdown and customizable menus.

Props:
- `context: AppContext` - App configuration
- `onOpenApp?: (appName: string) => void` - App opening handler
- `showBAppsMenu?: boolean` - Show Bitcoin apps menu
- `githubUrl?: string` - Custom GitHub URL
- `docsUrl?: string` - Custom docs URL

### DevSidebar

Developer sidebar with navigation, stats, and customizable content.

Props:
- `context: AppContext` - App configuration
- `githubRepo?: string` - GitHub repository URL
- `statsOverride?: Record<string, string | number>` - Custom stats
- `customMenuItems?: MenuItem[]` - Additional menu items

### Dock

macOS-style dock with Bitcoin apps and system status.

Props:
- `context: AppContext` - App configuration
- `customApps?: DockApp[]` - Additional dock apps
- `showSystemStatus?: boolean` - Show system status indicators
- `onAppClick?: (app: DockApp) => void` - App click handler

## Best Practices

1. **Global Updates**: Keep core Bitcoin OS components updated by updating the bridge package
2. **Local Customization**: Use the context and custom props for app-specific features
3. **Consistent Branding**: Maintain Bitcoin OS visual identity while adding your app's personality
4. **Responsive Design**: Test on mobile devices as components adapt automatically
5. **Performance**: The bridge components are optimized and won't impact your app's performance

## Migration Guide

### From Bitcoin OS v1.0

If you're migrating from individual component copies:

1. Install the bridge package
2. Replace individual imports with bridge imports
3. Wrap your app in `BitcoinOSProvider`
4. Update component props to use the new context system

```tsx
// Before
import TopMenuBar from './components/TopMenuBar'

// After  
import { BitcoinOSProvider } from '@bitcoin-os/bridge'
```

## Contributing

This package is part of the Bitcoin OS project. See the main repository for contribution guidelines.

## License

MIT © Bitcoin OS