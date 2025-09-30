# Bitcoin Blockchain Spreadsheet

A revolutionary decentralized spreadsheet application that stores data on the Bitcoin SV blockchain, featuring HandCash wallet integration for authentication and data encryption. This project aims to create a fully decentralized, secure, and collaborative spreadsheet platform rivaling Google Sheets and Microsoft Excel.

## 🌟 Vision

To create the world's first truly decentralized spreadsheet application where:
- Data is owned by users, not corporations
- Every change is cryptographically secure and immutable
- Collaboration happens without central servers
- Privacy is guaranteed through encryption
- No single point of failure exists

## 🚀 Current Features

- **HandCash OAuth Authentication**: Secure wallet-based login system
- **Encrypted Data Storage**: AES-256 encryption using wallet-derived keys
- **Bitcoin SV Integration**: Ready for on-chain data storage
- **Responsive Spreadsheet Grid**: Interactive 10x10 grid interface
- **Formula Support**: Basic formula calculations (SUM, etc.)
- **User Session Management**: Secure session handling with localStorage
- **Dark Mode UI**: Modern, sleek interface design

## 🎯 Advanced Spreadsheet Features (Implementing Now)

### Core Spreadsheet Functionality (Powered by Open-Source)
We're integrating battle-tested code from leading open-source projects:

#### ✅ Formula Engine (400+ Excel Functions)
- **HyperFormula Integration**: Full Excel compatibility
- Mathematical: SUM, AVERAGE, MIN, MAX, COUNT, ROUND
- Logical: IF, AND, OR, NOT, IFS, SWITCH, XLOOKUP
- Text: CONCAT, LEFT, RIGHT, MID, LEN, TRIM, REGEX
- Date/Time: TODAY, NOW, DATE, DATEDIF, NETWORKDAYS
- Lookup: VLOOKUP, HLOOKUP, INDEX, MATCH, XLOOKUP
- Financial: NPV, IRR, PMT, FV, PV, RATE
- Statistical: STDEV, VAR, MEDIAN, MODE, PERCENTILE
- Array Formulas: SUMPRODUCT, TRANSPOSE, FILTER, SORT

#### ✅ Professional Formatting
- Number formats: Currency, Percentage, Date, Scientific
- Cell styles: Bold, Italic, Underline, Strikethrough
- Alignment: Horizontal, Vertical, Text wrap, Rotation
- Borders: Style, Color, Width, Diagonal
- Fill: Colors, Gradients, Patterns
- Conditional Formatting: Color scales, Data bars, Icon sets
- Cell merge/unmerge
- Freeze panes

#### ✅ Data Operations
- **Sort & Filter**: Multi-column, Custom filters, AutoFilter
- **Find & Replace**: Regex support, Case sensitive, Whole word
- **Data Validation**: Dropdowns, Date ranges, Custom rules
- **Pivot Tables**: Drag-drop interface, Calculated fields
- **Charts**: Line, Bar, Pie, Scatter, Area, Sparklines
- **Import/Export**: Excel, CSV, PDF, JSON, HTML

#### ✅ Collaboration Features
- Real-time multi-user editing
- Cell-level locking
- Comments and notes
- Change tracking
- Version history with rollback

#### ✅ Performance
- Virtual scrolling for 1M+ rows
- Web Workers for formula calculation
- Lazy loading for large files
- 60fps smooth scrolling

### Open-Source Libraries We're Using:
- **Luckysheet**: Full-featured Excel-like spreadsheet (MIT License)
- **HyperFormula**: Advanced formula engine (GPL v3)
- **SheetJS**: File format support (Apache 2.0)
- **RevoGrid**: High-performance virtual grid (MIT)
- **x-spreadsheet**: Lightweight spreadsheet (MIT)

### Quick Implementation Timeline:
- **Week 1**: Basic grid + formulas working
- **Week 2**: Full formatting + import/export
- **Week 3**: Charts + pivot tables
- **Week 4**: Real-time collaboration

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Components**: Modular React components for spreadsheet, cells, and toolbar
- **Services**: HandCash authentication and Bitcoin blockchain integration
- **State Management**: React hooks for local state management
- **Styling**: Custom CSS with dark mode support
- **Responsive Design**: Mobile-first approach

### Backend API (Node.js + Express)
- **HandCash OAuth**: Server-side authentication flow
- **Profile Management**: User profile fetching and caching
- **CORS Handling**: Cross-origin resource sharing configuration
- **Environment Config**: Secure environment variable management

### Blockchain Integration
- **Bitcoin SV**: Data storage on immutable blockchain
- **Encryption**: AES-256 encryption with wallet-derived keys
- **Smart Contracts**: sCrypt contracts for data management (planned)
- **HandCash Connect**: Wallet integration and payment processing

## 🚀 Quick Spreadsheet Implementation

### Option 1: Luckysheet (Full Featured - 2 Days)
```bash
npm install luckysheet
# Gets you 400+ formulas, charts, pivot tables immediately
```

### Option 2: x-spreadsheet (Lightweight - 1 Day)
```bash
npm install x-data-spreadsheet
# Minimal, fast, no dependencies
```

### Option 3: Build from Components (1 Week)
```bash
npm install hyperformula @revolist/revogrid xlsx
# Formula engine + Virtual grid + File I/O
```

See [SPREADSHEET_FEATURES_SPEC.md](./SPREADSHEET_FEATURES_SPEC.md) for full implementation details.

## 📋 Prerequisites

- Node.js 16+ and npm
- HandCash wallet account (get one at https://handcash.io)
- HandCash App credentials (from https://dashboard.handcash.io)

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/b0ase/bitcoin-spreadsheet.git
cd bitcoin-spreadsheet
```

### 2. Install dependencies
```bash
# Install API dependencies
cd api
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Configure environment variables

Create `.env` file in the `api` directory:
```env
HANDCASH_APP_ID=your_app_id
HANDCASH_APP_SECRET=your_app_secret
CLIENT_URL=http://localhost:3000
PORT=3001
```

Create `.env` file in the `frontend` directory:
```env
REACT_APP_HANDCASH_APP_ID=your_app_id
REACT_APP_HANDCASH_REDIRECT_URL=http://localhost:3000/auth/handcash/callback
```

### 4. Start the development servers

```bash
# Terminal 1: Start API server
cd api
PORT=3001 npm start

# Terminal 2: Start frontend
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
bitcoin-spreadsheet/
├── api/                              # Backend API server
│   ├── server.js                    # Express server with HandCash endpoints
│   ├── package.json                 # API dependencies
│   └── .env                         # API environment variables
├── frontend/                         # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Spreadsheet.tsx     # Main spreadsheet grid component
│   │   │   ├── Cell.tsx            # Individual cell component
│   │   │   ├── FormulaBar.tsx      # Formula input bar
│   │   │   ├── LoginPage.tsx       # HandCash login interface
│   │   │   └── Navigation.tsx      # Navigation component
│   │   ├── services/
│   │   │   ├── BitcoinService.ts   # Bitcoin/BSV integration
│   │   │   └── HandCashAuthService.ts # HandCash OAuth service
│   │   ├── styles/
│   │   │   ├── Spreadsheet.css     # Spreadsheet styling
│   │   │   └── LoginPage.css       # Login page styling
│   │   ├── App.tsx                 # Main application component
│   │   ├── App.css                 # Global styles
│   │   └── index.tsx               # Application entry point
│   ├── public/
│   │   └── index.html              # HTML template
│   ├── package.json                # Frontend dependencies
│   └── .env                        # Frontend environment variables
├── docs/                            # Documentation
│   ├── PRD.md                      # Product Requirements Document
│   ├── EPIC.md                     # EPIC documentation
│   └── ROADMAP.md                  # Implementation roadmap
├── .gitignore                       # Git ignore rules
├── README.md                        # This file
└── LICENSE                          # ISC License
```

## 🔧 Configuration

### HandCash Application Setup

1. Go to [HandCash Dashboard](https://dashboard.handcash.io)
2. Create a new application
3. Set OAuth redirect URL to `http://localhost:3000/auth/handcash/callback`
4. Copy your App ID and App Secret
5. Add them to your environment files

### Production Deployment

For production deployment on Vercel:

1. Deploy frontend to Vercel
2. Add environment variables in Vercel dashboard:
   - `REACT_APP_HANDCASH_APP_ID`
   - `REACT_APP_HANDCASH_REDIRECT_URL`
3. Deploy API to Vercel Functions or separate server
4. Update `CLIENT_URL` in API environment

### Security Configuration

- **Encryption**: AES-256 encryption is automatic
- **Key Derivation**: Keys are derived from HandCash public keys
- **Session Management**: Sessions expire after 24 hours
- **CORS**: Configure allowed origins in `api/server.js`

## 💻 Usage

### Getting Started

1. **Sign In**: Click "Sign in with HandCash" to authenticate
2. **Create Spreadsheet**: Your spreadsheet is automatically created upon login
3. **Edit Cells**: Click any cell to select, type to edit
4. **Use Formulas**: Start with `=` for formulas (e.g., `=SUM(A1:A5)`)
5. **Save Automatically**: All changes are encrypted and prepared for blockchain storage

### Keyboard Shortcuts

- `Enter` - Confirm cell edit and move down
- `Tab` - Confirm cell edit and move right
- `Escape` - Cancel cell edit
- `Arrow Keys` - Navigate between cells
- `Delete` - Clear cell content
- `Ctrl+C` - Copy cell (coming soon)
- `Ctrl+V` - Paste cell (coming soon)
- `Ctrl+Z` - Undo (coming soon)

### Formula System

Currently supported:
- `=SUM(range)` - Sum values
- Basic arithmetic: `=A1+B1`, `=A1*2`

Coming soon:
- `=AVERAGE()`, `=COUNT()`, `=MAX()`, `=MIN()`
- `=IF()`, `=VLOOKUP()`, `=CONCATENATE()`
- Date functions, text functions, and more

## 🔒 Security & Privacy

### Data Security
- **Encryption**: All spreadsheet data is encrypted with AES-256
- **Key Management**: Encryption keys derived from HandCash wallet
- **No Central Storage**: Data will be stored on blockchain, not servers
- **User Ownership**: Only you can decrypt your data

### Authentication Security
- **OAuth 2.0**: Industry-standard authentication via HandCash
- **No Password Storage**: Authentication via wallet, no passwords
- **Session Security**: Secure session tokens with expiration
- **HTTPS Only**: All production traffic encrypted

### Privacy Features
- **Zero-Knowledge**: Servers never see unencrypted data
- **Pseudonymous**: Only HandCash handle visible, no personal info
- **Data Portability**: Export your data anytime
- **Right to Delete**: Clear all data from blockchain (burn tokens)

## 🧪 Testing

### Unit Tests
```bash
# Frontend tests
cd frontend
npm test

# API tests
cd api
npm test
```

### Integration Testing
1. Start both servers locally
2. Test HandCash authentication flow
3. Test spreadsheet operations
4. Verify encryption/decryption

### Security Testing
- Penetration testing planned
- Smart contract audits pending
- OWASP compliance review scheduled

## 🚢 Deployment

### Production URL
🌐 **Live App**: https://bitcoin-spreadsheet.vercel.app

### Vercel Deployment Configuration

The project is deployed on Vercel with the following setup:

1. **GitHub Integration**:
   - Repository: `bitcoin-apps-suite/bitcoin-spreadsheet`
   - Branch: `main` (auto-deploys on push)
   - Organization: Bitcoin Apps Suite

2. **Build Configuration** (`vercel.json`):
   ```json
   {
     "buildCommand": "cd frontend && npm ci --legacy-peer-deps && CI=false npm run build",
     "outputDirectory": "frontend/build",
     "installCommand": "echo 'Skipping root install'",
     "framework": null
   }
   ```

3. **Environment Variables**:
   No environment variables required for frontend deployment.

4. **Manual Deployment**:
   ```bash
   cd frontend
   npm run build
   vercel --prod
   ```

2. **API** (as Vercel Functions):
   ```bash
   cd api
   vercel --prod
   ```

### Docker Deployment

```dockerfile
# Coming soon: Docker compose configuration
docker-compose up -d
```

### Manual Deployment

1. Build frontend: `npm run build`
2. Deploy `frontend/build` to any static host
3. Deploy API to Node.js server
4. Configure environment variables
5. Set up SSL certificates

## 🔗 API Reference

### Frontend Services

#### BitcoinService
```typescript
connect(): Promise<void>                    // Connect to HandCash
createSpreadsheet(title): Promise<SpreadsheetData>
updateCell(id, row, col, value, type): Promise<void>
getCell(id, row, col): Promise<CellData>
calculateFormula(formula, cells): Promise<string>
getBalance(): Promise<string>               // Get wallet balance
getAddress(): Promise<string>               // Get wallet address
```

#### HandCashAuthService
```typescript
login(): Promise<void>                      // Start OAuth flow
handleCallback(url): Promise<HandCashUser>  // Handle OAuth callback
logout(): void                              // Clear session
isAuthenticated(): boolean                  // Check auth status
getCurrentUser(): HandCashUser | null       // Get user info
```

### Backend API Endpoints

```
GET  /api/health                     # Health check
GET  /api/auth/handcash/url          # Get OAuth URL
GET  /api/auth/handcash/callback     # OAuth callback
POST /api/handcash-profile           # Get user profile
```

## 🤝 Contributing

We welcome contributions! This is an open-source project aimed at revolutionizing spreadsheets.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**: Describe your changes

### Development Guidelines

- Write clean, documented code
- Add unit tests for new features
- Follow existing code style
- Update documentation
- Check security implications

### Priority Areas

- Formula engine enhancements
- Collaboration features
- Performance optimizations
- Mobile responsiveness
- Blockchain integration
- Security improvements

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🏆 Acknowledgments

- [HandCash](https://handcash.io) - Wallet and authentication
- [Bitcoin SV](https://bitcoinsv.com) - Blockchain platform
- [sCrypt](https://scrypt.io) - Smart contract framework
- React team for the amazing framework
- All contributors and supporters

## ⚠️ Disclaimer

This is experimental software in active development. While we strive for security and reliability:

- Not yet audited for production use
- Blockchain integration is in development
- Data persistence is currently local
- Use at your own risk
- Not financial advice

**IMPORTANT**: This project is for educational and experimental purposes. Do not use for critical data until production release.

## 🔗 Important Links

### Project
- [GitHub Repository](https://github.com/b0ase/bitcoin-spreadsheet)
- [Live Demo](https://bitcoin-spreadsheet.vercel.app) (Coming Soon)
- [Documentation](docs/)
- [Issue Tracker](https://github.com/b0ase/bitcoin-spreadsheet/issues)

### Resources
- [HandCash Developer Portal](https://docs.handcash.io)
- [Bitcoin SV](https://bitcoinsv.com/)
- [sCrypt Documentation](https://scrypt.io/)
- [BSV Developer Resources](https://developer.bitcoinsv.io/)

### Community
- [Discord](https://discord.gg/bitcoinspreadsheet) (Coming Soon)
- [Twitter](https://twitter.com/bitcoinspreadsheet) (Coming Soon)
- [Telegram](https://t.me/bitcoinspreadsheet) (Coming Soon)

---

**Built with determination to revolutionize spreadsheets on Bitcoin SV**

*"Your data, your keys, your spreadsheet"*
