'use client'

import { X, GitBranch, Hammer, Sparkles } from 'lucide-react'

interface PlaceholderWindowProps {
  appName: string
  onClose: () => void
}

const getAppInfo = (appName: string) => {
  const apps: Record<string, { repoName: string; description: string; ideas: string[] }> = {
    'Bitcoin Shares': {
      repoName: 'bitcoin-shares',
      description: 'A decentralized equity management system powered by Bitcoin',
      ideas: [
        'Issue and trade company shares on the blockchain',
        'Smart contracts for dividend distribution',
        'Transparent cap table management',
        'Automated compliance and reporting'
      ]
    },
    'Bitcoin Jobs': {
      repoName: 'bitcoin-jobs',
      description: 'A global job marketplace with Bitcoin payments',
      ideas: [
        'Post jobs and get paid in Bitcoin',
        'Escrow system for secure freelancing',
        'Skill verification on blockchain',
        'Decentralized reputation system'
      ]
    },
    'Browser': {
      repoName: 'bitcoin-browser',
      description: 'A privacy-focused browser with Bitcoin integration',
      ideas: [
        'Built-in Bitcoin wallet',
        'Pay-per-article micropayments',
        'Decentralized bookmarks and history',
        'Bitcoin-powered ad blocking rewards'
      ]
    },
    'Terminal': {
      repoName: 'bitcoin-terminal',
      description: 'A powerful terminal with Bitcoin development tools',
      ideas: [
        'BSV SDK integration',
        'Transaction builder and broadcaster',
        'Smart contract debugging tools',
        'Blockchain explorer CLI'
      ]
    },
    'Settings': {
      repoName: 'bitcoin-settings',
      description: 'System preferences for your Bitcoin OS',
      ideas: [
        'Wallet configuration',
        'Network settings',
        'Privacy controls',
        'Theme customization'
      ]
    }
  }

  return apps[appName] || { 
    repoName: appName.toLowerCase().replace(' ', '-'), 
    description: 'An exciting new Bitcoin application',
    ideas: ['Build something amazing!']
  }
}

export default function PlaceholderWindow({ appName, onClose }: PlaceholderWindowProps) {
  const appInfo = getAppInfo(appName)
  const repoUrl = `https://github.com/bitcoin-apps-suite/${appInfo.repoName}`

  const funnyMessages = [
    "Oops! This app is still in the blockchain...",
    "404: App not found. But your opportunity to build it is!",
    "This app is currently mining for developers...",
    "Under construction by Satoshi's ghost...",
    "This feature is HODLing for the right developer...",
    "Loading... Just kidding, it needs to be built!",
    "Error: Too few developers. Add more to continue.",
    "This app is in stealth mode (aka not built yet)..."
  ]

  const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)]

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] bg-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden z-50">
      <div className="bg-gradient-to-r from-bitcoin-orange to-amber-500 text-white px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span className="font-semibold">{appName} - Coming Soon!</span>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-white/20 rounded p-1 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-bitcoin-orange">{randomMessage}</h2>
          <p className="text-gray-400">{appInfo.description}</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Hammer className="w-5 h-5 text-bitcoin-orange" />
            What could this app do?
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            {appInfo.ideas.map((idea, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-bitcoin-orange mt-1">•</span>
                <span>{idea}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-r from-purple-900/20 to-bitcoin-orange/20 rounded-lg p-4 border border-bitcoin-orange/30">
          <p className="text-center text-sm mb-3">
            Want to build this? You're exactly who we're looking for!
          </p>
          <div className="flex justify-center gap-3">
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-bitcoin-orange hover:bg-bitcoin-orange/80 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <GitBranch className="w-4 h-4" />
              View on GitHub
            </a>
            <a
              href={`${repoUrl}/blob/main/README.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Read the Spec
            </a>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500">
          Join the Bitcoin revolution • Build the future of money • The Bitcoin Corporation LTD
        </div>
      </div>
    </div>
  )
}