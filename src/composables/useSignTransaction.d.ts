import { MaybeRef } from '@vueuse/core';
export type TxParams = MaybeRef<{
    sender: MaybeRef<string>;
    payload: MaybeRef<{
        type: MaybeRef<string>;
        function: MaybeRef<string>;
        typeArguments: MaybeRef<string[]>;
        arguments: MaybeRef<string[]>;
    }>;
} | undefined>;
export declare function useSignTransaction(): {
    state: import("vue").Ref<{
        [x: number]: number;
        readonly BYTES_PER_ELEMENT: number;
        readonly buffer: {
            readonly byteLength: number;
            slice: (begin: number, end?: number | undefined) => ArrayBuffer;
            readonly [Symbol.toStringTag]: string;
        } | {
            readonly byteLength: number;
            slice: (begin: number, end?: number | undefined) => SharedArrayBuffer;
            readonly [Symbol.species]: SharedArrayBuffer;
            readonly [Symbol.toStringTag]: "SharedArrayBuffer";
        };
        readonly byteLength: number;
        readonly byteOffset: number;
        copyWithin: (target: number, start: number, end?: number | undefined) => Uint8Array;
        every: (predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any) => boolean;
        fill: (value: number, start?: number | undefined, end?: number | undefined) => Uint8Array;
        filter: (predicate: (value: number, index: number, array: Uint8Array) => any, thisArg?: any) => Uint8Array;
        find: (predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any) => number | undefined;
        findIndex: (predicate: (value: number, index: number, obj: Uint8Array) => boolean, thisArg?: any) => number;
        forEach: (callbackfn: (value: number, index: number, array: Uint8Array) => void, thisArg?: any) => void;
        indexOf: (searchElement: number, fromIndex?: number | undefined) => number;
        join: (separator?: string | undefined) => string;
        lastIndexOf: (searchElement: number, fromIndex?: number | undefined) => number;
        readonly length: number;
        map: (callbackfn: (value: number, index: number, array: Uint8Array) => number, thisArg?: any) => Uint8Array;
        reduce: {
            (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
            (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
            <U>(callbackfn: (previousValue: U, currentValue: number, currentIndex: number, array: Uint8Array) => U, initialValue: U): U;
        };
        reduceRight: {
            (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number): number;
            (callbackfn: (previousValue: number, currentValue: number, currentIndex: number, array: Uint8Array) => number, initialValue: number): number;
            <U_1>(callbackfn: (previousValue: U_1, currentValue: number, currentIndex: number, array: Uint8Array) => U_1, initialValue: U_1): U_1;
        };
        reverse: () => Uint8Array;
        set: (array: ArrayLike<number>, offset?: number | undefined) => void;
        slice: (start?: number | undefined, end?: number | undefined) => Uint8Array;
        some: (predicate: (value: number, index: number, array: Uint8Array) => unknown, thisArg?: any) => boolean;
        sort: (compareFn?: ((a: number, b: number) => number) | undefined) => Uint8Array;
        subarray: (begin?: number | undefined, end?: number | undefined) => Uint8Array;
        toLocaleString: () => string;
        toString: () => string;
        valueOf: () => Uint8Array;
        entries: () => IterableIterator<[number, number]>;
        keys: () => IterableIterator<number>;
        values: () => IterableIterator<number>;
        includes: (searchElement: number, fromIndex?: number | undefined) => boolean;
        at: (index: number) => number | undefined;
        [Symbol.iterator]: () => IterableIterator<number>;
        readonly [Symbol.toStringTag]: "Uint8Array";
    }>;
    isReady: import("vue").Ref<boolean>;
    isLoading: import("vue").Ref<boolean>;
    error: import("vue").Ref<unknown>;
    execute: (txParams: TxParams) => Promise<Uint8Array>;
};
