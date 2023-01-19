export declare function getFromCache(key: string, getter: () => Promise<any>, options?: {
    time?: number;
}): Promise<any>;
