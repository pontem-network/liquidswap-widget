import { GetRegisteredCoins, GetRegisteredPools } from '../api/types';
export declare function getRegisteredCoins(query: GetRegisteredCoins.Query): Promise<GetRegisteredCoins.Response>;
export declare function getRegisteredPools(query?: GetRegisteredPools.Query): Promise<GetRegisteredPools.Response>;
