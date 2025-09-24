import { 
  Wallet, 
  Mail, 
  Music, 
  FileText, 
  HardDrive, 
  Globe, 
  Terminal, 
  Settings, 
  Calendar, 
  Search, 
  LineChart, 
  Briefcase, 
  Table, 
  Share2,
  DollarSign,
  Store
} from 'lucide-react'

export const appIcons = {
  'bitcoin-wallet': { icon: Wallet, color: '#ffd700' }, // Gold yellow from wallet app
  'bitcoin-email': { icon: Mail, color: '#ef4444' },
  'bitcoin-music': { icon: Music, color: '#8b5cf6' },
  'bitcoin-writer': { icon: FileText, color: '#ff9500' }, // Warm orange from writer app
  'bitcoin-drive': { icon: HardDrive, color: '#22c55e' },
  'bitcoin-jobs': { icon: Briefcase, color: '#40e0d0' }, // Turquoise
  'bitcoin-exchange': { icon: DollarSign, color: '#10b981' },
  'bitcoin-calendar': { icon: Calendar, color: '#eab308' },
  'bitcoin-search': { icon: Search, color: '#ec4899' },
  'bitcoin-spreadsheet': { icon: Table, color: '#10b981' },
  'bitcoin-shares': { icon: Share2, color: '#f43f5e' },
  'bapps-store': { icon: Store, color: '#ff6b35' }, // For BAPPS store
}

export const getAppIcon = (appId: string) => {
  return appIcons[appId as keyof typeof appIcons] || { icon: Globe, color: '#6b7280' }
}