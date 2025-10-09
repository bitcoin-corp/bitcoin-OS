import React, { useState, useEffect } from 'react';
import { Wallet, Mail, Music, FileText, HardDrive, Calendar, Search, Table, Briefcase, Store, Wifi, Volume2, Battery, TrendingUp, Building2, Shield, Video, Code2, Camera, MapPin, MessageCircle, Users, Gamepad2, BookOpen, Globe, Box, FolderOpen } from 'lucide-react';
import { getThemedIcon, getCurrentTheme } from '@/lib/icon-themes';
import './Dock.css';

interface DockApp {
  id?: string;
  name: string;
  icon: any;
  color: string;
  url?: string;
  disabled?: boolean;
  current?: boolean;
  isImage?: boolean;
}

const Dock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const [iconTheme, setIconTheme] = useState<string>('lucide');

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    // Set initial theme
    setIconTheme(getCurrentTheme());
    
    // Listen for theme changes
    const handleThemeChange = (event: any) => {
      setIconTheme(event.detail);
    };
    
    window.addEventListener('iconThemeChanged', handleThemeChange);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('iconThemeChanged', handleThemeChange);
    };
  }, []);

  const getRainbowColor = (index: number): string => {
    const rainbowColors = [
      '#ff0000', // Red
      '#ff8000', // Orange  
      '#ffff00', // Yellow
      '#80ff00', // Lime
      '#00ff00', // Green
      '#00ff80', // Spring Green
      '#00ffff', // Cyan
      '#0080ff', // Blue
      '#0000ff', // Deep Blue
      '#8000ff', // Purple
      '#ff00ff', // Magenta
      '#ff0080'  // Rose
    ];
    return rainbowColors[index % rainbowColors.length];
  };

  const getIconColor = (colorClass: string, index: number = 0): string => {
    if (colorClass === 'rainbow') {
      return getRainbowColor(index);
    }
    
    const colorMap: { [key: string]: string } = {
      'text-orange-500': '#f97316',
      'text-bitcoin-orange': '#f7931a',
      'text-yellow-500': '#eab308',
      'text-red-500': '#ef4444',
      'text-purple-500': '#a855f7',
      'text-fuchsia-500': '#d946ef',
      'text-pink-500': '#ec4899',
      'text-green-500': '#22c55e',
      'text-blue-500': '#3b82f6',
      'text-gray-500': '#6b7280',
      'text-sky-400': '#38bdf8',
      'text-cyan-500': '#06b6d4',
      'text-cyan-400': '#22d3ee',
      'text-emerald-500': '#10b981',
      'text-blue-600': '#2563eb'
    };
    return colorMap[colorClass] || '#ffffff';
  };

  const dockApps: DockApp[] = [
    { name: 'Home', icon: FolderOpen, color: 'text-blue-500', url: 'https://bitcoin-os.vercel.app/' },
    { name: 'Bitcoin Wallet', icon: Wallet, color: 'rainbow', url: 'https://bitcoin-wallet-sable.vercel.app' },
    { name: 'Bitcoin Email', icon: Mail, color: 'rainbow', url: 'https://bitcoin-email.vercel.app' },
    { name: 'Bitcoin Music', icon: Music, color: 'rainbow', url: 'https://bitcoin-music.vercel.app' },
    { name: 'Bitcoin Writer', icon: FileText, color: 'rainbow', url: 'https://bitcoin-writer.vercel.app' },
    { name: 'Bitcoin Code', icon: Code2, color: 'rainbow', url: 'https://bitcoin-code.vercel.app' },
    { name: 'Bitcoin Drive', icon: HardDrive, color: 'rainbow', url: 'https://bitcoin-drive.vercel.app' },
    { name: 'Bitcoin Calendar', icon: Calendar, color: 'rainbow', url: 'https://bitcoin-calendar.vercel.app' },
    { name: 'Bitcoin Exchange', icon: TrendingUp, color: 'rainbow', url: 'https://bitcoin-exchange-iota.vercel.app' },
    { name: 'Bitcoin Search', icon: Search, color: 'rainbow', url: 'https://bitcoin-search.vercel.app' },
    { name: 'Bitcoin Spreadsheet', icon: Table, color: 'rainbow', url: 'https://bitcoin-spreadsheet.vercel.app' },
    { name: 'Bitcoin Video', icon: Video, color: 'rainbow', url: 'https://bitcoin-video-nine.vercel.app' },
    { name: 'Bitcoin Photos', icon: Camera, color: 'rainbow', url: 'https://bitcoin-photos.vercel.app' },
    { name: 'Bitcoin Maps', icon: MapPin, color: 'rainbow', url: 'https://bitcoin-maps.vercel.app' },
    { name: 'Bitcoin Chat', icon: MessageCircle, color: 'rainbow', url: 'https://bitcoin-chat.vercel.app' },
    { name: 'Bitcoin Social', icon: Users, color: 'rainbow', url: 'https://bitcoin-social.vercel.app' },
    { name: 'Bitcoin Games', icon: Gamepad2, color: 'rainbow', url: 'https://bitcoin-gaming.vercel.app' },
    { name: 'Bitcoin Books', icon: BookOpen, color: 'rainbow', url: 'https://bitcoin-books-bay.vercel.app' },
    { name: 'Bitcoin Domains', icon: Globe, color: 'rainbow', url: 'https://bitcoin-dns.vercel.app' },
    { name: 'Bitcoin 3D', icon: Box, color: 'text-pink-500', url: 'https://bitcoin-3d.vercel.app' },
    { name: 'Bitcoin Jobs', icon: Briefcase, color: 'rainbow', url: 'https://bitcoin-jobs.vercel.app/' },
  ];

  const handleAppClick = (app: DockApp) => {
    if (!app.disabled && app.url && !app.current) {
      window.location.href = app.url;
    }
  };

  return (
    <div className="bitcoin-dock">
      <div className="dock-container">
        {/* App icons on the left */}
        <div className="dock-apps">
          {dockApps.map((app, index) => {
          // Get themed icon
          const Icon = app.id === 'bapps-store' ? app.icon : getThemedIcon(app.id || app.name.toLowerCase().replace('bitcoin ', ''), iconTheme);
          return (
            <button
              key={app.name}
              className={`dock-app ${app.current ? 'active' : ''} ${app.disabled ? 'disabled' : ''}`}
              onClick={() => handleAppClick(app)}
              title={app.name}
              disabled={app.disabled}
            >
              <Icon className="dock-app-icon" style={{ color: getIconColor(app.color, index) }} />
              {app.current && <span className="dock-indicator" />}
            </button>
          );
        })}
        </div>
        
        {/* Status icons on the right */}
        <div className="dock-status">
          <div className="dock-divider" />
          <button 
            className="status-button" 
            title="Bitcoin Corporation"
            onClick={() => window.location.href = 'https://bitcoin-corp.vercel.app/'}
          >
            <Building2 className="status-icon" style={{ color: '#f7931a' }} />
          </button>
          <button 
            className="status-button" 
            title="Trust"
            onClick={() => window.location.href = 'https://bitcoin-corp.vercel.app/trust'}
          >
            <Shield className="status-icon" style={{ color: '#3b82f6' }} />
          </button>
          <button 
            className="status-button" 
            title="Bitcoin Apps Store"
            onClick={() => window.open('https://www.bitcoinapps.store/', '_blank')}
          >
            <Store className="status-icon" style={{ color: '#f97316' }} />
          </button>
          <button 
            className="status-button" 
            title="CashBoard"
            onClick={() => window.open('https://www.cashboard.website/', '_blank')}
          >
            <svg className="status-icon" style={{ color: '#ffffff' }} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M15.5 9.5C14.815 8.574 13.743 8 12.5 8c-2.21 0-4 1.79-4 4s1.79 4 4 4c1.243 0 2.315-.574 3-1.5" />
            </svg>
          </button>
          <button 
            className="status-button" 
            title="Senseii"
            onClick={() => window.open('https://senseii-zeta.vercel.app/', '_blank')}
          >
            <svg className="status-icon" style={{ color: '#ef4444' }} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 5h18" />
              <path d="M6 5v14" />
              <path d="M18 5v14" />
              <path d="M3 9h18" />
            </svg>
          </button>
          <button 
            className="status-button" 
            title="Ninja Punk Girls"
            onClick={() => window.open('https://www.ninjapunkgirls.website', '_blank')}
          >
            <svg className="status-icon" style={{ color: '#ec4899' }} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              <path d="M5 3v4"/>
              <path d="M19 17v4"/>
              <path d="M3 5h4"/>
              <path d="M17 19h4"/>
            </svg>
          </button>
          <div className="status-time" title={mounted ? currentTime.toLocaleDateString() : ''}>
            <span>{mounted ? currentTime.toLocaleTimeString() : '12:00:00 AM'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dock;