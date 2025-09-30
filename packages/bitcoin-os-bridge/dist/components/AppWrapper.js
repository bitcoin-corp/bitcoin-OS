'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
export default function AppWrapper({ children }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return (_jsx("div", { style: {
                paddingTop: '60px',
                flex: 1,
                background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)'
            }, children: children }));
    }
    return (_jsx("div", { className: "app-container", style: {
            paddingTop: '60px',
            flex: 1,
            background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)'
        }, children: children }));
}
