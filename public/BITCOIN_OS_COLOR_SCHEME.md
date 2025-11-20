# Bitcoin OS Color Scheme & Design System

## Overview
This document defines the comprehensive color scheme and design system for all Bitcoin OS applications. Each app has a unique duo-tone color palette that maintains visual consistency while providing distinct app identity.

## Design Principles
- **Duo-tone approach**: Each app uses exactly 2 primary colors
- **Unique combinations**: No two apps share the same color pair
- **Accessible contrasts**: All color combinations meet WCAG accessibility standards
- **Consistent gradients**: Subtle gradients between the two colors for depth
- **Scalable system**: Designed to accommodate 50+ apps

## Color Palette System

### Primary Color Assignments

| App | Primary Color | Secondary Color | Hex Codes | Usage | Notes |
|-----|---------------|-----------------|-----------|-------|-------|
| bitcoin-writer | Black | White | `#0a0a0a` / `#ffffff` | Text editing, professional | High contrast for text |
| bitcoin-email | Red | Dark Red | `#ff4444` / `#cc0000` | Communication, urgent | Alert/notification colors |
| bitcoin-music | Bitcoin Orange | Yellow | `#f7931a` / `#fbbf24` | Creative, audio | Bitcoin brand alignment |
| bitcoin-video | Dark Red | Orange | `#b91c1c` / `#ff6600` | Media, entertainment | Media/entertainment |
| bitcoin-photos | Indigo | Light Blue | `#4338ca` / `#87ceeb` | Visual, sky-like | Visual/photography |
| bitcoin-art | Magenta | Gold | `#be185d` / `#ffd700` | Creative, luxury | Creative/artistic |
| bitcoin-3d | Teal | Mint | `#0f766e` / `#00ff9f` | 3D modeling, spatial | 3D/spatial |
| bitcoin-gaming | Dark Orange | Yellow | `#ea580c` / `#ffff00` | Gaming, energy | Gaming/energy |
| bitcoin-calendar | Navy | Sky Blue | `#1e3a8a` / `#87ceeb` | Scheduling, time | Time/scheduling |
| bitcoin-chat | Purple | Lavender | `#7c3aed` / `#dda0dd` | Communication, social | Communication |
| bitcoin-social | Pink | Rose | `#ec4899` / `#ff69b4` | Social media, connection | Social/connection |
| bitcoin-twitter | Twitter Blue | Light Blue | `#1da1f2` / `#add8e6` | Microblogging | Twitter brand |
| bitcoin-exchange | Bitcoin Orange | Yellow | `#f7931a` / `#fbbf24` | Trading, finance | Bitcoin trading |
| bitcoin-drive | Blue | Steel Blue | `#2563eb` / `#4682b4` | Storage, cloud | Storage/reliability |
| bitcoin-spreadsheets | Green | Emerald | `#16a34a` / `#50c878` | Data, calculations | Data/calculations |
| bitcoin-code | Dark Gray | Neon Green | `#1e293b` / `#39ff14` | Development, terminal | Development/terminal |
| bitcoin-browser | Chrome Blue | Silver | `#4285f4` / `#c0c0c0` | Web browsing | Web browsing |
| bitcoin-search | Deep Teal | Aqua | `#0d9488` / `#00ffff` | Search, discovery | Search/discovery |
| bitcoin-maps | Earth Green | Ocean Blue | `#059669` / `#0077be` | Geography, navigation | Geography/maps |
| bitcoin-books | Maroon | Beige | `#991b1b` / `#f5f5dc` | Reading, knowledge | Reading/books |
| bitcoin-education | Academic Blue | Light Yellow | `#1d4ed8` / `#ffffe0` | Learning, growth | Education/learning |
| bitcoin-jobs | Corporate Blue | Green | `#1e40af` / `#22c55e` | Employment, success | Jobs/employment |
| bitcoin-crm | Business Gray | Orange | `#6b7280` / `#fb923c` | Customer relations | Business/CRM |
| bitcoin-cms | Content Blue | White | `#3b82f6` / `#ffffff` | Content management | Content/CMS |
| bitcoin-contracts | Legal Navy | Gold | `#1e293b` / `#fbbf24` | Legal, contracts | Legal/contracts |
| bitcoin-shares | Market Green | Red | `#15803d` / `#dc2626` | Equity, trading | Trading/shares |
| bitcoin-paint | Artist Purple | Rainbow | `#8b5cf6` / `#ff6b35` | Creative tools | Art/creativity |
| bitcoin-dns | Network Blue | Green | `#0ea5e9` / `#10b981` | Infrastructure | Network/DNS |
| bitcoin-ai | Neural Purple | Electric Blue | `#7c2d92` / `#0080ff` | AI, intelligence | AI/intelligence |
| bitcoin-wallet | Bitcoin Orange | Yellow | `#f7931a` / `#fbbf24` | Wallet, finance | Bitcoin brand |

## Component Standards

### PoC Bar Specification
```typescript
interface PocBarProps {
  appName: string;
  primaryColor: string;
  secondaryColor: string;
  isDismissible?: boolean;
  showBitcoinLogo?: boolean;
}

// Standard height: 40px
// Background: Linear gradient from primary to secondary
// Text: Black or white based on contrast
// Position: Fixed top, full width, z-index: 9999
```

### Taskbar Specification
```typescript
interface TaskbarProps {
  appName: string;
  primaryColor: string;
  secondaryColor: string;
  menuItems: MenuItem[];
  isAuthenticated: boolean;
  currentUser?: User;
}

// Standard height: 32px (below PoC bar)
// Background: Translucent with app colors
// Consistent menu structure across all apps
```

### Dock Integration
```typescript
// Update dock colors to use app-specific duo-tones
const dockApps: DockApp[] = [
  {
    name: 'bitcoin-writer',
    colors: ['#1e40af', '#06d6ff'],
    gradient: 'linear-gradient(45deg, #1e40af 0%, #06d6ff 100%)'
  },
  // ... other apps
];
```

## Design Tokens

### Color Gradients
Each app uses its duo-tone colors in these gradient patterns:
- **Primary Gradient**: `linear-gradient(135deg, {primary} 0%, {secondary} 100%)`
- **Subtle Gradient**: `linear-gradient(135deg, {primary} 0%, {primary}cc 50%, {secondary}99 100%)`
- **Accent Gradient**: `radial-gradient(circle, {secondary} 0%, {primary} 100%)`

### Transparency Levels
- **Background overlays**: 0.1 - 0.3 alpha
- **Glass effects**: 0.7 - 0.9 alpha with backdrop-blur
- **Hover states**: 0.8 alpha
- **Active states**: 1.0 alpha

### Typography Colors
- **Primary text**: App primary color at full opacity
- **Secondary text**: App secondary color at 0.8 opacity
- **Accent text**: Gradient between both colors
- **Muted text**: Primary color at 0.6 opacity

## Implementation Guidelines

### CSS Custom Properties
Each app should define these CSS variables:
```css
:root {
  --app-primary: #1e40af;    /* App's primary color */
  --app-secondary: #06d6ff;  /* App's secondary color */
  --app-gradient: linear-gradient(135deg, var(--app-primary) 0%, var(--app-secondary) 100%);
  --app-shadow: 0 4px 12px rgba(var(--app-primary-rgb), 0.3);
}
```

### Component Classes
Standard classes for consistent styling:
```css
.app-primary { color: var(--app-primary); }
.app-secondary { color: var(--app-secondary); }
.app-bg-gradient { background: var(--app-gradient); }
.app-border { border-color: var(--app-primary); }
.app-shadow { box-shadow: var(--app-shadow); }
```

## Accessibility

### Contrast Ratios
- All text must meet WCAG AA standards (4.5:1 minimum)
- Primary colors tested against white and black backgrounds
- Secondary colors provide sufficient contrast for UI elements

### Color Blindness Support
- Each duo-tone pair distinguishable for all types of color blindness
- Semantic meaning never conveyed by color alone
- Alternative indicators (icons, text, patterns) always provided

## Future Expansion

### New App Color Assignment
When adding new apps:
1. Check existing combinations to avoid duplicates
2. Test accessibility with WebAIM contrast checker
3. Ensure colors match app purpose/theme
4. Update this document and dock configuration
5. Generate CSS custom properties

### Color Harmony Rules
- Adjacent colors on color wheel for subtle combinations
- Complementary colors for high contrast needs
- Triadic relationships avoided to maintain duo-tone approach
- Saturation levels consistent within app families

## File Structure
```
/apps/{app-name}/
├── styles/
│   ├── colors.css          # App-specific color definitions
│   ├── components.css      # Component styles using color tokens
│   └── theme.css          # Theme configuration
├── components/
│   ├── PocBar.tsx         # Standardized PoC bar
│   ├── Taskbar.tsx        # Standardized taskbar
│   └── AppLayout.tsx      # Layout with color system
└── types/
    └── theme.ts           # TypeScript color definitions
```

---

*This color scheme ensures visual consistency across the Bitcoin OS ecosystem while maintaining unique app identities and accessibility standards.*