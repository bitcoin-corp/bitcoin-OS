'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Monitor, FileCode, Users, Coins, Github, GitPullRequest, BookOpen, History, CheckCircle, ListTodo, Terminal, Package, Download } from 'lucide-react';
import './DevSidebar.css';
export default function DevSidebar({ context, githubRepo = 'https://github.com/bitcoin-apps-suite/bitcoin-OS', statsOverride = {}, customMenuItems = [] }) {
    const [isCollapsed, setIsCollapsed] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('devSidebarCollapsed');
            return saved !== null ? saved === 'true' : true;
        }
        return true;
    });
    const [issueCount, setIssueCount] = useState(0);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('devSidebarCollapsed', isCollapsed.toString());
        }
    }, [isCollapsed]);
    // Fetch GitHub issues count
    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const repoPath = githubRepo.replace('https://github.com/', '');
                const response = await fetch(`https://api.github.com/repos/${repoPath}/issues?state=open`);
                const data = await response.json();
                setIssueCount(Array.isArray(data) ? data.length : 0);
            }
            catch (error) {
                console.error('Error fetching issues:', error);
                setIssueCount(0);
            }
        };
        fetchIssues();
    }, [githubRepo]);
    const { appName, exchangeUrl } = context;
    const defaultMenuItems = [
        // Core Features
        { path: '/token', icon: Coins, label: '$bOS Token', badge: 'NEW' },
        { path: '/contracts', icon: Terminal, label: 'Smart Contracts', badge: 'BETA' },
        ...(exchangeUrl ? [{ path: exchangeUrl, icon: Download, label: 'Exchange' }] : []),
        // System Operations
        { divider: true },
        { section: 'SYSTEM' },
        { path: '/tasks', icon: ListTodo, label: 'Task Manager' },
        { path: '/contributors', icon: Users, label: 'Contributors', badge: '42' },
        { path: '/docs', icon: BookOpen, label: 'Documentation' },
        // Development
        { divider: true },
        { section: 'DEVELOPMENT' },
        { path: '/api', icon: Package, label: 'API Reference' },
        { path: githubRepo, icon: Github, label: 'GitHub Repository', external: true },
        { path: `${githubRepo}/issues`, icon: FileCode, label: 'Issues', badge: issueCount > 0 ? String(issueCount) : '0', external: true },
        { path: `${githubRepo}/pulls`, icon: GitPullRequest, label: 'Pull Requests', external: true },
        // System Status
        { divider: true },
        { path: '/changelog', icon: History, label: 'Changelog' },
        { path: '/status', icon: CheckCircle, label: 'System Status', badge: 'OK' }
    ];
    const menuItems = [...defaultMenuItems, ...customMenuItems];
    const defaultStats = {
        totalSupply: '1,000,000,000,000',
        distributed: '12,456,789',
        contributors: '42',
        openTasks: issueCount || 0,
        networkNodes: '150+'
    };
    const stats = { ...defaultStats, ...statsOverride };
    return (_jsxs("div", { className: `dev-sidebar ${isCollapsed ? 'collapsed' : ''}`, children: [_jsxs("div", { className: "dev-sidebar-header", children: [!isCollapsed && (_jsxs("div", { className: "dev-sidebar-title", children: [_jsx(Monitor, { className: "dev-sidebar-logo" }), _jsx("span", { children: "Developer Hub" })] })), _jsx("button", { className: "dev-sidebar-toggle", onClick: () => setIsCollapsed(!isCollapsed), "aria-label": isCollapsed ? 'Expand sidebar' : 'Collapse sidebar', children: isCollapsed ? _jsx(ChevronRight, { size: 20 }) : _jsx(ChevronLeft, { size: 20 }) })] }), _jsx("nav", { className: "dev-sidebar-nav", children: menuItems.map((item, index) => {
                    if (item.divider) {
                        return _jsx("div", { className: "dev-sidebar-divider" }, index);
                    }
                    if (item.section) {
                        return !isCollapsed ? (_jsx("div", { className: "dev-sidebar-section", children: item.section }, index)) : null;
                    }
                    const Icon = item.icon;
                    const isActive = typeof window !== 'undefined' && window.location.pathname === item.path;
                    if (item.external) {
                        return (_jsxs("a", { href: item.path, target: "_blank", rel: "noopener noreferrer", className: `dev-sidebar-item ${isActive ? 'active' : ''}`, title: isCollapsed ? item.label : undefined, children: [_jsx(Icon, { size: 20 }), !isCollapsed && (_jsxs(_Fragment, { children: [_jsx("span", { className: "dev-sidebar-label", children: item.label }), item.badge && _jsx("span", { className: "dev-sidebar-badge", children: item.badge })] }))] }, `${item.path}-${index}`));
                    }
                    return (_jsxs("a", { href: item.path || '/', className: `dev-sidebar-item ${isActive ? 'active' : ''}`, title: isCollapsed ? item.label : undefined, children: [_jsx(Icon, { size: 20 }), !isCollapsed && (_jsxs(_Fragment, { children: [_jsx("span", { className: "dev-sidebar-label", children: item.label }), item.badge && _jsx("span", { className: "dev-sidebar-badge", children: item.badge })] }))] }, `${item.path}-${index}`));
                }) }), !isCollapsed && (_jsxs("div", { className: "dev-sidebar-stats", children: [_jsxs("h4", { children: [appName, " Stats"] }), Object.entries(stats).map(([key, value]) => (_jsxs("div", { className: "dev-stat", children: [_jsx("span", { className: "dev-stat-label", children: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) }), _jsx("span", { className: "dev-stat-value", children: value })] }, key)))] })), !isCollapsed && (_jsx("div", { className: "dev-sidebar-footer", children: _jsxs("div", { className: "dev-sidebar-cta", children: [_jsx("p", { children: "Join Development" }), _jsx("a", { href: githubRepo, target: "_blank", rel: "noopener noreferrer", className: "dev-sidebar-cta-button", children: "Start Contributing" })] }) }))] }));
}
