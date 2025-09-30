'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import PocBar from './PocBar';
import Taskbar from './Taskbar';
import DevSidebar from './DevSidebar';
import AppWrapper from './AppWrapper';
import Footer from './Footer';
import Dock from './Dock';
export default function LayoutClient({ children, context = { appName: 'Bitcoin OS', exchangeUrl: '/exchange' } }) {
    const [isDevSidebarCollapsed, setIsDevSidebarCollapsed] = useState(true);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        // Get initial state from localStorage
        const saved = localStorage.getItem('devSidebarCollapsed');
        setIsDevSidebarCollapsed(saved !== null ? saved === 'true' : true);
    }, []);
    const handleDevSidebarCollapsedChange = (collapsed) => {
        setIsDevSidebarCollapsed(collapsed);
    };
    // Calculate margin based on DevSidebar state
    const contentMarginLeft = isDevSidebarCollapsed ? '60px' : '260px';
    if (!mounted) {
        // Return a placeholder with the default collapsed state during SSR
        return (_jsxs(_Fragment, { children: [_jsx(PocBar, {}), _jsx(Taskbar, {}), _jsx(DevSidebar, { context: context }), _jsxs("div", { style: {
                        marginTop: '72px',
                        marginLeft: '60px', // Default to collapsed
                        minHeight: 'calc(100vh - 72px)',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'margin-left 0.3s ease'
                    }, children: [_jsx(AppWrapper, { children: _jsx("main", { style: { flex: 1 }, children: children }) }), _jsx(Footer, {})] }), _jsx(Dock, { context: context })] }));
    }
    return (_jsxs(_Fragment, { children: [_jsx(PocBar, {}), _jsx(Taskbar, {}), _jsx(DevSidebar, { context: context }), _jsxs("div", { style: {
                    marginTop: '72px', // Space for POC bar (32px) + Taskbar (28px) + some padding
                    marginLeft: contentMarginLeft, // Dynamic margin based on DevSidebar state
                    minHeight: 'calc(100vh - 72px)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'margin-left 0.3s ease',
                    paddingBottom: '100px' // Space for the Dock
                }, children: [_jsx(AppWrapper, { children: _jsx("main", { style: { flex: 1 }, children: children }) }), _jsx(Footer, {})] }), _jsx(Dock, { context: context })] }));
}
