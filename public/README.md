# Bitcoin OS 🖥️

> Open source Bitcoin-powered operating system with built-in wallet, decentralized apps, and blockchain integration

## Overview

Bitcoin OS is a revolutionary web-based operating system that brings the power of Bitcoin and blockchain technology to your desktop. Built by The Bitcoin Corporation LTD, it provides a familiar desktop environment while integrating cryptocurrency and decentralized applications seamlessly.

## Features

- 🎨 **Desktop Environment** - Familiar OS-like interface with windows, taskbar, and desktop icons
- 💰 **Built-in Bitcoin Wallet** - Secure wallet integrated at the OS level
- 📧 **Bitcoin Email** - Encrypted email with blockchain storage
- 🎵 **Bitcoin Music** - Stream and trade music NFTs
- 📝 **Bitcoin Writer** - On-chain publishing platform
- 💾 **Bitcoin Drive** - Decentralized cloud storage
- 🌐 **DApp Browser** - Access decentralized applications
- ⚡ **Terminal** - Command-line interface for advanced users

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/bitcoin-corp/bitcoin-OS.git

# Navigate to the project
cd bitcoin-OS

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:2050](http://localhost:2050) in your browser.

## Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Architecture

Bitcoin OS is built with:
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Bitcoin SDK** - Blockchain integration
- **Lucide Icons** - UI icons
- **Metanet Desktop Integration** - BSV wallet connectivity via JSON-API

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

Open BSV License v4

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

- **Issues**: [GitHub Issues](https://github.com/bitcoin-apps-suite/bitcoin-OS/issues)
- **Email**: ceo@thebitcoincorporation.com
- **Website**: [thebitcoincorporation.com](https://thebitcoincorporation.com)

---

*Bitcoin OS - The Future of Computing is Decentralized*