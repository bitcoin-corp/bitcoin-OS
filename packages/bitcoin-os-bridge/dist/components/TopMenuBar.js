'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { Github, BookOpen } from 'lucide-react';
import { createDefaultMenus, getBitcoinApps } from '../utils';
import './TopMenuBar.css';
export default function TopMenuBar({ context, onOpenApp, showBAppsMenu = true, githubUrl = 'https://github.com/bitcoin-apps-suite/bitcoin-OS', docsUrl = '/docs' }) {
    const [activeMenu, setActiveMenu] = useState(null);
    const [showBAppsMenuState, setShowBAppsMenuState] = useState(false);
    const menuRef = useRef(null);
    const bitcoinApps = getBitcoinApps();
    const menus = createDefaultMenus(context);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenu(null);
                setShowBAppsMenuState(false);
            }
        };
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setActiveMenu(null);
                setShowBAppsMenuState(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    return (_jsxs("div", { ref: menuRef, className: "bitcoin-os-taskbar", children: [showBAppsMenu && (_jsxs("div", { style: { position: 'relative' }, children: [_jsx("button", { className: `taskbar-logo ${showBAppsMenuState ? 'menu-open' : ''}`, onClick: () => {
                            setShowBAppsMenuState(!showBAppsMenuState);
                            setActiveMenu(null);
                        }, onDoubleClick: () => window.open('https://bitcoin-os.vercel.app', '_blank'), title: "Click for apps \u2022 Double-click to go to Bitcoin OS", style: {
                            background: showBAppsMenuState ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0 12px',
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                            transition: 'background 0.15s ease'
                        }, children: _jsx("span", { className: "bitcoin-symbol", children: "\u20BF" }) }), showBAppsMenuState && (_jsxs("div", { style: {
                            position: 'absolute',
                            top: '28px',
                            left: 0,
                            minWidth: '220px',
                            background: '#1a1a1a',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '8px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
                            padding: '8px 0',
                            zIndex: 1000
                        }, children: [_jsx("div", { style: {
                                    padding: '8px 16px',
                                    fontSize: '12px',
                                    color: '#d946ef',
                                    fontWeight: '600',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                    marginBottom: '4px'
                                }, children: "Bitcoin Apps" }), bitcoinApps.map((app) => (_jsxs("a", { href: app.url, style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '6px 16px',
                                    color: '#ffffff',
                                    background: 'transparent',
                                    textDecoration: 'none',
                                    fontSize: '13px',
                                    transition: 'background 0.15s ease',
                                    cursor: 'pointer'
                                }, onClick: (e) => {
                                    if (app.url === '#') {
                                        e.preventDefault();
                                    }
                                    else {
                                        e.preventDefault();
                                        window.open(app.url, '_blank');
                                    }
                                    setShowBAppsMenuState(false);
                                }, onMouseEnter: (e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)', onMouseLeave: (e) => e.currentTarget.style.background = 'transparent', children: [_jsx("span", { style: {
                                            color: app.color,
                                            marginRight: '12px',
                                            fontSize: '16px',
                                            fontWeight: 'bold'
                                        }, children: "\u20BF" }), _jsx("span", { children: app.name })] }, app.name)))] }))] })), _jsx("div", { className: "taskbar-menus", children: menus.map((menu) => (_jsxs("div", { className: "menu-container", children: [_jsx("button", { className: `menu-button ${activeMenu === menu.label ? 'active' : ''}`, onClick: () => setActiveMenu(activeMenu === menu.label ? null : menu.label), onMouseEnter: () => activeMenu && setActiveMenu(menu.label), children: menu.label }), activeMenu === menu.label && (_jsx("div", { className: "dropdown-menu", children: menu.items.map((item, index) => (item.divider ? (_jsx("div", { className: "menu-divider" }, index)) : item.href ? (_jsxs("a", { href: item.href, target: item.external ? "_blank" : undefined, rel: item.external ? "noopener noreferrer" : undefined, className: "menu-item", onClick: () => setActiveMenu(null), children: [_jsxs("span", { className: "menu-item-content", children: [item.icon && _jsx("span", { className: "menu-icon", children: item.icon }), _jsx("span", { className: "menu-label", children: item.label })] }), item.shortcut && (_jsx("span", { className: "menu-shortcut", children: item.shortcut }))] }, index)) : (_jsxs("button", { className: "menu-item", onClick: () => {
                                    item.action?.();
                                    setActiveMenu(null);
                                }, children: [_jsxs("span", { className: "menu-item-content", children: [item.icon && _jsx("span", { className: "menu-icon", children: item.icon }), _jsx("span", { className: "menu-label", children: item.label })] }), item.shortcut && (_jsx("span", { className: "menu-shortcut", children: item.shortcut }))] }, index)))) }))] }, menu.label))) }), _jsxs("div", { className: "taskbar-status", children: [_jsx("a", { href: githubUrl, target: "_blank", rel: "noopener noreferrer", className: "taskbar-link", title: "GitHub", children: _jsx(Github, { className: "taskbar-link-icon" }) }), _jsx("a", { href: docsUrl, className: "taskbar-link", title: "Documentation", children: _jsx(BookOpen, { className: "taskbar-link-icon" }) })] })] }));
}
