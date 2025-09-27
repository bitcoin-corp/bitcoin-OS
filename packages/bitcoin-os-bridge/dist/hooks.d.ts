export declare function useIsMobile(breakpoint?: number): boolean;
export declare function useLocalStorage<T>(key: string, initialValue: T): readonly [T, (value: T | ((val: T) => T)) => void];
export declare function useDevSidebar(): readonly [boolean, (value: boolean | ((val: boolean) => boolean)) => void];
