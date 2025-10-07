#!/bin/bash

# Deploy Minimal Dock to All Bitcoin Apps
# This script adds the minimal dock component to Bitcoin apps

set -e

echo "🚀 Deploying Minimal Dock to Bitcoin Apps..."

# List of Bitcoin apps to update (excluding the ones we've already done)
APPS=(
    "bitcoin-calendar"
    "bitcoin-exchange" 
    "bitcoin-search"
    "bitcoin-video"
    "bitcoin-photos"
    "bitcoin-maps"
    "bitcoin-chat"
    "bitcoin-social"
    "bitcoin-gaming"
    "bitcoin-books"
    "bitcoin-dns"
    "bitcoin-3d"
    "bitcoin-jobs"
)

# Function to create MinimalDock.tsx with the correct current app
create_minimal_dock() {
    local app_name="$1"
    local app_display_name="$2"
    local target_dir="$3"
    
    cat > "${target_dir}/MinimalDock.tsx" << 'EOF'
import React, { useState, useEffect } from 'react';
import { Store, FileText, Clock, Wifi, Battery, Wallet, Mail, Music, HardDrive, Calendar, Search, Table, Share2, Briefcase, TrendingUp, Building2, Shield, Video, Code2, Camera, MapPin, MessageCircle, Users, Gamepad2, BookOpen, Globe, Box } from 'lucide-react';
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
      '#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00', '#00ff80',
      '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff', '#ff0080'
    ];
    return rainbowColors[index % rainbowColors.length];
  };

  const getIconColor = (colorClass: string, index: number = 0): string => {
    if (colorClass === 'rainbow') {
      return getRainbowColor(index);
    }
    
    const colorMap: { [key: string]: string } = {
      'text-orange-500': '#f97316', 'text-bitcoin-orange': '#f7931a',
      'text-yellow-500': '#eab308', 'text-red-500': '#ef4444',
      'text-purple-500': '#a855f7', 'text-fuchsia-500': '#d946ef',
      'text-pink-500': '#ec4899', 'text-green-500': '#22c55e',
      'text-blue-500': '#3b82f6', 'text-gray-500': '#6b7280',
      'text-sky-400': '#38bdf8', 'text-cyan-500': '#06b6d4',
      'text-cyan-400': '#22d3ee', 'text-emerald-500': '#10b981',
      'text-blue-600': '#2563eb'
    };
    return colorMap[colorClass] || '#ffffff';
  };

  const dockApps: DockApp[] = [
    { id: 'bapps-store', name: 'Bitcoin Apps Store', icon: Store, color: 'rainbow', url: 'https://www.bitcoinapps.store/', isImage: true },
    { name: 'Bitcoin Wallet', icon: Wallet, color: 'rainbow', url: 'https://bitcoin-wallet-sable.vercel.app' },
    { name: 'Bitcoin Email', icon: Mail, color: 'rainbow', url: 'https://bitcoin-email.vercel.app' },
    { name: 'Bitcoin Music', icon: Music, color: 'rainbow', url: 'https://bitcoin-music.vercel.app' },
    { name: 'Bitcoin Writer', icon: FileText, color: 'rainbow', url: 'https://bitcoin-writer.vercel.app' },
    { name: 'Bitcoin Code', icon: Code2, color: 'rainbow', url: 'https://bitcoin-code.vercel.app' },
    { name: 'Bitcoin Drive', icon: HardDrive, color: 'rainbow', url: 'https://bitcoin-drive.vercel.app' },
    { name: 'Bitcoin Calendar', icon: Calendar, color: 'rainbow', url: 'https://bitcoin-calendar.vercel.app', current: APP_NAME === 'bitcoin-calendar' },
    { name: 'Bitcoin Exchange', icon: TrendingUp, color: 'rainbow', url: 'https://bitcoin-exchange-iota.vercel.app', current: APP_NAME === 'bitcoin-exchange' },
    { name: 'Bitcoin Search', icon: Search, color: 'rainbow', url: 'https://bitcoin-search.vercel.app', current: APP_NAME === 'bitcoin-search' },
    { name: 'Bitcoin Spreadsheet', icon: Table, color: 'rainbow', url: 'https://bitcoin-spreadsheet.vercel.app' },
    { name: 'Bitcoin Video', icon: Video, color: 'rainbow', url: 'https://bitcoin-video-nine.vercel.app', current: APP_NAME === 'bitcoin-video' },
    { name: 'Bitcoin Photos', icon: Camera, color: 'rainbow', url: 'https://bitcoin-photos.vercel.app', current: APP_NAME === 'bitcoin-photos' },
    { name: 'Bitcoin Maps', icon: MapPin, color: 'rainbow', url: 'https://bitcoin-maps.vercel.app', current: APP_NAME === 'bitcoin-maps' },
    { name: 'Bitcoin Chat', icon: MessageCircle, color: 'rainbow', url: 'https://bitcoin-chat.vercel.app', current: APP_NAME === 'bitcoin-chat' },
    { name: 'Bitcoin Social', icon: Users, color: 'rainbow', url: 'https://bitcoin-social.vercel.app', current: APP_NAME === 'bitcoin-social' },
    { name: 'Bitcoin Games', icon: Gamepad2, color: 'rainbow', url: 'https://bitcoin-gaming.vercel.app', current: APP_NAME === 'bitcoin-gaming' },
    { name: 'Bitcoin Books', icon: BookOpen, color: 'rainbow', url: 'https://bitcoin-books-bay.vercel.app', current: APP_NAME === 'bitcoin-books' },
    { name: 'Bitcoin Domains', icon: Globe, color: 'rainbow', url: 'https://bitcoin-dns.vercel.app', current: APP_NAME === 'bitcoin-dns' },
    { name: 'Bitcoin 3D', icon: Box, color: 'text-pink-500', url: 'https://bitcoin-3d.vercel.app', current: APP_NAME === 'bitcoin-3d' },
    { name: 'Bitcoin Jobs', icon: Briefcase, color: 'rainbow', url: 'https://bitcoin-jobs.vercel.app/', current: APP_NAME === 'bitcoin-jobs' },
  ];

  const handleAppClick = (app: DockApp) => {
    if (!app.disabled && app.url && !app.current) {
      window.location.href = app.url;
    }
  };

  return (
    <div className="minimal-dock">
      <div className="minimal-dock-container">
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
        
        <div className="minimal-dock-status">
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
EOF

    # Replace APP_NAME placeholder with actual app name
    sed -i '' "s/APP_NAME === '[^']*'/APP_NAME === '${app_name}'/g" "${target_dir}/MinimalDock.tsx"
}

# Function to copy CSS file
copy_css() {
    local target_dir="$1"
    
    cp "/Users/b0ase/Projects/bitcoin-OS/apps/bitcoin-writer/src/components/MinimalDock.css" "${target_dir}/MinimalDock.css"
}

# Process each app
for app in "${APPS[@]}"; do
    echo "📦 Processing $app..."
    
    app_path="/Users/b0ase/Projects/bitcoin-OS/apps/$app"
    
    if [ ! -d "$app_path" ]; then
        echo "⚠️  $app directory not found, skipping..."
        continue
    fi
    
    # Find components directory
    components_dir=""
    if [ -d "$app_path/components" ]; then
        components_dir="$app_path/components"
    elif [ -d "$app_path/src/components" ]; then
        components_dir="$app_path/src/components"
    else
        echo "⚠️  No components directory found in $app, skipping..."
        continue
    fi
    
    echo "   Adding MinimalDock components to $components_dir"
    
    # Create the components
    create_minimal_dock "$app" "$(echo $app | sed 's/-/ /g' | sed 's/\b\w/\U&/g')" "$components_dir"
    copy_css "$components_dir"
    
    echo "✅ $app updated successfully"
done

echo ""
echo "🎉 Minimal dock deployment completed!"
echo "📝 Next steps:"
echo "   1. Manually integrate dock into each app's layout/wrapper"
echo "   2. Test each app to ensure proper integration"
echo "   3. Commit changes to each repository"