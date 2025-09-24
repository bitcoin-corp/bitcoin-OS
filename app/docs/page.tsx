'use client'

import { useState, useEffect } from 'react'
import { Book, Code, Terminal, Zap, Shield, Layers, Search, ExternalLink, ChevronRight, FileText, GitBranch, Package, Cpu, Database, Cloud } from 'lucide-react'
import TopMenuBar from '@/components/TopMenuBar'
import OSTaskbar from '@/components/OSTaskbar'
import DevSidebar from '@/components/DevSidebar'

interface DocSection {
  id: string
  title: string
  icon: any
  content: string
  code?: string
  links?: { title: string; url: string }[]
}

export default function DocsPage() {
  const [activeWindow, setActiveWindow] = useState<string | null>(null)
  const [openWindows, setOpenWindows] = useState<string[]>([])
  const [showDevSidebar, setShowDevSidebar] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSection, setActiveSection] = useState('getting-started')

  useEffect(() => {
    // Keyboard shortcut for dev sidebar
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'd') {
        e.preventDefault()
        setShowDevSidebar(!showDevSidebar)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [showDevSidebar])

  const openApp = (appName: string) => {
    if (!openWindows.includes(appName)) {
      setOpenWindows([...openWindows, appName])
    }
    setActiveWindow(appName)
  }

  const sections: DocSection[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Book,
      content: 'Bitcoin OS is a web-based operating system interface designed specifically for Bitcoin applications. It provides a familiar desktop environment while keeping all your Bitcoin tools in one place.',
      code: `# Clone the repository
git clone https://github.com/bitcoin-apps-suite/bitcoin-OS.git

# Install dependencies
npm install

# Run the development server
npm run dev

# Open http://localhost:2050`,
      links: [
        { title: 'GitHub Repository', url: 'https://github.com/bitcoin-apps-suite/bitcoin-OS' },
        { title: 'Bitcoin Apps Store', url: 'https://www.bitcoinapps.store' }
      ]
    },
    {
      id: 'architecture',
      title: 'Architecture',
      icon: Layers,
      content: 'Bitcoin OS is built with Next.js 14 and React, utilizing modern web technologies to create a seamless desktop-like experience in the browser. Each Bitcoin app runs independently while sharing common infrastructure.',
      code: `// Component Structure
/components
  ├── Desktop.tsx       // Main desktop interface
  ├── OSTaskbar.tsx     // Bottom taskbar
  ├── TopMenuBar.tsx    // Top menu system
  ├── DevSidebar.tsx    // Developer tools
  └── Window.tsx        // Window management

// Apps Configuration
/lib/apps.config.ts     // Centralized app registry`,
    },
    {
      id: 'bitcoin-apps',
      title: 'Bitcoin Apps',
      icon: Package,
      content: 'Bitcoin OS comes pre-configured with a suite of Bitcoin-focused applications, each designed to leverage the power of the Bitcoin network.',
      code: `// Available Apps
const bitcoinApps = [
  'Bitcoin Wallet',      // Manage your Bitcoin
  'Bitcoin Email',       // Encrypted messaging
  'Bitcoin Music',       // Decentralized streaming
  'Bitcoin Writer',      // Content creation
  'Bitcoin Drive',       // File storage
  'Bitcoin Spreadsheet', // Data management
  'Bitcoin Calendar',    // Event scheduling
  'Bitcoin Search',      // Web search
  'Bitcoin Shares',      // File sharing
  'Bitcoin Jobs',        // Job marketplace
]`,
      links: [
        { title: 'Bitcoin Wallet', url: 'https://bitcoin-wallet-sable.vercel.app' },
        { title: 'Bitcoin Email', url: 'https://bitcoin-email.vercel.app' },
        { title: 'Bitcoin Music', url: 'https://bitcoin-music.vercel.app' }
      ]
    },
    {
      id: 'lightning-network',
      title: 'Lightning Network',
      icon: Zap,
      content: 'Bitcoin OS integrates Lightning Network capabilities for instant, low-cost Bitcoin transactions across all applications.',
      code: `// Lightning Integration Example
import { LightningProvider } from '@/lib/lightning'

function App() {
  return (
    <LightningProvider>
      <PaymentButton 
        amount={1000}        // satoshis
        memo="Coffee"
        onSuccess={handlePayment}
      />
    </LightningProvider>
  )
}`,
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      icon: Code,
      content: 'Bitcoin OS provides a comprehensive API for developers to build and integrate their own Bitcoin applications.',
      code: `// Bitcoin OS API
import { BitcoinOS } from '@bitcoin-os/sdk'

// Initialize
const os = new BitcoinOS({
  network: 'mainnet',
  provider: 'electrum'
})

// Wallet operations
const wallet = await os.wallet.create()
const address = await wallet.getAddress()
const balance = await wallet.getBalance()

// Transaction
const tx = await wallet.send({
  to: 'bc1q...',
  amount: 100000,
  fee: 'medium'
})`,
    },
    {
      id: 'security',
      title: 'Security',
      icon: Shield,
      content: 'Security is paramount in Bitcoin OS. All private keys are stored locally and encrypted. Communications are secured through end-to-end encryption.',
      code: `// Security Best Practices
- Never expose private keys in code
- Use hardware wallets when possible
- Enable 2FA for all accounts
- Regular security audits
- Keep dependencies updated

// Key Management
import { KeyVault } from '@bitcoin-os/security'

const vault = new KeyVault({
  encryption: 'AES-256-GCM',
  storage: 'local'
})`,
    },
    {
      id: 'development',
      title: 'Development',
      icon: Terminal,
      content: 'Build your own Bitcoin applications using the Bitcoin OS SDK and development tools.',
      code: `// Create a new Bitcoin app
npx create-bitcoin-app my-app

// Project structure
my-app/
├── src/
│   ├── components/
│   ├── lib/
│   └── app/
├── public/
└── package.json

// Development commands
npm run dev      // Start dev server
npm run build    // Build for production
npm run test     // Run tests
npm run lint     // Lint code`,
    },
    {
      id: 'deployment',
      title: 'Deployment',
      icon: Cloud,
      content: 'Deploy Bitcoin OS applications to various platforms with built-in optimization and performance monitoring.',
      code: `# Deploy to Vercel
vercel deploy

# Deploy to Docker
docker build -t bitcoin-os .
docker run -p 3000:3000 bitcoin-os

# Environment Variables
NEXT_PUBLIC_BITCOIN_NETWORK=mainnet
NEXT_PUBLIC_ELECTRUM_SERVER=electrum.blockstream.info
NEXT_PUBLIC_LIGHTNING_NODE=node.lightning.com`,
    }
  ]

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const currentSection = sections.find(s => s.id === activeSection) || sections[0]

  return (
    <div className="h-screen flex flex-col relative bg-black">
      <TopMenuBar onOpenApp={openApp} />
      
      <div className="flex-1 flex relative overflow-hidden pb-14">
        {showDevSidebar && <DevSidebar />}
        
        <div className={`flex-1 flex transition-all duration-300 ${showDevSidebar ? 'md:ml-64' : ''}`}>
        {/* Sidebar */}
        <div className="w-64 bg-gray-900/50 backdrop-blur-sm border-r border-gray-800 min-h-screen p-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-4">
              <span className="text-bitcoin-orange">Bitcoin</span>
              <span className="text-white ml-1">Docs</span>
            </h1>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search docs..."
                className="w-full bg-black/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-bitcoin-orange"
              />
            </div>
          </div>

          <nav className="space-y-1">
            {filteredSections.map(section => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === section.id
                      ? 'bg-bitcoin-orange text-black font-medium'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-left">{section.title}</span>
                  {activeSection === section.id && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </button>
              )
            })}
          </nav>

          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="space-y-2">
              <a
                href="https://github.com/bitcoin-apps-suite"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-bitcoin-orange transition-colors"
              >
                <GitBranch className="w-4 h-4" />
                GitHub
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://bitcoinapps.store"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-bitcoin-orange transition-colors"
              >
                <Package className="w-4 h-4" />
                App Store
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                {(() => {
                  const Icon = currentSection.icon
                  return <Icon className="w-8 h-8 text-bitcoin-orange" />
                })()}
                <h2 className="text-3xl font-bold text-white">
                  {currentSection.title}
                </h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                {currentSection.content}
              </p>
            </div>

            {currentSection.code && (
              <div className="mb-8">
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Code Example</span>
                    </div>
                    <button className="text-xs text-gray-500 hover:text-bitcoin-orange transition-colors">
                      Copy
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto">
                    <code className="text-sm text-gray-300 font-mono">
                      {currentSection.code}
                    </code>
                  </pre>
                </div>
              </div>
            )}

            {currentSection.links && currentSection.links.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Related Links</h3>
                <div className="space-y-2">
                  {currentSection.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-bitcoin-orange transition-all group"
                    >
                      <FileText className="w-4 h-4" />
                      <span className="flex-1">{link.title}</span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="mt-12 grid grid-cols-2 gap-4">
              <button className="px-6 py-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg hover:bg-gray-800 transition-colors group">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-bitcoin-orange" />
                  <div className="text-left">
                    <div className="text-white font-medium">API Explorer</div>
                    <div className="text-sm text-gray-400">Interactive API testing</div>
                  </div>
                </div>
              </button>
              <button className="px-6 py-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg hover:bg-gray-800 transition-colors group">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-bitcoin-orange" />
                  <div className="text-left">
                    <div className="text-white font-medium">Examples</div>
                    <div className="text-sm text-gray-400">Sample implementations</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
      
      <OSTaskbar 
        openWindows={openWindows}
        activeWindow={activeWindow}
        onWindowClick={setActiveWindow}
      />
    </div>
  )
}