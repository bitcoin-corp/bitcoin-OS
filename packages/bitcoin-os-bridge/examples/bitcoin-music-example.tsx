// Example: How to use Bitcoin OS Bridge in a new Bitcoin Music app
import React from 'react'
import { BitcoinOSProvider } from '@bitcoin-os/bridge'
import { Music, PlayCircle, Pause, SkipForward, SkipBack } from 'lucide-react'

// Your app's main content component
function MusicPlayerContent() {
  return (
    <div className="p-8 space-y-6">
      <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
        <h1 className="text-3xl font-bold text-white mb-4">
          <span className="text-purple-500">Bitcoin</span> Music
        </h1>
        <p className="text-gray-400 mb-6">
          Decentralized music streaming powered by Bitcoin OS
        </p>
        
        {/* Mock music player */}
        <div className="bg-gray-900 rounded-lg p-4 flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Music className="w-8 h-8 text-white" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-white font-semibold">Bitcoin Anthem</h3>
            <p className="text-gray-400">Satoshi & The Blocks</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <SkipBack className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-3 bg-purple-500 hover:bg-purple-600 rounded-full transition-colors">
              <PlayCircle className="w-6 h-6 text-white" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <SkipForward className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Trending</h2>
          <div className="space-y-3">
            {['Blockchain Blues', 'Crypto Swing', 'Digital Dreams'].map((song) => (
              <div key={song} className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer">
                <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
                  <Music className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300">{song}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Playlists</h2>
          <div className="space-y-3">
            {['Bitcoin Hits', 'Satoshi\'s Favorites', 'Hodl Vibes'].map((playlist) => (
              <div key={playlist} className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer">
                <div className="w-8 h-8 bg-pink-500 rounded flex items-center justify-center">
                  <Music className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300">{playlist}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Statistics</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Songs Played</span>
              <span className="text-purple-500 font-semibold">1,337</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Artists</span>
              <span className="text-purple-500 font-semibold">42</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Hours Listened</span>
              <span className="text-purple-500 font-semibold">210</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main app component with Bitcoin OS integration
export default function BitcoinMusicApp() {
  const bitcoinOSConfig = {
    context: {
      appName: 'Bitcoin Music',
      exchangeUrl: 'https://music-exchange.vercel.app', // Music marketplace
      customMenuItems: [
        {
          label: 'Music',
          items: [
            { 
              label: 'Upload Track', 
              shortcut: '⌘U',
              action: () => console.log('Upload track')
            },
            { 
              label: 'Create Playlist', 
              shortcut: '⇧⌘P',
              action: () => console.log('Create playlist')
            },
            { divider: true },
            { 
              label: 'Music Library', 
              href: '/library' 
            },
            { 
              label: 'Search Artists', 
              href: '/artists' 
            }
          ]
        },
        {
          label: 'Player',
          items: [
            { 
              label: 'Show Equalizer', 
              action: () => console.log('Equalizer')
            },
            { 
              label: 'Audio Settings', 
              href: '/settings/audio' 
            }
          ]
        }
      ],
      branding: {
        name: 'Bitcoin Music',
        color: '#8b5cf6'
      }
    },
    showDevSidebar: true,
    showDock: true,
    showPocBar: true,
    customStyles: `
      /* Custom purple theme for music app */
      .bitcoin-symbol { 
        color: #8b5cf6 !important; 
      }
      .dev-sidebar-title span {
        color: #8b5cf6 !important;
      }
      .menu-button.active {
        background: linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%);
      }
    `,
    onAppOpen: (appName: string) => {
      console.log('Opening Bitcoin app:', appName)
      // Custom logic for handling app opens in music context
      // Could integrate with music player state, pause current track, etc.
    }
  }

  return (
    <BitcoinOSProvider config={bitcoinOSConfig}>
      <MusicPlayerContent />
    </BitcoinOSProvider>
  )
}

/*
USAGE INSTRUCTIONS:

1. Install the bridge package:
   npm install @bitcoin-os/bridge

2. Use this component as your main app:
   <BitcoinMusicApp />

3. The app will automatically have:
   - Proof of Concept bar with "Bitcoin Music powered by Bitcoin OS"
   - Top menu bar with Bitcoin apps dropdown + custom Music/Player menus
   - Developer sidebar with music-specific exchange link
   - Dock with all Bitcoin apps + music marketplace link
   - Purple theme matching music branding
   - Local customization while maintaining global Bitcoin OS consistency

4. Benefits:
   - Global updates: Update @bitcoin-os/bridge to get latest OS features
   - Local control: Custom menus, exchange links, branding
   - Consistency: All Bitcoin apps share the same professional UI
   - Separation: Your music app code stays focused on music features
*/