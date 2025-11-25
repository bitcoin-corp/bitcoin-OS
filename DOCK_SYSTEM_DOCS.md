# Bitcoin OS Dock System Documentation

## Overview
The Bitcoin OS dock system is a unified navigation component that provides a macOS-style dock experience across all Bitcoin-OS applications. It supports both minimal and full dock modes with smooth transitions and state persistence.

## Core Architecture

### Component Hierarchy
```
DockManager (State Controller)
├── MinimalDock (Compact Mode)
└── Dock (Full Mode)
```

## Required Dependencies

### 1. Core Components
- **`DockManager.tsx`** - Main state controller, handles switching between dock modes
- **`Dock.tsx`** - Full dock view with all applications
- **`MinimalDock.tsx`** - Compact dock view with hover-to-expand functionality

### 2. Styling
- **`Dock.css`** - Styles for full dock mode
- **`MinimalDock.css`** - Styles for minimal dock mode

### 3. Icon System
- **`icon-themes.ts`** - Icon theme configuration and mappings
- **`icon-mappings-complete.ts`** - Complete icon mappings for all themes

### 4. Required Icon Libraries
```bash
# Lucide React (default theme)
npm install lucide-react

# Material Design Icons
npm install react-icons

# Extended icon libraries (optional themes)
npm install @tabler/icons-react
npm install @heroicons/react
npm install react-icons/fi  # Feather
npm install react-icons/ph  # Phosphor
npm install react-icons/ri  # Remix
npm install react-icons/bs  # Bootstrap
```

## Component Details

### DockManager
**Purpose**: Controls dock state and switches between minimal/full modes  
**State**: Uses localStorage to persist dock preference ('minimal' | 'large')  
**Events**: Listens for 'dockStyleChanged' custom events

**Key Features**:
- Defaults to minimal mode
- Persists user preference in localStorage
- Handles cross-component communication via custom events

### Dock (Full Mode)
**Purpose**: Full-featured dock with all 23+ Bitcoin-OS applications  
**Features**:
- Rainbow-colored icons for Bitcoin apps
- Minimize button to switch to minimal mode
- Direct navigation to all Bitcoin-OS applications
- Current app highlighting

### MinimalDock (Compact Mode)
**Purpose**: Space-efficient dock with hover-to-expand functionality  
**Features**:
- Compact app icons on the left
- Expand toggle button
- Right-side mini icons for special apps
- System status indicators (WiFi, Battery, Clock)
- Hover delay before expansion (150ms)

## State Management Pattern

### Local State
```typescript
const [dockStyle, setDockStyle] = useState<string>('minimal');
```

### Persistence
```typescript
// Save preference
localStorage.setItem('dockStyle', newDockStyle);

// Load preference
const savedStyle = localStorage.getItem('dockStyle') || 'minimal';
```

### Cross-Component Communication
```typescript
// Dispatch state change
window.dispatchEvent(new CustomEvent('dockStyleChanged', { detail: newDockStyle }));

// Listen for state changes
window.addEventListener('dockStyleChanged', handleDockStyleChange);
```

## Application Integration

### Basic Integration
```tsx
import DockManager from './components/DockManager';

function App() {
  return (
    <div>
      {/* Your app content */}
      <DockManager currentApp="your-app-id" />
    </div>
  );
}
```

### App IDs
Each Bitcoin-OS app has a unique identifier:
- `bitcoin-wallet`
- `bitcoin-email` 
- `bitcoin-music`
- `bitcoin-writer`
- `bitcoin-spreadsheet`
- `bitcoin-code`
- `bitcoin-drive`
- ... (see full list in Dock.tsx and MinimalDock.tsx)

## File Structure for Integration

### React Apps (CRA)
```
src/
├── components/
│   ├── DockManager.tsx
│   ├── Dock.tsx
│   ├── MinimalDock.tsx
│   ├── Dock.css
│   └── MinimalDock.css
└── lib/
    ├── icon-themes.ts
    └── icon-mappings-complete.ts
```

### Next.js Apps
```
components/
├── DockManager.tsx
├── Dock.tsx
├── MinimalDock.tsx
├── Dock.css
└── MinimalDock.css
lib/
├── icon-themes.ts
└── icon-mappings-complete.ts
```

## Common Integration Issues

### Import Errors
- Ensure all icon libraries are installed
- Check import paths match your project structure
- Verify CSS files are imported correctly

### State Not Persisting
- Confirm localStorage is available (SSR considerations)
- Check custom event listeners are properly attached/detached
- Verify component mounting order

### Styling Issues
- Import CSS files in correct order
- Check for CSS conflicts with existing styles
- Ensure z-index values don't conflict

## Testing Checklist

- [ ] Dock starts in minimal mode by default
- [ ] Hover over minimal dock expands after 150ms delay
- [ ] Clicking expand button switches to full dock
- [ ] Clicking minimize button returns to minimal dock
- [ ] State persists across page refreshes
- [ ] All app icons display correctly
- [ ] Current app is highlighted
- [ ] Navigation to other apps works
- [ ] System status indicators show correctly

## Troubleshooting

### "Cannot find module" errors
Install missing icon library dependencies

### Dock doesn't expand/collapse
Check DockManager is used instead of direct Dock component

### Icons not displaying
Verify icon-themes.ts imports and icon library installations

### State not persisting
Ensure localStorage is available and event listeners are properly set up