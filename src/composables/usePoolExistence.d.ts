import { Ref } from 'vue';
import { ICreateToken, IPoolExist, TVersionType } from '../types';
declare type CurveType = 'stable' | 'uncorrelated';
export declare function usePoolExistence(): {
    isFetching: Ref<boolean>;
    poolExists: Ref<boolean>;
    check: (params: IPoolExist) => Promise<void>;
    watch: (from: ICreateToken, to: ICreateToken, curve: Ref<CurveType>, version: Ref<TVersionType>) => void;
    reset: () => void;
};
export {};
