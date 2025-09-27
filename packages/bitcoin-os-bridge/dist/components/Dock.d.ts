import React from 'react';
import type { AppContext } from '../types';
import './Dock.css';
interface DockApp {
    id?: string;
    name: string;
    icon: any;
    color: string;
    url?: string;
    disabled?: boolean;
    current?: boolean;
    isImage?: boolean;
}
interface DockProps {
    context: AppContext;
    customApps?: DockApp[];
    showSystemStatus?: boolean;
    onAppClick?: (app: DockApp) => void;
}
declare const Dock: React.FC<DockProps>;
export default Dock;
