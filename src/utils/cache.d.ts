export declare function getFromCache(key: string, getter: (() => Promise<any>) | ((...args: any[]) => Promise<any>), options?: {
    time?: number;
    args?: any[];
}): Promise<any>;
