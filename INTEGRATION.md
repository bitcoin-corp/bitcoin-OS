# Bitcoin OS Integration Guide

## Overview

Bitcoin OS provides a unified desktop environment for all Bitcoin apps. Each app can run independently or within the Bitcoin OS shell, providing a seamless experience.

## Architecture

```
Bitcoin OS (Main Shell)
├── TopMenuBar (Rainbow Bitcoin menu + app launcher)
├── Desktop (App icons)
├── AppLoader (iframe container for apps)
│   ├── Bitcoin Wallet
│   ├── Bitcoin Email
│   ├── Bitcoin Music
│   └── ... other apps
└── OSTaskbar (Bottom taskbar with open apps)
```

## For App Developers

### Quick Start

Each app needs to:
1. Continue working standalone (users can still visit your app directly)
2. Add Bitcoin OS bridge for enhanced integration when running inside OS
3. Handle theme/config messages from OS

### Integration Steps

#### 1. Install the Bridge (Option A - NPM Package)

```bash
npm install @bitcoin-os/bridge
```

#### 2. Install the Bridge (Option B - Copy Files)

Copy these files from bitcoin-OS repo:
- `/lib/bitcoin-os-bridge.js` - Vanilla JS
- `/lib/useBitcoinOS.ts` - React Hook

#### 3. React Integration

```tsx
import { useBitcoinOS } from '@bitcoin-os/bridge/react'

function App() {
  const { isInOS, theme, navigateHome, openApp } = useBitcoinOS()
  
  return (
    <div data-theme={theme}>
      {isInOS && (
        <button onClick={navigateHome}>Back to Desktop</button>
      )}
      {/* Your app content */}
    </div>
  )
}
```

#### 4. Vanilla JS Integration

```html
<script src="bitcoin-os-bridge.js"></script>
<script>
  // Check if running in OS
  if (bitcoinOS.isInOS) {
    // Add OS-specific features
    document.getElementById('home-btn').onclick = () => {
      bitcoinOS.navigateHome()
    }
  }
  
  // Listen for theme changes
  bitcoinOS.on('theme-change', (theme) => {
    document.body.className = theme
  })
</script>
```

### Styling Guidelines

1. **Remove duplicate taskbars** - When `isInOS` is true, hide your app's taskbar
2. **Respect OS theme** - Use the theme provided by OS
3. **Window controls** - OS handles window management, remove your controls when in OS

Example:

```css
/* Hide app taskbar when in OS */
[data-in-os="true"] .app-taskbar {
  display: none;
}

/* Theme support */
[data-theme="dark"] {
  --bg-color: #000;
  --text-color: #fff;
}

[data-theme="light"] {
  --bg-color: #fff;
  --text-color: #000;
}
```

### API Reference

#### bitcoinOS / useBitcoinOS

- `isInOS: boolean` - True when running inside Bitcoin OS
- `theme: 'light' | 'dark'` - Current OS theme
- `navigateHome()` - Close app and return to desktop
- `openApp(appName: string)` - Open another app
- `showNotification(title, message)` - Show OS notification
- `setTitle(title)` - Update window title in OS

### Testing Your Integration

1. **Local Development**
   ```bash
   # Run Bitcoin OS
   cd bitcoin-OS
   npm run dev  # Runs on port 3000
   
   # Run your app
   cd bitcoin-wallet
   npm run dev  # Run on port 3001
   ```

2. **Update bitcoin-OS config** for local testing:
   ```ts
   // bitcoin-OS/lib/apps.config.ts
   {
     id: 'bitcoin-wallet',
     url: process.env.NODE_ENV === 'development' 
       ? 'http://localhost:3001'  // Your local app
       : 'https://bitcoin-wallet.vercel.app'
   }
   ```

3. **Test integration**:
   - Open Bitcoin OS
   - Click rainbow Bitcoin menu
   - Select your app
   - Verify it opens in AppLoader
   - Test navigation back to desktop

## For Bitcoin OS Maintainers

### Adding New Apps

1. Update `/lib/apps.config.ts`:
```ts
export const bitcoinApps = [
  // ... existing apps
  {
    id: 'bitcoin-newapp',
    name: 'Bitcoin NewApp',
    url: 'https://bitcoin-newapp.vercel.app',
    color: '#color',
    description: 'Description'
  }
]
```

2. Apps will automatically appear in:
- Rainbow Bitcoin menu
- Apps menu in top bar
- Desktop (if icon configured)

### CORS and Security

Apps must allow iframe embedding. Add to your app:

```js
// Next.js - next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'  // Or remove entirely
          }
        ]
      }
    ]
  }
}
```

## Migration Path for Existing Apps

### Phase 1: Basic Integration (Current)
- Apps run in iframes
- Basic PostMessage communication
- Shared theme

### Phase 2: Enhanced Integration
- Shared authentication
- Inter-app communication
- Unified notifications

### Phase 3: Native Features
- File system access
- Bitcoin wallet integration
- Shared data storage

## Example Implementations

See these apps for reference:
- `/components/AppLoader.tsx` - OS side implementation
- (To be added to each app repo)

## Troubleshooting

**App not loading in OS?**
- Check CORS headers
- Verify URL in apps.config.ts
- Check browser console for errors

**Theme not applying?**
- Ensure bitcoinOS bridge is initialized
- Check data-theme attribute is set
- Verify CSS variables are defined

**Can't navigate back to desktop?**
- Confirm isInOS is true
- Check PostMessage is working
- Verify OS is listening for messages

## Support

- GitHub Issues: [bitcoin-OS/issues](https://github.com/bitcoin-apps-suite/bitcoin-OS/issues)
- Documentation: This file
- Examples: Check individual app repos