'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Footer() {
    return (_jsx("footer", { style: {
            background: '#1a1a1a',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '20px 0',
            marginTop: 'auto'
        }, children: _jsxs("div", { style: {
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px'
            }, children: [_jsx("div", { style: {
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: '600',
                        letterSpacing: '0.5px'
                    }, children: "\u00A9 2025 The Bitcoin Corporation LTD." }), _jsx("div", { style: {
                        fontSize: '12px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        textAlign: 'center'
                    }, children: "Registered in England and Wales \u2022 Company No. 16735102" }), _jsx("div", { style: {
                        fontSize: '11px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        marginTop: '5px'
                    }, children: "Building the decentralized future on Bitcoin BSV" }), _jsxs("div", { style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginTop: '15px',
                        padding: '8px 16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px',
                        border: '1px solid rgba(64, 224, 208, 0.2)'
                    }, children: [_jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", style: { color: '#40e0d0' }, children: _jsx("path", { fill: "currentColor", d: "M24 11.7661L11.883 24L0 11.7661L11.883 0L24 11.7661Z" }) }), _jsx("span", { style: {
                                fontSize: '12px',
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontWeight: '500'
                            }, children: "Deployed on Vercel" })] })] }) }));
}
