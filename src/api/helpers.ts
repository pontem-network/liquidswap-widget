import { apiUrls } from '@/api/urls';
import {GetRegisteredCoins, GetRegisteredPools} from "@/api/types";
import { fetch } from '@/utils/fetch';

export async function getRegisteredCoins(query: GetRegisteredCoins.Query) {
  const config = { params: query };

  try {
    return await fetch<GetRegisteredCoins.Response>(
      apiUrls.coinsRegistered,
      config,
    );
  } catch (error) {
    console.log('getRegisteredCoins error:', error);

    return [];
  }
}

export async function getRegisteredPools(query?: GetRegisteredPools.Query) {
  try {
    return await fetch<GetRegisteredPools.Response>(apiUrls.poolsRegistered, {
      params: query,
    });
  } catch (error) {
    console.log('getRegisteredPools error:', error);
    return []
  }
}

