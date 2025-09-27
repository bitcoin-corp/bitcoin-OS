export interface BitcoinApp {
    id: string;
    name: string;
    url: string;
    color?: string;
    icon?: string;
    disabled?: boolean;
    isExternal?: boolean;
}
export interface MenuItem {
    label?: string;
    action?: () => void;
    href?: string;
    divider?: boolean;
    shortcut?: string;
    icon?: string;
    external?: boolean;
}
export interface Menu {
    label: string;
    items: MenuItem[];
}
export interface AppContext {
    appName: string;
    exchangeUrl?: string;
    customMenuItems?: Menu[];
    theme?: 'default' | 'custom';
    branding?: {
        name: string;
        color: string;
        logo?: string;
    };
}
export interface BitcoinOSConfig {
    context: AppContext;
    showDevSidebar?: boolean;
    showDock?: boolean;
    showPocBar?: boolean;
    customStyles?: string;
    onAppOpen?: (appName: string) => void;
}
