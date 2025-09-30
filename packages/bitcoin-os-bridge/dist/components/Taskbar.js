'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
export default function Taskbar() {
    const [activeMenu, setActiveMenu] = useState(null);
    const [showBitcoinSuite, setShowBitcoinSuite] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const menuRef = useRef(null);
    const handleOpenExchange = () => {
        window.dispatchEvent(new CustomEvent('openExchange'));
    };
    const handleOpenMarketplace = () => {
        window.location.href = '/marketplace';
    };
    const menus = [
        {
            label: 'Bitcoin OS',
            items: [
                { label: 'Home', shortcut: '⌘H', action: () => window.location.href = '/' },
                { divider: true },
                { label: 'About Bitcoin OS', action: () => alert('Bitcoin OS v2.0\n\nDecentralized Operating System on BSV blockchain\n\nBuilt with Next.js and BSV SDK') },
                { divider: true },
                { label: 'Preferences...', shortcut: '⌘,', action: () => console.log('Preferences') },
                { label: 'System Settings...', action: () => console.log('System settings') },
                { divider: true },
                { label: 'Sign Out', shortcut: '⌘Q', action: () => console.log('Sign out') }
            ]
        },
        {
            label: 'File',
            items: [
                { label: 'New File', shortcut: '⌘N', action: () => console.log('New file') },
                { label: 'Open...', shortcut: '⌘O', action: () => console.log('Open file') },
                { label: 'Recent Files', action: () => console.log('Recent files') },
                { divider: true },
                { label: 'Save', shortcut: '⌘S', action: () => console.log('Save file') },
                { label: 'Save As...', shortcut: '⇧⌘S', action: () => console.log('Save as') },
                { divider: true },
                { label: 'Import...', action: () => console.log('Import') },
                { label: 'Export...', shortcut: '⌘E', action: () => console.log('Export') }
            ]
        },
        {
            label: 'Edit',
            items: [
                { label: 'Undo', shortcut: '⌘Z', action: () => document.execCommand('undo') },
                { label: 'Redo', shortcut: '⇧⌘Z', action: () => document.execCommand('redo') },
                { divider: true },
                { label: 'Cut', shortcut: '⌘X', action: () => document.execCommand('cut') },
                { label: 'Copy', shortcut: '⌘C', action: () => document.execCommand('copy') },
                { label: 'Paste', shortcut: '⌘V', action: () => document.execCommand('paste') },
                { label: 'Delete', shortcut: '⌫', action: () => console.log('Delete') },
                { divider: true },
                { label: 'Select All', shortcut: '⌘A', action: () => document.execCommand('selectAll') },
                { label: 'Find...', shortcut: '⌘F', action: () => console.log('Find') }
            ]
        },
        {
            label: 'View',
            items: [
                { label: 'Show All', shortcut: '⌘1', action: () => console.log('Show all') },
                { label: 'Hide Others', shortcut: '⌘2', action: () => console.log('Hide others') },
                { label: 'Show Inspector', shortcut: '⌥⌘I', action: () => console.log('Toggle inspector') },
                { divider: true },
                { label: 'Zoom In', shortcut: '⌘+', action: () => console.log('Zoom in') },
                { label: 'Zoom Out', shortcut: '⌘-', action: () => console.log('Zoom out') },
                { label: 'Actual Size', shortcut: '⌘0', action: () => console.log('Actual size') },
                { divider: true },
                { label: 'Enter Full Screen', shortcut: '⌃⌘F', action: () => document.documentElement.requestFullscreen() }
            ]
        },
        {
            label: 'Apps',
            items: [
                { label: 'Bitcoin Auth', action: () => console.log('Open Bitcoin Auth') },
                { label: 'Bitcoin Chat', action: () => console.log('Open Bitcoin Chat') },
                { label: 'Bitcoin Drive', action: () => window.open('https://bitcoin-drive.vercel.app', '_blank') },
                { label: 'Bitcoin Jobs', action: () => window.open('https://bitcoin-jobs.vercel.app', '_blank') },
                { label: 'Bitcoin Writer', action: () => window.open('https://bitcoin-writer.vercel.app', '_blank') },
                { divider: true },
                { label: 'App Store', action: () => console.log('Open App Store') },
                { label: 'Install App...', action: () => console.log('Install app') }
            ]
        },
        {
            label: 'Blockchain',
            items: [
                { label: 'Create Transaction', action: () => console.log('Create transaction') },
                { label: 'Sign Message', action: () => console.log('Sign message') },
                { divider: true },
                { label: 'Wallet', action: () => console.log('Open wallet') },
                { label: 'Explorer', href: 'https://whatsonchain.com', target: '_blank' },
                { divider: true },
                { label: 'Network Status', action: () => console.log('Network status') }
            ]
        },
        {
            label: 'Window',
            items: [
                { label: 'Minimize', shortcut: '⌘M', action: () => console.log('Minimize') },
                { label: 'Zoom', action: () => console.log('Zoom') },
                { divider: true },
                { label: 'Bring All to Front', action: () => console.log('Bring to front') }
            ]
        },
        {
            label: 'Help',
            items: [
                { label: 'Bitcoin OS Help', shortcut: '⌘?', action: () => alert('Bitcoin OS v2.0\n\nDecentralized Operating System on BSV') },
                { label: 'Keyboard Shortcuts', action: () => console.log('Show shortcuts') },
                { label: 'Getting Started', action: () => console.log('Getting started guide') },
                { divider: true },
                { label: 'Report Issue', href: 'https://github.com/bitcoin-corp/bitcoin-OS/issues', target: '_blank' },
                { label: 'Contact Support', action: () => console.log('Contact support') }
            ]
        }
    ];
    const bitcoinApps = [
        { name: 'Bitcoin Auth', color: '#ef4444', url: '#' },
        { name: 'Bitcoin Chat', color: '#ff6500', url: '#' },
        { name: 'Bitcoin Domains', color: '#eab308', url: '#' },
        { name: 'Bitcoin Draw', color: '#10b981', url: '#' },
        { name: 'Bitcoin Drive', color: '#22c55e', url: 'https://bitcoin-drive.vercel.app' },
        { name: 'Bitcoin Email', color: '#06b6d4', url: '#' },
        { name: 'Bitcoin Exchange', color: '#3b82f6', url: '#', action: handleOpenExchange },
        { name: 'Bitcoin Jobs', color: '#10b981', url: 'https://bitcoin-jobs.vercel.app' },
        { name: 'Bitcoin Paint', color: '#a855f7', url: '#' },
        { name: 'Bitcoin Pics', color: '#ec4899', url: '#' },
        { name: 'Bitcoin Registry', color: '#f43f5e', url: '#' },
        { name: 'Bitcoin Shares', color: '#f43f5e', url: '#' },
        { name: 'Bitcoin Video', color: '#65a30d', url: '#' },
        { name: 'Bitcoin Wallet', color: '#f59e0b', url: '#' },
        { name: 'Bitcoin Writer', color: '#ff9500', url: 'https://bitcoin-writer.vercel.app' }
    ];
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenu(null);
                setShowBitcoinSuite(false);
                setShowMobileMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return (_jsxs("div", { ref: menuRef, className: "taskbar", style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '28px',
            background: 'linear-gradient(180deg, #6b7280 0%, #4b5563 100%)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
            fontSize: '13px',
            fontWeight: '500',
            color: '#ffffff',
            userSelect: 'none',
            position: 'fixed',
            top: '32px', // Below POC banner
            left: 0,
            right: 0,
            zIndex: 10000
        }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center' }, children: [_jsx("div", { className: "sm:hidden", style: {
                            padding: '0 12px',
                            fontSize: '18px',
                            fontWeight: '500',
                            color: '#40e0d0'
                        }, children: "\u20BF" }), _jsxs("div", { className: "hidden sm:block", style: { position: 'relative' }, children: [_jsx("button", { onClick: () => {
                                    setShowBitcoinSuite(!showBitcoinSuite);
                                    setActiveMenu(null);
                                }, onDoubleClick: () => {
                                    window.location.href = '/';
                                }, style: {
                                    padding: '0 12px',
                                    fontSize: '18px',
                                    fontWeight: '500',
                                    color: '#40e0d0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: '28px',
                                    background: showBitcoinSuite ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background 0.15s ease'
                                }, title: "Bitcoin Suite Apps (double-click for home)", children: "\u20BF" }), showBitcoinSuite && (_jsxs("div", { style: {
                                    position: 'absolute',
                                    top: '28px',
                                    left: 0,
                                    minWidth: '220px',
                                    background: 'rgba(45, 45, 45, 0.95)',
                                    backdropFilter: 'blur(16px)',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    borderRadius: '8px',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
                                    padding: '8px 0',
                                    zIndex: 1000
                                }, children: [_jsx("div", { style: {
                                            padding: '8px 16px',
                                            fontSize: '12px',
                                            color: '#40e0d0',
                                            fontWeight: '400',
                                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                            marginBottom: '4px'
                                        }, children: "Bitcoin Apps" }), bitcoinApps.map((app) => {
                                        const isAction = 'action' in app && app.action;
                                        return isAction ? (_jsxs("button", { onClick: () => {
                                                app.action?.();
                                                setShowBitcoinSuite(false);
                                            }, style: {
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '6px 16px',
                                                color: app.current ? '#ffffff' : '#ffffff',
                                                background: 'transparent',
                                                border: 'none',
                                                textDecoration: 'none',
                                                fontSize: '13px',
                                                transition: 'background 0.15s ease',
                                                cursor: 'pointer',
                                                fontWeight: app.current ? '500' : '400',
                                                textAlign: 'left'
                                            }, onMouseEnter: (e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)', onMouseLeave: (e) => e.currentTarget.style.background = 'transparent', children: [_jsx("span", { style: {
                                                        color: app.color,
                                                        marginRight: '12px',
                                                        fontSize: '16px',
                                                        fontWeight: '500'
                                                    }, children: "\u20BF" }), _jsxs("span", { children: [app.name, app.current && _jsx("span", { style: { marginLeft: '8px', fontSize: '11px', opacity: 0.6 }, children: "(current)" })] })] }, app.name)) : (_jsxs("a", { href: app.url, target: app.url.startsWith('http') ? '_blank' : undefined, rel: app.url.startsWith('http') ? 'noopener noreferrer' : undefined, style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '6px 16px',
                                                color: app.current ? '#ffffff' : '#ffffff',
                                                background: 'transparent',
                                                textDecoration: 'none',
                                                fontSize: '13px',
                                                transition: 'background 0.15s ease',
                                                cursor: 'pointer',
                                                fontWeight: app.current ? '500' : '400'
                                            }, onClick: () => setShowBitcoinSuite(false), onMouseEnter: (e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)', onMouseLeave: (e) => e.currentTarget.style.background = 'transparent', children: [_jsx("span", { style: {
                                                        color: app.color,
                                                        marginRight: '12px',
                                                        fontSize: '16px',
                                                        fontWeight: '500'
                                                    }, children: "\u20BF" }), _jsxs("span", { children: [app.name, app.current && _jsx("span", { style: { marginLeft: '8px', fontSize: '11px', opacity: 0.6 }, children: "(current)" })] })] }, app.name));
                                    })] }))] }), _jsx("div", { className: "hidden sm:flex", style: { alignItems: 'center', height: '100%' }, children: menus.map((menu) => (_jsxs("div", { style: { position: 'relative' }, children: [_jsx("button", { onClick: () => {
                                        setActiveMenu(activeMenu === menu.label ? null : menu.label);
                                        setShowBitcoinSuite(false);
                                    }, onMouseEnter: () => activeMenu && setActiveMenu(menu.label), style: {
                                        padding: '0 12px',
                                        height: '24px',
                                        background: activeMenu === menu.label ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                        border: 'none',
                                        color: '#ffffff',
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                        fontFamily: 'inherit',
                                        fontWeight: '400',
                                        transition: 'background 0.15s ease'
                                    }, children: menu.label }), activeMenu === menu.label && (_jsx("div", { style: {
                                        position: 'absolute',
                                        top: '28px',
                                        left: 0,
                                        minWidth: '200px',
                                        background: 'rgba(45, 45, 45, 0.95)',
                                        backdropFilter: 'blur(16px)',
                                        border: '1px solid rgba(255, 255, 255, 0.15)',
                                        borderRadius: '8px',
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
                                        padding: '4px 0',
                                        zIndex: 9999,
                                        overflow: 'hidden'
                                    }, children: menu.items.map((item, index) => (item.divider ? (_jsx("div", { style: {
                                            height: '1px',
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            margin: '4px 0'
                                        } }, index)) : item.href ? (_jsxs("a", { href: item.href, target: item.target || '_blank', rel: "noopener noreferrer", style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '4px 12px',
                                            color: '#ffffff',
                                            textDecoration: 'none',
                                            fontSize: '13px',
                                            cursor: 'pointer',
                                            transition: 'background 0.15s ease'
                                        }, onMouseEnter: (e) => {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                        }, onMouseLeave: (e) => {
                                            e.currentTarget.style.background = 'transparent';
                                        }, children: [_jsx("span", { children: item.label }), item.shortcut && (_jsx("span", { style: { opacity: 0.6, fontSize: '12px' }, children: item.shortcut }))] }, index)) : (_jsxs("button", { onClick: () => {
                                            item.action?.();
                                            setActiveMenu(null);
                                        }, style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            width: '100%',
                                            padding: '4px 12px',
                                            background: 'transparent',
                                            border: 'none',
                                            color: '#ffffff',
                                            fontSize: '13px',
                                            cursor: 'pointer',
                                            fontFamily: 'inherit',
                                            textAlign: 'left',
                                            transition: 'background 0.15s ease'
                                        }, onMouseEnter: (e) => {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                        }, onMouseLeave: (e) => {
                                            e.currentTarget.style.background = 'transparent';
                                        }, children: [_jsx("span", { children: item.label }), item.shortcut && (_jsx("span", { style: { opacity: 0.6, fontSize: '12px' }, children: item.shortcut }))] }, index)))) }))] }, menu.label))) })] }), _jsx("button", { className: "sm:hidden flex-1", onClick: () => {
                    window.location.href = '/';
                }, style: {
                    fontSize: '14px',
                    fontWeight: '400',
                    color: '#40e0d0',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                }, title: "Return to home", children: _jsx("span", { children: "\u20BF Bitcoin OS" }) }), _jsx("button", { className: "flex sm:hidden", onClick: () => setShowMobileMenu(!showMobileMenu), style: {
                    padding: '0 12px',
                    height: '28px',
                    background: 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    alignItems: 'center',
                    cursor: 'pointer'
                }, children: showMobileMenu ? _jsx(X, { size: 18 }) : _jsx(Menu, { size: 18 }) }), _jsxs("div", { className: "hidden sm:flex", style: {
                    marginLeft: 'auto',
                    alignItems: 'center',
                    gap: '16px',
                    paddingRight: '16px',
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.8)'
                }, children: [_jsx("a", { href: "https://github.com/bitcoin-corp/bitcoin-OS", target: "_blank", rel: "noopener noreferrer", style: {
                            color: 'rgba(255, 255, 255, 0.8)',
                            textDecoration: 'none',
                            transition: 'color 0.15s ease',
                            fontWeight: '400'
                        }, onMouseEnter: (e) => e.currentTarget.style.color = '#40e0d0', onMouseLeave: (e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)', children: "GitHub" }), _jsx("a", { href: "/docs", style: {
                            color: 'rgba(255, 255, 255, 0.8)',
                            textDecoration: 'none',
                            transition: 'color 0.15s ease',
                            fontWeight: '400'
                        }, onMouseEnter: (e) => e.currentTarget.style.color = '#40e0d0', onMouseLeave: (e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)', children: "Docs" }), _jsx("span", { style: { color: 'rgba(255, 255, 255, 0.2)' }, children: "|" }), _jsx("span", { children: "Bitcoin OS" }), _jsx("span", { style: { color: '#40e0d0' }, children: "\u25CF" })] }), showMobileMenu && (_jsx("div", { className: "block sm:hidden", style: {
                    position: 'fixed',
                    top: '60px', // Below POC banner (32px) and taskbar (28px)
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(26, 26, 26, 0.98)',
                    backdropFilter: 'blur(20px)',
                    zIndex: 9999,
                    overflowY: 'auto',
                    WebkitOverflowScrolling: 'touch'
                }, children: _jsx("div", { style: { padding: '16px' }, children: menus.map((menu) => (_jsxs("div", { style: {
                            marginBottom: '16px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderRadius: '8px',
                            overflow: 'hidden'
                        }, children: [_jsx("div", { style: {
                                    padding: '12px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    fontSize: '13px',
                                    fontWeight: '400',
                                    color: '#ffffff',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                                }, children: menu.label }), _jsx("div", { style: { padding: '8px' }, children: menu.items.map((item, index) => (item.divider ? (_jsx("div", { style: {
                                        height: '1px',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        margin: '8px 0'
                                    } }, index)) : item.href ? (_jsx("a", { href: item.href, target: item.target || '_blank', rel: "noopener noreferrer", onClick: () => setShowMobileMenu(false), style: {
                                        display: 'block',
                                        padding: '10px 12px',
                                        color: '#ffffff',
                                        textDecoration: 'none',
                                        fontSize: '13px',
                                        borderRadius: '4px',
                                        transition: 'background 0.15s ease'
                                    }, children: item.label }, index)) : (_jsx("button", { onClick: () => {
                                        item.action?.();
                                        setShowMobileMenu(false);
                                    }, style: {
                                        display: 'block',
                                        width: '100%',
                                        textAlign: 'left',
                                        padding: '10px 12px',
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#ffffff',
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                        borderRadius: '4px',
                                        transition: 'background 0.15s ease'
                                    }, children: item.label }, index)))) })] }, menu.label))) }) }))] }));
}
