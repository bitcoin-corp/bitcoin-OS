import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Example: Updated Bitcoin OS main page using the bridge system
import { useState, useEffect } from 'react';
import { BitcoinOSProvider } from '@bitcoin-os/bridge';
import DraggableDesktop from '@/components/DraggableDesktop';
import BootScreen from '@/components/BootScreen';
import { useIsMobile } from '@/hooks/useIsMobile';
export default function BitcoinOSUpdated() {
    const [isBooting, setIsBooting] = useState(true);
    const isMobile = useIsMobile();
    useEffect(() => {
        setTimeout(() => setIsBooting(false), 1000);
    }, []);
    const bitcoinOSConfig = {
        context: {
            appName: 'Bitcoin OS',
            exchangeUrl: 'https://bitcoin-exchange.vercel.app', // Main Bitcoin OS exchange
            customMenuItems: [
                // Add any Bitcoin OS specific menu items here
                {
                    label: 'Bitcoin OS',
                    items: [
                        {
                            label: 'Install as App',
                            action: () => {
                                // PWA installation logic
                                console.log('Install PWA');
                            }
                        },
                        {
                            label: 'Share Desktop',
                            action: () => {
                                navigator.share?.({
                                    title: 'Bitcoin OS',
                                    text: 'Check out Bitcoin OS - The Operating System for Bitcoin',
                                    url: 'https://bitcoin-os.vercel.app'
                                });
                            }
                        }
                    ]
                }
            ],
            branding: {
                name: 'Bitcoin OS',
                color: '#d946ef' // Main Bitcoin OS purple
            }
        },
        showDevSidebar: true,
        showDock: true,
        showPocBar: true,
        onAppOpen: (appName) => {
            // Bitcoin OS main app opening logic
            console.log('Opening from Bitcoin OS:', appName);
            // Handle different app modes (fullscreen vs windowed)
            const appMode = localStorage.getItem('appMode') || 'fullscreen';
            if (appMode === 'fullscreen') {
                // Navigate to app
                const app = bitcoinApps.find(a => a.name === appName);
                if (app?.url) {
                    window.location.href = app.url;
                }
            }
            else {
                // Open in windowed mode (existing Bitcoin OS logic)
                console.log('Opening in window:', appName);
            }
        }
    };
    const bitcoinApps = [
        { name: 'Bitcoin Writer', url: 'https://bitcoin-writer.vercel.app' },
        { name: 'Bitcoin Email', url: 'https://bitcoin-email.vercel.app' },
        { name: 'Bitcoin Music', url: 'https://bitcoin-music.vercel.app' },
        // ... other apps
    ];
    if (isBooting) {
        return _jsx(BootScreen, {});
    }
    if (isMobile) {
        return (_jsx(BitcoinOSProvider, { config: bitcoinOSConfig, children: _jsxs("div", { className: "flex-1 overflow-auto pb-20", children: [_jsx("div", { className: "bg-black/50 backdrop-blur-sm sticky top-0 z-10 px-4 py-3 border-b border-gray-800", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-bitcoin-orange rounded-xl flex items-center justify-center", children: _jsx("span", { className: "text-black font-bold text-xl", children: "B" }) }), _jsxs("h1", { className: "text-2xl font-bold", children: [_jsx("span", { className: "text-bitcoin-orange", children: "Bitcoin" }), _jsx("span", { className: "text-white ml-1", children: "OS" })] })] }) }), _jsx("div", { className: "p-4", children: _jsx("h2", { className: "text-white text-lg mb-4", children: "Bitcoin Applications" }) })] }) }));
    }
    // Desktop Bitcoin OS Layout
    return (_jsxs(BitcoinOSProvider, { config: bitcoinOSConfig, children: [_jsx(DraggableDesktop, {}), _jsx("div", { className: "absolute top-20 right-8 z-10", children: _jsxs("div", { className: "bg-black/30 backdrop-blur-sm border border-gray-800 rounded-xl p-4", children: [_jsx("h3", { className: "text-white font-semibold mb-2", children: "Quick Actions" }), _jsxs("div", { className: "space-y-2", children: [_jsx("button", { className: "w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors", onClick: () => window.open('/settings', '_blank'), children: "System Preferences" }), _jsx("button", { className: "w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors", onClick: () => window.open('/docs', '_blank'), children: "Documentation" })] })] }) })] }));
}
