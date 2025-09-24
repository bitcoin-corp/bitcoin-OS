export interface BitcoinApp {
  id: string
  name: string
  url: string
  icon?: string
  color: string
  description?: string
  chromeAppId?: string // Chrome app ID for launching Chrome apps
  isLocal?: boolean // For apps running on same domain
  isExternal?: boolean // For apps that should open in new tab
}

export const bitcoinApps: BitcoinApp[] = [
  {
    id: 'bapps-store',
    name: 'Bitcoin Apps Store',
    url: 'https://www.bitcoinapps.store/',
    color: '#ff6b35',
    description: 'Bitcoin Apps Store',
    isExternal: true
  },
  {
    id: 'bitcoin-wallet',
    name: 'Bitcoin Wallet',
    url: process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3001' 
      : 'https://bitcoin-wallet-sable.vercel.app',
    chromeAppId: 'bitcoin-wallet',
    color: '#ffd700',
    description: 'Manage your Bitcoin'
  },
  {
    id: 'bitcoin-email',
    name: 'Bitcoin Email',
    url: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3002'
      : 'https://bitcoin-email.vercel.app',
    chromeAppId: 'bitcoin-email',
    color: '#ef4444',
    description: 'Email with Bitcoin integration'
  },
  {
    id: 'bitcoin-music',
    name: 'Bitcoin Music',
    url: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3003'
      : 'https://bitcoin-music.vercel.app',
    chromeAppId: 'bitcoin-music',
    color: '#8b5cf6',
    description: 'Stream and support artists with Bitcoin'
  },
  {
    id: 'bitcoin-writer',
    name: 'Bitcoin Writer',
    url: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3004'
      : 'https://bitcoin-writer.vercel.app',
    chromeAppId: 'bitcoin-writer',
    color: '#ff9500',
    description: 'Write and publish with Bitcoin'
  },
  {
    id: 'bitcoin-drive',
    name: 'Bitcoin Drive',
    url: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3005'
      : 'https://bitcoin-drive.vercel.app',
    chromeAppId: 'bitcoin-drive',
    color: '#22c55e',
    description: 'Decentralized file storage'
  },
  {
    id: 'bitcoin-jobs',
    name: 'Bitcoin Jobs',
    url: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3006'
      : 'https://bitcoin-jobs.vercel.app',
    chromeAppId: 'bitcoin-jobs',
    color: '#40e0d0',
    description: 'Find jobs in the Bitcoin ecosystem'
  },
  {
    id: 'bitcoin-exchange',
    name: 'Bitcoin Exchange',
    url: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3007'
      : 'https://bitcoin-exchange.vercel.app',
    chromeAppId: 'bitcoin-exchange',
    color: '#10b981',
    description: 'Trade Bitcoin and other assets'
  }
]

// Get app by ID
export const getAppById = (id: string): BitcoinApp | undefined => {
  return bitcoinApps.find(app => app.id === id)
}

// Get app by name
export const getAppByName = (name: string): BitcoinApp | undefined => {
  return bitcoinApps.find(app => app.name === name)
}