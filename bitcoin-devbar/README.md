# Bitcoin DevBar

Universal developer sidebar components for Bitcoin OS ecosystem applications.

## Features

- **Collapsible developer sidebar** with navigation and GitHub integration
- **Token statistics display** with customizable stats
- **GitHub integration** for issues, PRs, and repository links
- **Responsive design** that hides on mobile
- **Bitcoin OS integration** with conditional rendering
- **Customizable menu items** and branding
- **Layout component** for easy integration

## Installation

```bash
npm install @bitcoin-os/devbar
```

## Usage

### Basic Layout

```tsx
import { DevLayout } from '@bitcoin-os/devbar';
import Taskbar from './components/Taskbar';

function App() {
  return (
    <DevLayout
      appName="Bitcoin Identity"
      githubRepo="bitcoin-apps-suite/bitcoin-identity"
      tokenSymbol="$BID"
      TaskbarComponent={Taskbar}
    >
      <YourAppContent />
    </DevLayout>
  );
}
```

### Standalone Sidebar

```tsx
import { DevSidebar } from '@bitcoin-os/devbar';

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <DevSidebar
        onCollapsedChange={setCollapsed}
        appName="Bitcoin Writer"
        githubRepo="bitcoin-apps-suite/bitcoin-writer"
        tokenSymbol="$BWR"
        tokenStats={{
          totalTokens: '500,000,000',
          distributed: '100,000',
          contributors: '5',
          openTasks: '12'
        }}
      />
      <div className={collapsed ? 'with-dev-sidebar-collapsed' : 'with-dev-sidebar'}>
        <YourContent />
      </div>
    </>
  );
}
```

### Custom Menu Items

```tsx
import { DevLayout } from '@bitcoin-os/devbar';
import { Settings, Users, FileText } from 'lucide-react';

const customMenuItems = [
  { path: '/dashboard', icon: Settings, label: 'Dashboard' },
  { path: '/team', icon: Users, label: 'Team', badge: '5' },
  { divider: true },
  { path: '/docs', icon: FileText, label: 'Documentation' }
];

function App() {
  return (
    <DevLayout
      appName="Custom App"
      menuItems={customMenuItems}
    >
      <YourContent />
    </DevLayout>
  );
}
```

## Props

### DevLayout

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | App content |
| `showTaskbar` | `boolean` | `true` | Show taskbar component |
| `TaskbarComponent` | `ComponentType` | - | Taskbar component to render |
| `appName` | `string` | `'Bitcoin App'` | Application name |
| `githubRepo` | `string` | - | GitHub repository (owner/repo) |
| `tokenSymbol` | `string` | - | Token symbol (e.g., '$BID') |
| `tokenStats` | `object` | - | Token statistics object |
| `menuItems` | `array` | - | Custom menu items |
| `isInOS` | `boolean` | `false` | Running in Bitcoin OS |
| `setTitle` | `function` | - | Set OS title function |

### DevSidebar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onCollapsedChange` | `function` | - | Callback when sidebar collapses |
| `appName` | `string` | `'Bitcoin Identity'` | Application name |
| `githubRepo` | `string` | - | GitHub repository |
| `tokenSymbol` | `string` | `'$BID'` | Token symbol |
| `tokenStats` | `object` | - | Token statistics |
| `menuItems` | `array` | - | Custom menu items |

## Default Menu Items

The sidebar includes these default menu items:
- Exchange (with 'NEW' badge)
- Contracts 
- Tasks (shows issue count)
- Contributors
- Documentation
- Token page
- GitHub repository link
- Issues (shows count)
- Pull Requests
- API Reference
- Changelog
- Status

## Styling

The component includes complete CSS styling. Import the CSS file if needed:

```tsx
import '@bitcoin-os/devbar/components/DevSidebar.css';
```

## CSS Classes

The component applies these classes for layout adjustment:
- `.with-dev-sidebar` - When sidebar is expanded
- `.with-dev-sidebar-collapsed` - When sidebar is collapsed

## License

Open BSV License