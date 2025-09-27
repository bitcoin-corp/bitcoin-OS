import type { AppContext } from '../types';
import './DevSidebar.css';
interface DevSidebarProps {
    context: AppContext;
    githubRepo?: string;
    statsOverride?: Record<string, string | number>;
    customMenuItems?: Array<{
        path?: string;
        icon?: any;
        label?: string;
        badge?: string;
        divider?: boolean;
        section?: string;
        external?: boolean;
    }>;
}
export default function DevSidebar({ context, githubRepo, statsOverride, customMenuItems }: DevSidebarProps): import("react/jsx-runtime").JSX.Element;
export {};
