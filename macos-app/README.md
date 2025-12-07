# Bitcoin OS - macOS App

A native macOS desktop application for Bitcoin OS that can be added to your dock.

## Quick Start

### Run the app directly:
```bash
npm start
```

### Build the app for macOS:
```bash
npm run dist
```

The built app will be in `dist/mac/Bitcoin OS.app`

## Installation

### Option 1: Run from Terminal
```bash
cd macos-app
npm install
npm start
```

### Option 2: Build and Install
1. Build the app:
```bash
npm run dist
```

2. Find the app in `dist/mac/`
3. Drag "Bitcoin OS.app" to your Applications folder
4. Add to Dock by dragging from Applications

## Features

- Native macOS app with menu bar integration
- Full Bitcoin OS functionality
- Quick access to all Bitcoin apps
- Dock icon for easy launching
- Native keyboard shortcuts
- Fullscreen support

## Development

The app uses Electron to wrap the Bitcoin OS web app in a native macOS container.

### Project Structure
- `main.js` - Main Electron process
- `package.json` - App configuration
- `assets/` - Icons and resources
- `dist/` - Built applications

## Building for Distribution

To create a DMG installer:
```bash
npm run dist
```

This creates:
- `dist/mac/Bitcoin OS.app` - The macOS application
- `dist/Bitcoin OS-0.1.0.dmg` - DMG installer (if configured)

## Requirements

- macOS 10.13 or later
- Node.js 16 or later
- npm or yarn

## License

Open-BSV-4.0 - Copyright (c) 2025 The Bitcoin Corporation LTD