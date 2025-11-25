# @bitcoin-os/dock

Shared dock components for Bitcoin-OS applications. Provides a unified macOS-style dock experience across all Bitcoin-OS apps with support for both minimal and full dock modes.

## Installation

```bash
npm install @bitcoin-os/dock
# or
yarn add @bitcoin-os/dock
```

## Basic Usage

```tsx
import { DockManager } from '@bitcoin-os/dock';

function App() {
  return (
    <div>
      {/* Your app content */}
      <DockManager currentApp="bitcoin-spreadsheet" />
    </div>
  );
}
```

## Components

### DockManager (Recommended)
The main component that handles state management and switching between dock modes.

```tsx
import { DockManager } from '@bitcoin-os/dock';

<DockManager currentApp="your-app-id" />
```

### Individual Components
For custom implementations:

```tsx
import { Dock, MinimalDock } from '@bitcoin-os/dock';

// Full dock
<Dock currentApp="your-app-id" />

// Minimal dock
<MinimalDock currentApp="your-app-id" />
```

## App IDs
Use these standardized app IDs for the `currentApp` prop:

- `bitcoin-wallet`
- `bitcoin-email`
- `bitcoin-music`
- `bitcoin-writer`
- `bitcoin-spreadsheet`
- `bitcoin-code`
- `bitcoin-drive`
- `bitcoin-calendar`
- `bitcoin-exchange`
- `bitcoin-search`
- `bitcoin-video`
- `bitcoin-photos`
- `bitcoin-maps`
- `bitcoin-chat`
- `bitcoin-social`
- `bitcoin-games`
- `bitcoin-books`
- `bitcoin-domains`
- `bitcoin-3d`
- `bitcoin-jobs`
- `bitcoin-education`
- `bitcoin-paint`
- `bitcoin-identity`
- `bitcoin-os`
- `bapps-store`

## Features

- **Responsive Design**: Adapts to minimal and full dock modes
- **State Persistence**: Remembers user's dock preference via localStorage
- **Rainbow Theming**: Beautiful rainbow-colored icons for Bitcoin-OS apps
- **Icon Theming**: Supports multiple icon themes (Lucide, Material Design, etc.)
- **Smooth Transitions**: Animated hover and expand/collapse effects
- **Cross-App Navigation**: Direct navigation to all Bitcoin-OS applications

## Requirements

- React 16.8+
- Modern browser with localStorage support

## License

MIT