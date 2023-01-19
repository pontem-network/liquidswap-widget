import { Ref } from 'vue';
import { ICreateToken, IPoolExist } from '../types';
export declare function usePoolExistence(): {
    isFetching: Ref<boolean>;
    poolExists: Ref<boolean>;
    check: (params: IPoolExist) => Promise<void>;
    watch: (from: ICreateToken, to: ICreateToken, curve: Ref<string>) => void;
    reset: () => void;
};
