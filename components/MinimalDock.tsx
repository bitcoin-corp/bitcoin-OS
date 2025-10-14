import React, { useState, useEffect } from 'react';
import { Wallet, Mail, Music, FileText, HardDrive, Calendar, Search, Table, Share2, Briefcase, Store, Wifi, Battery, Clock, TrendingUp, Building2, Shield, Video, Code2, Camera, MapPin, MessageCircle, Users, Gamepad2, BookOpen, Globe, Box, Monitor, GraduationCap, Paintbrush, UserCheck, Maximize2, Home } from 'lucide-react';
import './MinimalDock.css';

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

const MinimalDock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
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
    { id: 'bitcoin-os', name: 'Bitcoin OS', icon: Monitor, color: 'rainbow', current: true },
    { id: 'bapps-store', name: 'Bitcoin Apps Store', icon: Store, color: 'rainbow', url: 'https://www.bitcoinapps.store/', isImage: true },
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
    { name: 'Bitcoin 3D', icon: Box, color: 'rainbow', url: 'https://bitcoin-3d.vercel.app' },
    { name: 'Bitcoin Jobs', icon: Briefcase, color: 'rainbow', url: 'https://bitcoin-jobs.vercel.app/' },
    { name: 'Bitcoin Education', icon: GraduationCap, color: 'rainbow', url: 'https://bitcoin-education-theta.vercel.app' },
    { name: 'Bitcoin Paint', icon: Paintbrush, color: 'rainbow', url: 'https://bitcoin-paint.vercel.app/' },
    { name: 'Bitcoin Identity', icon: UserCheck, color: 'rainbow', url: 'https://bitcoin-identity.vercel.app/' },
  ];

  const handleAppClick = (app: DockApp) => {
    if (!app.disabled && app.url && !app.current) {
      window.location.href = app.url;
    }
  };

  const toggleDockSize = () => {
    const newDockStyle = 'large';
    localStorage.setItem('dockStyle', newDockStyle);
    window.dispatchEvent(new CustomEvent('dockStyleChanged', { detail: newDockStyle }));
  };

  return (
    <div className="minimal-dock">
      <div className="minimal-dock-container">
        {/* All apps on the left */}
        <div className="minimal-dock-apps">
          {dockApps.map((app, index) => {
            const Icon = app.icon;
            return (
              <button
                key={app.name}
                className={`minimal-dock-app ${app.current ? 'active' : ''} ${app.disabled ? 'disabled' : ''}`}
                onClick={() => handleAppClick(app)}
                title={app.name}
                disabled={app.disabled}
              >
                {app.id === 'bapps-store' ? (
                  <img src="/bapps-icon.jpg" alt="BAPPS" className="minimal-dock-icon-image" />
                ) : (
                  <Icon className="minimal-dock-icon" style={{ color: getIconColor(app.color, index) }} />
                )}
                {app.current && <span className="minimal-dock-indicator" />}
              </button>
            );
          })}
        </div>
        
        {/* Status on the right */}
        <div className="minimal-dock-status">
          <div className="minimal-status-item" title="Switch to Large Dock" onClick={toggleDockSize} style={{ cursor: 'pointer' }}>
            <Maximize2 className="minimal-status-icon" style={{ color: '#6b7280' }} />
          </div>
          <div className="minimal-status-item" title="Connected">
            <Wifi className="minimal-status-icon connected" />
          </div>
          <div className="minimal-status-item" title="Battery: 100%">
            <Battery className="minimal-status-icon connected" />
          </div>
          <div className="minimal-status-time" title={mounted ? currentTime.toLocaleDateString() : ''}>
            <Clock className="minimal-status-icon" />
            <span>{mounted ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '12:00'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalDock;