import React from 'react';
import type { BitcoinOSConfig } from '../types';
interface BitcoinOSProviderProps {
    children: React.ReactNode;
    config: BitcoinOSConfig;
}
export default function BitcoinOSProvider({ children, config }: BitcoinOSProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
