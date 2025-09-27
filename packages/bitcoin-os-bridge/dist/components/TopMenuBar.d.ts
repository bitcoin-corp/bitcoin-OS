import type { AppContext } from '../types';
import './TopMenuBar.css';
interface TopMenuBarProps {
    context: AppContext;
    onOpenApp?: (appName: string) => void;
    showBAppsMenu?: boolean;
    githubUrl?: string;
    docsUrl?: string;
}
export default function TopMenuBar({ context, onOpenApp, showBAppsMenu, githubUrl, docsUrl }: TopMenuBarProps): import("react/jsx-runtime").JSX.Element;
export {};
