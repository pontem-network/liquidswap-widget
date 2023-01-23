export declare function composeType(address: string, generics: string[]): string;
export declare function composeType(address: string, struct: string, generics?: string[]): string;
export declare function composeType(address: string, module: string, struct: string, generics?: string[]): string;
export declare function extractAddressFromType(type: string): string;
export declare function withSlippage(slippage: number, value: number): number;
