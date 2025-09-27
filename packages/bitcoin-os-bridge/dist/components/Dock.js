import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Wallet, Mail, Music, FileText, HardDrive, Calendar, Search, Table, Share2, Briefcase, Store, Wifi, Volume2, Battery, Clock, TrendingUp } from 'lucide-react';
import { getBitcoinApps } from '../utils';
import './Dock.css';
const Dock = ({ context, customApps = [], showSystemStatus = true, onAppClick }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    const getIconColor = (colorClass) => {
        const colorMap = {
            'text-orange-500': '#f97316',
            'text-yellow-500': '#eab308',
            'text-red-500': '#ef4444',
            'text-purple-500': '#a855f7',
            'text-fuchsia-500': '#d946ef',
            'text-green-500': '#22c55e',
            'text-blue-500': '#3b82f6',
            'text-gray-500': '#6b7280',
            'text-sky-400': '#38bdf8',
            'text-cyan-500': '#06b6d4'
        };
        return colorMap[colorClass] || '#ffffff';
    };
    const bitcoinApps = getBitcoinApps();
    const defaultDockApps = [
        { id: 'bapps-store', name: 'Bitcoin Apps Store', icon: Store, color: 'text-orange-500', url: 'https://www.bitcoinapps.store/', isImage: true },
        { name: 'Bitcoin Wallet', icon: Wallet, color: 'text-yellow-500', url: 'https://bitcoin-wallet-sable.vercel.app' },
        { name: 'Bitcoin Email', icon: Mail, color: 'text-red-500', url: 'https://bitcoin-email.vercel.app' },
        { name: 'Bitcoin Music', icon: Music, color: 'text-purple-500', url: 'https://bitcoin-music.vercel.app' },
        { name: 'Bitcoin Writer', icon: FileText, color: 'text-orange-500', url: 'https://bitcoin-writer.vercel.app' },
        { name: 'Bitcoin Drive', icon: HardDrive, color: 'text-green-500', url: 'https://bitcoin-drive.vercel.app' },
        { name: 'Bitcoin Calendar', icon: Calendar, color: 'text-fuchsia-500', url: 'https://bitcoin-calendar.vercel.app' },
        { name: 'Bitcoin Exchange', icon: TrendingUp, color: 'text-gray-500', url: context.exchangeUrl || 'https://bitcoin-exchange.vercel.app' },
        { name: 'Bitcoin Search', icon: Search, color: 'text-gray-500', url: 'https://bitcoin-search.vercel.app', disabled: true },
        { name: 'Bitcoin Spreadsheet', icon: Table, color: 'text-sky-400', url: 'https://bitcoin-spreadsheet.vercel.app' },
        { name: 'Bitcoin Shares', icon: Share2, color: 'text-gray-500', url: 'https://bitcoin-shares.vercel.app', disabled: true },
        { name: 'Bitcoin Jobs', icon: Briefcase, color: 'text-gray-500', url: 'https://bitcoin-jobs.vercel.app', disabled: true },
    ];
    // Check if current app should be marked as active
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const dockApps = [...defaultDockApps, ...customApps].map(app => ({
        ...app,
        current: app.url ? currentUrl.includes(app.url.replace('https://', '').replace('http://', '')) : false
    }));
    const handleAppClick = (app) => {
        if (onAppClick) {
            onAppClick(app);
        }
        else if (!app.disabled && app.url && !app.current) {
            window.open(app.url, '_blank');
        }
    };
    return (_jsx("div", { className: "bitcoin-dock", children: _jsxs("div", { className: "dock-container", children: [_jsx("div", { className: "dock-apps", children: dockApps.map((app) => {
                        const Icon = app.icon;
                        return (_jsxs("button", { className: `dock-app ${app.current ? 'active' : ''} ${app.disabled ? 'disabled' : ''}`, onClick: () => handleAppClick(app), title: app.name, disabled: app.disabled, children: [app.id === 'bapps-store' ? (_jsx("div", { className: "dock-app-icon", children: _jsx("img", { src: "/bapps-icon.jpg", alt: "BAPPS", className: "dock-app-image" }) })) : (_jsx(Icon, { className: "dock-app-icon", style: { color: getIconColor(app.color) } })), app.current && _jsx("span", { className: "dock-indicator" })] }, app.name));
                    }) }), showSystemStatus && (_jsxs("div", { className: "dock-status", children: [_jsx("div", { className: "dock-divider" }), _jsx("button", { className: "status-button", title: "Connected", children: _jsx(Wifi, { className: "status-icon connected" }) }), _jsx("button", { className: "status-button", title: "Volume", children: _jsx(Volume2, { className: "status-icon" }) }), _jsx("button", { className: "status-button", title: "Battery: 100%", children: _jsx(Battery, { className: "status-icon connected" }) }), _jsxs("div", { className: "status-time", title: mounted ? currentTime.toLocaleDateString() : '', children: [_jsx(Clock, { className: "status-icon" }), _jsx("span", { children: mounted ? currentTime.toLocaleTimeString() : '12:00:00 AM' })] })] }))] }) }));
};
export default Dock;
