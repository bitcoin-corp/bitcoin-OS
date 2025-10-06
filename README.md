# Bitcoin OS (bOS) 🖥️

> Complete browser-based operating system for the Bitcoin ecosystem with native app integration and desktop experience

## Overview

Bitcoin OS (bOS) is a revolutionary web-based operating system that provides a complete desktop environment for Bitcoin applications. Built by The Bitcoin Corporation LTD, it features window management, a draggable dock, desktop icons, and seamless integration with 14+ Bitcoin applications through intelligent iframe embedding and CORS handling.

## 🚀 Features

- **Complete Desktop Environment**: Window management, draggable dock, desktop icons, and settings
- **Bitcoin App Ecosystem**: 14+ integrated Bitcoin applications including Writer, Email, Music, Wallet, and more
- **Smart App Embedding**: Intelligent iframe handling with CORS fallback for seamless app integration
- **Responsive Design**: Works across desktop and mobile devices
- **Subscription Management**: Built-in support for Bitcoin-based app subscriptions
- **Theme System**: Customizable appearance and UI themes
- **Drag & Drop**: Full drag-and-drop support for windows and dock

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/bitcoin-corp/bOS.git

# Navigate to the project
cd bOS

# Install dependencies
npm install

# Run the development server
npm run dev
```

Visit [http://localhost:3000/test-os](http://localhost:3000/test-os) for the complete Bitcoin OS experience.

## Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🏗️ Architecture

### Monorepo Structure
- `app/` - Next.js application and pages
- `packages/bitcoin-os-ui-kit/` - Complete UI component library
- `packages/bitcoin-os-bridge/` - Integration utilities
- `packages/bitcoin-os-bapps/` - Bitcoin app definitions

### Technology Stack
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation and gesture library
- **Zustand** - State management
- **React 19** - Latest React features

### Key Components
- **Desktop**: Main desktop environment with wallpaper and icon management
- **Dock**: Draggable dock with app launcher functionality
- **WindowManager**: Complete window system with drag, resize, minimize, maximize
- **Settings**: Comprehensive settings panel for customization
- **SmartIframe**: Intelligent app embedding with CORS handling

## 🧪 Development Environment

### Test Environment
Access the test environment at `/test-os` to preview all functionality:
- Real Bitcoin apps in dock and desktop
- Window-based app launching with iframe embedding
- Draggable and detachable dock
- Desktop icon management
- Settings customization

### UI Kit Development
```bash
cd packages/bitcoin-os-ui-kit
npm run build
npm run dev  # Watch mode
```

## 📱 Bitcoin Apps Integration

bOS integrates with the complete Bitcoin app ecosystem:

- **Bitcoin Apps Store** - App discovery and installation
- **Bitcoin Writer** - Document creation and publishing
- **Bitcoin Email** - Bitcoin-integrated email system
- **Bitcoin Music** - Music streaming with Bitcoin payments
- **Bitcoin Wallet** - Cryptocurrency wallet management
- **Bitcoin Code** - Development environment
- **Bitcoin Drive** - Decentralized file storage
- **Bitcoin Calendar** - Event and scheduling management
- **Bitcoin Photos** - Photo management and sharing
- **Bitcoin Jobs** - Job marketplace
- **And more...**

## 🔒 CORS Handling

bOS includes intelligent CORS handling:
- Apps that allow embedding load seamlessly in iframe windows
- Apps with CORS restrictions show elegant fallback UI with "Open in New Tab" option
- Automatic detection and graceful handling of embedding restrictions

### Metanet Desktop Integration

Bitcoin OS integrates with [Metanet Desktop](https://github.com/bsv-blockchain/metanet-desktop) to provide native BSV wallet functionality:

- **JSON-API Communication** - Connects via TCP port 3321
- **WAB Authentication** - Secure app-wallet authentication
- **Transaction Signing** - Sign and broadcast BSV transactions
- **Balance & Address Display** - Real-time wallet information
- **Permission Management** - Granular app permissions

To enable wallet features:
1. Install [Metanet Desktop](https://github.com/bsv-blockchain/metanet-desktop)
2. Ensure it's running on localhost:3321
3. Bitcoin OS will automatically detect and connect

### BRC Standards Integration

Bitcoin OS implements BSV BRC (Bitcoin Request for Comments) specifications:

- **BRC-1 Transaction Creation** - Standardized wallet-to-application interface
- **BRC-103 Identity Certificates** - Verifiable identity with selective disclosure
- **Interactive Learning** - Integration with [fast.brc.dev](https://fast.brc.dev) resources
- **Transaction Broadcasting** - Direct BSV network interaction
- **Data Transactions** - OP_RETURN data storage on blockchain

BRC Demo Features:
- Create standardized BSV payment transactions
- Store data on-chain using OP_RETURN
- Lookup identity certificates (BRC-103)
- Check transaction status and confirmations
- Validate transactions against BRC standards

## License

Open BSV License v5

## Third-Party Integrations

### Metanet Desktop
Bitcoin OS integrates with [Metanet Desktop](https://github.com/bsv-blockchain/metanet-desktop), a desktop wallet application for BSV blockchain:

- **Repository**: https://github.com/bsv-blockchain/metanet-desktop
- **License**: Open BSV License
- **Organization**: BSV Blockchain Association
- **Integration**: JSON-API over TCP/3321 for wallet functionality

We extend our gratitude to the BSV Blockchain Association and the Metanet Desktop contributors for providing the wallet infrastructure that enables Bitcoin OS's blockchain features.

## Company

Built with ❤️ by **The Bitcoin Corporation LTD**  
UK Company No. 16735102

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## Support

- **Issues**: [GitHub Issues](https://github.com/bitcoin-corp/bOS/issues)
- **Email**: ceo@thebitcoincorporation.com
- **Website**: [thebitcoincorporation.com](https://thebitcoincorporation.com)

---

*Bitcoin OS - The Future of Computing is Decentralized*