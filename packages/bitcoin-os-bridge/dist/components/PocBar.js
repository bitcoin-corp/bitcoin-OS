'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function PocBar({ color = '#40e0d0' }) {
    return (_jsx("div", { className: "bitcoin-os-poc-bar", style: {
            position: 'fixed',
            top: 0, // Above taskbar
            left: 0,
            right: 0,
            height: '32px',
            backgroundColor: color,
            background: `linear-gradient(135deg, ${color}, #20b2aa) !important`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start', // Left aligned
            zIndex: 10001,
            fontSize: '13px',
            fontWeight: '500',
            color: 'white',
            letterSpacing: '0.5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderBottom: '1px solid rgba(0,0,0,0.2)',
            padding: '0 12px',
        }, children: _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [_jsx("span", { style: { fontSize: '12px' }, children: "\u26A0\uFE0F" }), _jsx("span", { style: { fontWeight: '600' }, children: "PROOF OF CONCEPT:" }), _jsx("span", { style: { opacity: 0.9 }, children: "This is a demonstration version." }), _jsxs("div", { style: { display: 'flex', gap: '12px', marginLeft: '16px', fontSize: '12px' }, children: [_jsx("a", { href: "/contracts", style: {
                                color: 'white',
                                textDecoration: 'underline',
                                opacity: 0.9,
                                fontWeight: '400'
                            }, children: "Contracts" }), _jsx("a", { href: "/tasks", style: {
                                color: 'white',
                                textDecoration: 'underline',
                                opacity: 0.9,
                                fontWeight: '400'
                            }, children: "Tasks" }), _jsx("a", { href: "/token", style: {
                                color: 'white',
                                textDecoration: 'underline',
                                opacity: 0.9,
                                fontWeight: '400'
                            }, children: "Token" }), _jsx("a", { href: "https://github.com/bitcoin-corp/bitcoin-OS", target: "_blank", rel: "noopener noreferrer", style: {
                                color: 'white',
                                textDecoration: 'underline',
                                opacity: 0.9,
                                fontWeight: '400'
                            }, children: "GitHub" })] })] }) }));
}
