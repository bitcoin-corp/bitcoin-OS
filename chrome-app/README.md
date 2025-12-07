# Bitcoin OS Chrome Extension

A Chrome extension for quick access to Bitcoin OS and its decentralized applications.

## Features

- Quick access to Bitcoin OS from Chrome toolbar
- Direct wallet access
- App launcher for Bitcoin OS apps
- Secure background service worker

## Development

### Setup
```bash
cd chrome-app
npm install
```

### Build
```bash
npm run build
```

### Generate Icons
```bash
npm run icons
```

### Package for Distribution
```bash
npm run pack
```

## Installation

### Developer Mode
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked"
4. Select the `chrome-app/dist` directory

### Production
1. Run `npm run pack` to create `bitcoin-os-chrome.zip`
2. Upload to Chrome Web Store

## Architecture

- `manifest.json` - Chrome extension manifest v3
- `popup.html/css/js` - Extension popup UI
- `background.js` - Service worker for background tasks
- `icons` - Extension icons in multiple sizes

## Permissions

The extension requests minimal permissions:
- `storage` - For saving user preferences
- `tabs` - For opening Bitcoin OS
- `activeTab` - For current tab interaction

## License

Open-BSV-4.0 - Copyright (c) 2025 The Bitcoin Corporation LTD