import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BitcoinOSProvider } from '@bitcoin-os/bridge';
import { Music, PlayCircle, SkipForward, SkipBack } from 'lucide-react';
// Your app's main content component
function MusicPlayerContent() {
    return (_jsxs("div", { className: "p-8 space-y-6", children: [_jsxs("div", { className: "bg-black/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6", children: [_jsxs("h1", { className: "text-3xl font-bold text-white mb-4", children: [_jsx("span", { className: "text-purple-500", children: "Bitcoin" }), " Music"] }), _jsx("p", { className: "text-gray-400 mb-6", children: "Decentralized music streaming powered by Bitcoin OS" }), _jsxs("div", { className: "bg-gray-900 rounded-lg p-4 flex items-center gap-4", children: [_jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center", children: _jsx(Music, { className: "w-8 h-8 text-white" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-white font-semibold", children: "Bitcoin Anthem" }), _jsx("p", { className: "text-gray-400", children: "Satoshi & The Blocks" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { className: "p-2 hover:bg-gray-800 rounded-full transition-colors", children: _jsx(SkipBack, { className: "w-5 h-5 text-gray-400" }) }), _jsx("button", { className: "p-3 bg-purple-500 hover:bg-purple-600 rounded-full transition-colors", children: _jsx(PlayCircle, { className: "w-6 h-6 text-white" }) }), _jsx("button", { className: "p-2 hover:bg-gray-800 rounded-full transition-colors", children: _jsx(SkipForward, { className: "w-5 h-5 text-gray-400" }) })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-black/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6", children: [_jsx("h2", { className: "text-xl font-semibold text-white mb-4", children: "Trending" }), _jsx("div", { className: "space-y-3", children: ['Blockchain Blues', 'Crypto Swing', 'Digital Dreams'].map((song) => (_jsxs("div", { className: "flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer", children: [_jsx("div", { className: "w-8 h-8 bg-purple-500 rounded flex items-center justify-center", children: _jsx(Music, { className: "w-4 h-4 text-white" }) }), _jsx("span", { className: "text-gray-300", children: song })] }, song))) })] }), _jsxs("div", { className: "bg-black/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6", children: [_jsx("h2", { className: "text-xl font-semibold text-white mb-4", children: "Playlists" }), _jsx("div", { className: "space-y-3", children: ['Bitcoin Hits', 'Satoshi\'s Favorites', 'Hodl Vibes'].map((playlist) => (_jsxs("div", { className: "flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer", children: [_jsx("div", { className: "w-8 h-8 bg-pink-500 rounded flex items-center justify-center", children: _jsx(Music, { className: "w-4 h-4 text-white" }) }), _jsx("span", { className: "text-gray-300", children: playlist })] }, playlist))) })] }), _jsxs("div", { className: "bg-black/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6", children: [_jsx("h2", { className: "text-xl font-semibold text-white mb-4", children: "Statistics" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Songs Played" }), _jsx("span", { className: "text-purple-500 font-semibold", children: "1,337" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Artists" }), _jsx("span", { className: "text-purple-500 font-semibold", children: "42" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Hours Listened" }), _jsx("span", { className: "text-purple-500 font-semibold", children: "210" })] })] })] })] })] }));
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
        onAppOpen: (appName) => {
            console.log('Opening Bitcoin app:', appName);
            // Custom logic for handling app opens in music context
            // Could integrate with music player state, pause current track, etc.
        }
    };
    return (_jsx(BitcoinOSProvider, { config: bitcoinOSConfig, children: _jsx(MusicPlayerContent, {}) }));
}
