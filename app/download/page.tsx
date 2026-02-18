'use client'

import { useState } from 'react'
import { Download, Chrome, Monitor, Github, CheckCircle, ArrowRight, Search, ExternalLink, Package, Code, GitBranch } from 'lucide-react'

interface AppDownload {
  name: string
  repo: string
  org: 'bitcoin-apps-suite' | 'bitcoin-corp'
  description: string
  liveUrl?: string
  color: string
  category: 'os' | 'productivity' | 'media' | 'finance' | 'social' | 'developer' | 'infrastructure'
}

const allApps: AppDownload[] = [
  // Bitcoin OS
  {
    name: 'Bitcoin OS',
    repo: 'bitcoin-OS',
    org: 'bitcoin-corp',
    description: 'Open source Bitcoin-powered operating system with built-in wallet, decentralized apps, and blockchain integration',
    liveUrl: 'https://bitcoin-os.vercel.app',
    color: '#f7931a',
    category: 'os',
  },
  // Productivity
  {
    name: 'Bitcoin Writer',
    repo: 'bitcoin-writer',
    org: 'bitcoin-apps-suite',
    description: 'Writing platform with on-chain publishing, content monetization, and collaborative editing',
    liveUrl: 'https://bitcoin-writer.vercel.app',
    color: '#ff9500',
    category: 'productivity',
  },
  {
    name: 'Bitcoin Spreadsheet',
    repo: 'bitcoin-spreadsheet',
    org: 'bitcoin-apps-suite',
    description: 'Spreadsheet application with blockchain data integration and smart contract calculations',
    liveUrl: 'https://bitcoin-spreadsheet.vercel.app',
    color: '#3b82f6',
    category: 'productivity',
  },
  {
    name: 'Bitcoin Calendar',
    repo: 'bitcoin-calendar',
    org: 'bitcoin-apps-suite',
    description: 'Calendar with event scheduling, smart contract automation, and payment integration',
    liveUrl: 'https://bitcoin-calendar.vercel.app',
    color: '#d946ef',
    category: 'productivity',
  },
  {
    name: 'Bitcoin Email',
    repo: 'bitcoin-email',
    org: 'bitcoin-apps-suite',
    description: 'Email client with blockchain storage, encryption, and micropayments',
    liveUrl: 'https://bitcoin-email.vercel.app',
    color: '#ef4444',
    category: 'productivity',
  },
  {
    name: 'Bitcoin Drive',
    repo: 'bitcoin-drive',
    org: 'bitcoin-apps-suite',
    description: 'Cloud storage with encrypted file sharing, distributed storage, and micropayments',
    liveUrl: 'https://bitcoin-drive.vercel.app',
    color: '#22c55e',
    category: 'productivity',
  },
  {
    name: 'Bitcoin CMS',
    repo: 'bitcoin-cms',
    org: 'bitcoin-apps-suite',
    description: 'Content management system with blockchain publishing, monetization, and distributed hosting',
    liveUrl: 'https://bitcoin-cms.vercel.app',
    color: '#8b5cf6',
    category: 'productivity',
  },
  {
    name: 'Bitcoin Docs',
    repo: 'bitcoin-docs',
    org: 'bitcoin-apps-suite',
    description: 'Documentation platform for the Bitcoin Apps ecosystem',
    color: '#6b7280',
    category: 'productivity',
  },
  {
    name: 'Bitcoin CRM',
    repo: 'bitcoin-crm',
    org: 'bitcoin-apps-suite',
    description: 'Customer relationship management with payment tracking and automated billing',
    color: '#0ea5e9',
    category: 'productivity',
  },
  {
    name: 'Bitcoin Contracts',
    repo: 'bitcoin-contracts',
    org: 'bitcoin-apps-suite',
    description: 'Smart contract tools and management for Bitcoin transactions',
    color: '#14b8a6',
    category: 'productivity',
  },
  // Media & Creative
  {
    name: 'Bitcoin Music',
    repo: 'bitcoin-music',
    org: 'bitcoin-apps-suite',
    description: 'Music platform for NFT inscription, streaming, and revenue sharing',
    liveUrl: 'https://bitcoin-music.vercel.app',
    color: '#8b5cf6',
    category: 'media',
  },
  {
    name: 'Bitcoin Video',
    repo: 'bitcoin-video',
    org: 'bitcoin-apps-suite',
    description: 'Video platform with content monetization, live streaming, and creator revenue sharing',
    liveUrl: 'https://bitcoin-video-nine.vercel.app',
    color: '#65a30d',
    category: 'media',
  },
  {
    name: 'Bitcoin Photos',
    repo: 'bitcoin-photos',
    org: 'bitcoin-apps-suite',
    description: 'Photo management with encrypted storage, blockchain provenance, and monetization',
    liveUrl: 'https://bitcoin-photos.vercel.app',
    color: '#ec4899',
    category: 'media',
  },
  {
    name: 'Bitcoin Art',
    repo: 'bitcoin-art',
    org: 'bitcoin-apps-suite',
    description: 'Digital art platform with NFT minting, blockchain provenance, and artist monetization',
    liveUrl: 'https://bitcoin-art.vercel.app',
    color: '#f43f5e',
    category: 'media',
  },
  {
    name: 'Bitcoin Paint',
    repo: 'bitcoin-paint',
    org: 'bitcoin-apps-suite',
    description: 'Digital art creation tool with blockchain storage and NFT minting',
    liveUrl: 'https://bitcoin-paint.vercel.app',
    color: '#a855f7',
    category: 'media',
  },
  {
    name: 'Bitcoin Books',
    repo: 'bitcoin-books',
    org: 'bitcoin-apps-suite',
    description: 'Digital library with on-chain publishing, micropayment reading, and author revenue sharing',
    liveUrl: 'https://bitcoin-books-bay.vercel.app',
    color: '#10b981',
    category: 'media',
  },
  {
    name: 'Bitcoin Radio',
    repo: 'bitcoin-radio',
    org: 'bitcoin-apps-suite',
    description: 'Radio streaming platform with Bitcoin-powered content delivery',
    liveUrl: 'https://bitcoin-radio.vercel.app',
    color: '#f59e0b',
    category: 'media',
  },
  {
    name: 'Bitcoin 3D',
    repo: 'bitcoin-3d',
    org: 'bitcoin-apps-suite',
    description: '3D modeling platform with immersive visualization and blockchain asset storage',
    liveUrl: 'https://bitcoin-3d.vercel.app',
    color: '#ec4899',
    category: 'media',
  },
  {
    name: 'Bitcoin Gaming',
    repo: 'bitcoin-gaming',
    org: 'bitcoin-apps-suite',
    description: 'Gaming platform with in-game economies, NFT assets, and player transactions',
    liveUrl: 'https://bitcoin-gaming.vercel.app',
    color: '#8b5cf6',
    category: 'media',
  },
  // Finance
  {
    name: 'Bitcoin Wallet',
    repo: 'bitcoin-wallet',
    org: 'bitcoin-apps-suite',
    description: 'Bitcoin wallet with multi-sig support and seamless blockchain integration',
    liveUrl: 'https://bitcoin-wallet-sable.vercel.app',
    color: '#ffd700',
    category: 'finance',
  },
  {
    name: 'Bitcoin Exchange',
    repo: 'bitcoin-exchange',
    org: 'bitcoin-apps-suite',
    description: 'Cryptocurrency exchange with atomic swaps, order book management, and trading tools',
    liveUrl: 'https://bitcoin-exchange-iota.vercel.app',
    color: '#10b981',
    category: 'finance',
  },
  {
    name: 'Bitcoin Jobs',
    repo: 'bitcoin-jobs',
    org: 'bitcoin-apps-suite',
    description: 'Job marketplace with smart contract escrow, skill verification, and instant payments',
    liveUrl: 'https://bitcoin-jobs.vercel.app',
    color: '#40e0d0',
    category: 'finance',
  },
  {
    name: 'Bitcoin Shares',
    repo: 'bitcoin-shares',
    org: 'bitcoin-apps-suite',
    description: 'Equity platform for tokenized shares, cap table management, and dividend distribution',
    color: '#6366f1',
    category: 'finance',
  },
  {
    name: 'Bitcoin Money',
    repo: 'bitcoin-money',
    org: 'bitcoin-apps-suite',
    description: 'Financial management tools for the Bitcoin ecosystem',
    color: '#22c55e',
    category: 'finance',
  },
  {
    name: 'Bitcoin Marketing',
    repo: 'bitcoin-marketing',
    org: 'bitcoin-apps-suite',
    description: 'Marketing tools and analytics for Bitcoin businesses',
    color: '#f97316',
    category: 'finance',
  },
  // Social & Communication
  {
    name: 'Bitcoin Chat',
    repo: 'bitcoin-chat',
    org: 'bitcoin-apps-suite',
    description: 'Messaging platform with encrypted communications and micropayment tips',
    liveUrl: 'https://bitcoin-chat.vercel.app',
    color: '#ff6500',
    category: 'social',
  },
  {
    name: 'Bitcoin Social',
    repo: 'bitcoin-social',
    org: 'bitcoin-apps-suite',
    description: 'Social media platform with micropayment tips and content monetization',
    liveUrl: 'https://bitcoin-social.vercel.app',
    color: '#f43f5e',
    category: 'social',
  },
  {
    name: 'Bitcoin Twitter',
    repo: 'bitcoin-twitter',
    org: 'bitcoin-apps-suite',
    description: 'Microblogging platform with tweet monetization and blockchain verification',
    color: '#1d9bf0',
    category: 'social',
  },
  {
    name: 'Bitcoin Education',
    repo: 'bitcoin-education',
    org: 'bitcoin-apps-suite',
    description: 'Educational platform with blockchain courses and certification tracking',
    liveUrl: 'https://bitcoin-education-psi.vercel.app',
    color: '#0ea5e9',
    category: 'social',
  },
  {
    name: 'Bitcoin Maps',
    repo: 'bitcoin-maps',
    org: 'bitcoin-apps-suite',
    description: 'Mapping platform with location-based payments and geospatial smart contracts',
    liveUrl: 'https://bitcoin-maps.vercel.app',
    color: '#f59e0b',
    category: 'social',
  },
  // Developer & Infrastructure
  {
    name: 'Bitcoin Code',
    repo: 'bitcoin-code',
    org: 'bitcoin-apps-suite',
    description: 'Development environment with smart contract tools and collaborative coding',
    liveUrl: 'https://bitcoin-code.vercel.app',
    color: '#0ea5e9',
    category: 'developer',
  },
  {
    name: 'Bitcoin Search',
    repo: 'bitcoin-search',
    org: 'bitcoin-apps-suite',
    description: 'Search engine with decentralized indexing and blockchain-verified results',
    liveUrl: 'https://bitcoin-search.vercel.app',
    color: '#6b7280',
    category: 'developer',
  },
  {
    name: 'Bitcoin DNS',
    repo: 'bitcoin_dns',
    org: 'bitcoin-apps-suite',
    description: 'DNS resolution with blockchain domain registration and decentralized naming',
    liveUrl: 'https://bitcoin-dns.vercel.app',
    color: '#eab308',
    category: 'developer',
  },
  {
    name: 'Bitcoin Browser',
    repo: 'bitcoin-browser',
    org: 'bitcoin-apps-suite',
    description: 'Web browser with integrated wallet, dApp support, and blockchain identity',
    color: '#4D82E8',
    category: 'developer',
  },
  {
    name: 'Bitcoin Identity',
    repo: 'bitcoin-identity',
    org: 'bitcoin-apps-suite',
    description: 'Identity management and authentication on the Bitcoin blockchain',
    liveUrl: 'https://bitcoin-identity.vercel.app',
    color: '#7c3aed',
    category: 'developer',
  },
  {
    name: 'Bitcoin AI',
    repo: 'bitcoin-ai',
    org: 'bitcoin-apps-suite',
    description: 'AI tools and services powered by Bitcoin micropayments',
    color: '#06b6d4',
    category: 'developer',
  },
  {
    name: 'Bitcoin App',
    repo: 'bitcoin-app',
    org: 'bitcoin-apps-suite',
    description: 'Application development platform with smart contract integration and dApp deployment',
    color: '#f97316',
    category: 'developer',
  },
  {
    name: 'Metanet Desktop',
    repo: 'metanet-desktop',
    org: 'bitcoin-apps-suite',
    description: 'Native desktop client for the Bitcoin Metanet with Tauri framework',
    color: '#7c3aed',
    category: 'developer',
  },
  // Infrastructure Libraries
  {
    name: 'js-1sat-ord',
    repo: 'js-1sat-ord',
    org: 'bitcoin-apps-suite',
    description: '1Sat Ordinals JavaScript library for inscription and token operations',
    color: '#f7931a',
    category: 'infrastructure',
  },
  {
    name: 'Bitcoin Git',
    repo: 'bitcoin-git',
    org: 'bitcoin-apps-suite',
    description: 'Git source code and tools for Bitcoin version control',
    color: '#f05032',
    category: 'infrastructure',
  },
  {
    name: 'BitGit (npm: bitgit)',
    repo: 'bgit',
    org: 'bitcoin-apps-suite',
    description: 'git push for Bitcoin — inscribe content, register domains, manage tokens on BSV. Install via npm: npm i -g bitgit',
    liveUrl: 'https://www.npmjs.com/package/bitgit',
    color: '#f05032',
    category: 'infrastructure',
  },
  {
    name: 'go-wallet-toolbox',
    repo: 'go-wallet-toolbox',
    org: 'bitcoin-apps-suite',
    description: 'Tools for building BRC-100 compliant wallets in Go',
    color: '#00ADD8',
    category: 'infrastructure',
  },
  {
    name: 'go-bt',
    repo: 'go-bt',
    org: 'bitcoin-apps-suite',
    description: 'The go-to Bitcoin Transaction (BT) Go library',
    color: '#00ADD8',
    category: 'infrastructure',
  },
  {
    name: 'go-bc',
    repo: 'go-bc',
    org: 'bitcoin-apps-suite',
    description: 'The go-to Bitcoin Block Chain (BC) Go library',
    color: '#00ADD8',
    category: 'infrastructure',
  },
  {
    name: 'go-p2p',
    repo: 'go-p2p',
    org: 'bitcoin-apps-suite',
    description: 'Bitcoin P2P networking library in Go',
    color: '#00ADD8',
    category: 'infrastructure',
  },
  {
    name: 'go-wire',
    repo: 'go-wire',
    org: 'bitcoin-apps-suite',
    description: 'BSV Blockchain Wire Protocol implementation',
    color: '#00ADD8',
    category: 'infrastructure',
  },
  {
    name: 'go-tx-map',
    repo: 'go-tx-map',
    org: 'bitcoin-apps-suite',
    description: 'High-performance concurrent-safe Go data structures for transaction mapping',
    color: '#00ADD8',
    category: 'infrastructure',
  },
  {
    name: 'go-batcher',
    repo: 'go-batcher',
    org: 'bitcoin-apps-suite',
    description: 'High-performance batch processing for Go applications',
    color: '#00ADD8',
    category: 'infrastructure',
  },
  {
    name: 'Teranode',
    repo: 'teranose',
    org: 'bitcoin-apps-suite',
    description: 'BSV Blockchain Teranode - next generation Bitcoin node software',
    color: '#f7931a',
    category: 'infrastructure',
  },
  {
    name: 'Block Headers Service',
    repo: 'block-headers-service',
    org: 'bitcoin-apps-suite',
    description: 'Headers-only Bitcoin peer with private web API for Merkle root validation',
    color: '#f7931a',
    category: 'infrastructure',
  },
]

const categories = [
  { id: 'all', label: 'All', count: allApps.length },
  { id: 'os', label: 'Operating System', count: allApps.filter(a => a.category === 'os').length },
  { id: 'productivity', label: 'Productivity', count: allApps.filter(a => a.category === 'productivity').length },
  { id: 'media', label: 'Media & Creative', count: allApps.filter(a => a.category === 'media').length },
  { id: 'finance', label: 'Finance', count: allApps.filter(a => a.category === 'finance').length },
  { id: 'social', label: 'Social', count: allApps.filter(a => a.category === 'social').length },
  { id: 'developer', label: 'Developer', count: allApps.filter(a => a.category === 'developer').length },
  { id: 'infrastructure', label: 'Infrastructure', count: allApps.filter(a => a.category === 'infrastructure').length },
]

export default function DownloadPage() {
  const [copied, setCopied] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const copyCommand = (command: string, id: string) => {
    navigator.clipboard.writeText(command)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const filtered = allApps.filter(app => {
    const matchesSearch = search === '' ||
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'all' || app.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="h-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-y-auto">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
            Downloads
          </h1>
          <p className="text-lg opacity-80">
            {allApps.length} open source Bitcoin apps available for download
          </p>
          <p className="text-sm opacity-50 mt-1">
            By THE BITCOIN CORPORATION LTD
          </p>
        </div>

        {/* Bitcoin OS Featured Downloads */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {/* Chrome Extension */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-yellow-500/30 transition-all">
            <div className="flex items-center mb-4">
              <Chrome className="w-10 h-10 mr-3 text-yellow-400" />
              <div>
                <h2 className="text-2xl font-bold">Chrome Extension</h2>
                <p className="text-xs opacity-60">Bitcoin OS in your browser</p>
              </div>
            </div>
            <div className="space-y-2 mb-4 text-sm opacity-80">
              <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400 shrink-0" />One-click access to all Bitcoin apps</div>
              <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400 shrink-0" />Quick wallet access from any tab</div>
            </div>
            <a
              href="https://github.com/bitcoin-corp/bitcoin-OS/releases/latest/download/bitcoin-os-chrome-v0.1.1.zip"
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-2.5 px-5 rounded-lg flex items-center justify-center transition-all text-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Chrome Extension
            </a>
            <div className="text-xs opacity-50 text-center mt-2">v0.1.0 &middot; Manifest V3</div>
          </div>

          {/* macOS App */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all">
            <div className="flex items-center mb-4">
              <Monitor className="w-10 h-10 mr-3 text-blue-400" />
              <div>
                <h2 className="text-2xl font-bold">macOS App</h2>
                <p className="text-xs opacity-60">Native desktop experience</p>
              </div>
            </div>
            <div className="space-y-2 mb-4 text-sm opacity-80">
              <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400 shrink-0" />Native macOS with dock support</div>
              <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400 shrink-0" />Full Bitcoin OS experience</div>
            </div>
            <a
              href="https://github.com/bitcoin-corp/bitcoin-OS/releases/latest/download/Bitcoin.OS-0.1.0-arm64.dmg"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2.5 px-5 rounded-lg flex items-center justify-center transition-all text-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Download for macOS
            </a>
            <div className="text-xs opacity-50 text-center mt-2">v0.1.0 &middot; 88 MB &middot; Apple Silicon</div>
          </div>
        </div>

        {/* Path Protocol Stack - Core of Bitcoin OS */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold">The Protocol Stack</h2>
            <p className="text-xs opacity-50 mt-1">Path 401, 402 and 403 are at the heart of Bitcoin OS</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Path 402 Client */}
            <div className="bg-green-500/5 rounded-xl p-4 border border-green-500/20 hover:border-green-500/40 transition-all">
              <div className="text-green-400 font-bold text-lg mb-1">$402</div>
              <div className="text-xs font-semibold mb-1">Path402 Client</div>
              <p className="text-[10px] opacity-50 mb-3 leading-relaxed">Payment Required protocol — content and commodity tokens via BSV-21 PoW20</p>
              <div className="flex flex-col gap-1.5">
                <a href="https://github.com/b0ase/path402/archive/refs/heads/main.zip" className="bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 text-[10px] py-1.5 px-2 rounded-lg flex items-center justify-center transition-all">
                  <Download className="w-3 h-3 mr-1" />Download Client
                </a>
                <a href="https://github.com/b0ase/path402" target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] py-1.5 px-2 rounded-lg flex items-center justify-center transition-all opacity-60 hover:opacity-100">
                  <Github className="w-3 h-3 mr-1" />Source
                </a>
              </div>
            </div>
            {/* Path 402 Web */}
            <div className="bg-green-500/5 rounded-xl p-4 border border-green-500/20 hover:border-green-500/40 transition-all">
              <div className="text-green-400 font-bold text-lg mb-1">$402</div>
              <div className="text-xs font-semibold mb-1">Path402 Web Client</div>
              <p className="text-[10px] opacity-50 mb-3 leading-relaxed">Web interface for the $402 protocol — browse and interact via your browser</p>
              <div className="flex flex-col gap-1.5">
                <a href="https://path402-com.vercel.app" target="_blank" rel="noopener noreferrer" className="bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 text-[10px] py-1.5 px-2 rounded-lg flex items-center justify-center transition-all">
                  <ExternalLink className="w-3 h-3 mr-1" />Live App
                </a>
                <a href="https://github.com/b0ase/path402-com" target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] py-1.5 px-2 rounded-lg flex items-center justify-center transition-all opacity-60 hover:opacity-100">
                  <Github className="w-3 h-3 mr-1" />Source
                </a>
              </div>
            </div>
            {/* Path 401 */}
            <div className="bg-blue-500/5 rounded-xl p-4 border border-blue-500/20 hover:border-blue-500/40 transition-all">
              <div className="text-blue-400 font-bold text-lg mb-1">$401</div>
              <div className="text-xs font-semibold mb-1">Path401 Identity</div>
              <p className="text-[10px] opacity-50 mb-3 leading-relaxed">Unauthorized protocol — self-sovereign identity on the blockchain with on-chain inscriptions</p>
              <div className="flex flex-col gap-1.5">
                <a href="https://path401-com.vercel.app" target="_blank" rel="noopener noreferrer" className="bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 text-[10px] py-1.5 px-2 rounded-lg flex items-center justify-center transition-all">
                  <ExternalLink className="w-3 h-3 mr-1" />Live App
                </a>
                <a href="https://github.com/b0ase/path401-com" target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] py-1.5 px-2 rounded-lg flex items-center justify-center transition-all opacity-60 hover:opacity-100">
                  <Github className="w-3 h-3 mr-1" />Source
                </a>
              </div>
            </div>
            {/* Path 403 */}
            <div className="bg-red-500/5 rounded-xl p-4 border border-red-500/20 hover:border-red-500/40 transition-all">
              <div className="text-red-400 font-bold text-lg mb-1">$403</div>
              <div className="text-xs font-semibold mb-1">Path403 Securities</div>
              <p className="text-[10px] opacity-50 mb-3 leading-relaxed">Forbidden protocol — securities and access tokens requiring $401 KYC verification</p>
              <div className="flex flex-col gap-1.5">
                <a href="https://path403.vercel.app" target="_blank" rel="noopener noreferrer" className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-[10px] py-1.5 px-2 rounded-lg flex items-center justify-center transition-all">
                  <ExternalLink className="w-3 h-3 mr-1" />Live App
                </a>
                <a href="https://github.com/b0ase/path403" target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] py-1.5 px-2 rounded-lg flex items-center justify-center transition-all opacity-60 hover:opacity-100">
                  <Github className="w-3 h-3 mr-1" />Source
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BitGit Recommendation Banner */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 rounded-xl p-5 border border-orange-500/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
                <GitBranch className="w-6 h-6 text-orange-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm mb-1">
                  Recommended: Install BitGit before working on these packages
                </h3>
                <p className="text-xs opacity-60 leading-relaxed">
                  BitGit is <code className="bg-white/10 px-1.5 py-0.5 rounded">git push</code> for Bitcoin.
                  Inscribe content, register domains, and manage tokens on BSV directly from your terminal.
                  Every app in this suite is designed to work with BitGit for on-chain publishing.
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <button
                    onClick={() => copyCommand('npm i -g bitgit', 'bitgit-install')}
                    className="bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 text-orange-300 text-xs py-1.5 px-3 rounded-lg font-mono transition-all"
                  >
                    npm i -g bitgit {copied === 'bitgit-install' ? '  Copied!' : ''}
                  </button>
                  <a
                    href="https://b0ase.com/blog/bitgit-git-push-for-bitcoin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-orange-400 hover:text-orange-300 transition-all flex items-center gap-1"
                  >
                    Read the guide <ArrowRight className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.npmjs.com/package/bitgit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs opacity-50 hover:opacity-80 transition-all flex items-center gap-1"
                  >
                    <Package className="w-3 h-3" /> npmjs.com/package/bitgit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="max-w-5xl mx-auto mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
              <input
                type="text"
                placeholder="Search apps..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-orange-500/50"
              />
            </div>
            <div className="text-sm opacity-60">{filtered.length} apps</div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Apps Grid */}
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(app => (
            <div
              key={app.repo}
              className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ backgroundColor: app.color + '20', borderColor: app.color + '40', borderWidth: 1 }}
                  >
                    <span style={{ color: app.color }}>
                      {app.name.replace('Bitcoin ', '').charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{app.name}</h3>
                    <span className="text-[10px] uppercase tracking-wider opacity-40">
                      {app.category === 'infrastructure' ? 'infra' : app.category}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs opacity-60 mb-4 line-clamp-2 leading-relaxed">
                {app.description}
              </p>

              <div className="flex flex-col gap-2">
                {/* Clone command */}
                <button
                  onClick={() => copyCommand(`git clone https://github.com/${app.org}/${app.repo}.git`, app.repo)}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs py-2 px-3 rounded-lg flex items-center justify-between transition-all font-mono"
                >
                  <span className="truncate opacity-70">git clone .../{app.repo}.git</span>
                  <span className="text-[10px] ml-2 shrink-0 opacity-50">
                    {copied === app.repo ? 'Copied!' : 'Copy'}
                  </span>
                </button>

                <div className="flex gap-2">
                  {/* Download ZIP */}
                  <a
                    href={`https://github.com/${app.org}/${app.repo}/archive/refs/heads/main.zip`}
                    className="flex-1 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 text-orange-400 text-xs py-2 px-3 rounded-lg flex items-center justify-center transition-all"
                  >
                    <Download className="w-3 h-3 mr-1.5" />
                    ZIP
                  </a>

                  {/* GitHub */}
                  <a
                    href={`https://github.com/${app.org}/${app.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-xs py-2 px-3 rounded-lg flex items-center justify-center transition-all opacity-70 hover:opacity-100"
                  >
                    <Github className="w-3 h-3 mr-1.5" />
                    Source
                  </a>

                  {/* Live Demo */}
                  {app.liveUrl && (
                    <a
                      href={app.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 text-xs py-2 px-3 rounded-lg flex items-center justify-center transition-all"
                    >
                      <ExternalLink className="w-3 h-3 mr-1.5" />
                      Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 opacity-40">
            <Package className="w-12 h-12 mx-auto mb-3" />
            <p>No apps match your search</p>
          </div>
        )}

        {/* Quick Install & GitHub Links */}
        <div className="max-w-5xl mx-auto mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Code className="w-5 h-5 text-green-400" />
              Quick Install via Terminal
            </h3>
            <div className="bg-black/30 rounded-lg p-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <code className="text-green-400">curl -L https://bitcoin-os.website/install.sh | bash</code>
                <button
                  onClick={() => copyCommand('curl -L https://bitcoin-os.website/install.sh | bash', 'install')}
                  className="ml-3 px-2 py-1 bg-white/10 rounded text-[10px] hover:bg-white/20 transition-all shrink-0"
                >
                  {copied === 'install' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-purple-400" />
              GitHub Organizations
            </h3>
            <div className="space-y-2">
              <a
                href="https://github.com/bitcoin-apps-suite"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-black/20 rounded-lg px-4 py-2.5 hover:bg-white/5 transition-all text-sm"
              >
                <span>bitcoin-apps-suite</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </a>
              <a
                href="https://github.com/bitcoin-corp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-black/20 rounded-lg px-4 py-2.5 hover:bg-white/5 transition-all text-sm"
              >
                <span>bitcoin-corp</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 opacity-40 text-xs">
          <p>All apps are open source under the Open-BSV-4.0 license</p>
          <p className="mt-1">THE BITCOIN CORPORATION LTD (UK Company No. 16735102)</p>
        </div>
      </div>
    </div>
  )
}