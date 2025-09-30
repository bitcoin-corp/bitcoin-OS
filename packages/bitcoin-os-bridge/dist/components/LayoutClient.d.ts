import React from 'react';
import type { AppContext } from '../types';
interface LayoutClientProps {
    children: React.ReactNode;
    context?: AppContext;
}
export default function LayoutClient({ children, context }: LayoutClientProps): import("react/jsx-runtime").JSX.Element;
export {};
