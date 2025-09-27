'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertTriangle } from 'lucide-react';
import './ProofOfConceptBar.css';
export default function ProofOfConceptBar({ appName, message = "PROOF OF CONCEPT - This is a demonstration of Bitcoin OS" }) {
    const displayMessage = appName ? `PROOF OF CONCEPT - ${appName} powered by Bitcoin OS` : message;
    return (_jsx("div", { className: "poc-bar", children: _jsxs("div", { className: "poc-content", children: [_jsx(AlertTriangle, { className: "w-4 h-4 poc-icon" }), _jsx("span", { className: "poc-text", children: displayMessage }), _jsx(AlertTriangle, { className: "w-4 h-4 poc-icon" })] }) }));
}
