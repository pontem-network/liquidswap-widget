import { Ref } from 'vue';
import { ICreateToken, IPoolExist, TVersionType } from '../types';
type CurveType = 'stable' | 'uncorrelated';
export declare function usePoolExistence(): {
    isFetching: (params: IPoolExist, contract?: number) => boolean;
    poolExists: (params: IPoolExist, contract?: number) => boolean;
    check: (params: IPoolExist, contract?: number) => Promise<void>;
    watch: (from: ICreateToken, to: ICreateToken, curve: Ref<CurveType>, version: Ref<TVersionType>) => void;
    reset: (params: IPoolExist, contract?: number) => void;
};
export {};
