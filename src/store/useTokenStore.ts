import { APTOS, CORRECT_CHAIN_ID } from '@/constants/constants';
import { IStorageBasic, Resource } from '@/types';
import { TCoinSource } from '@/types/coins';
import { useStore } from '@/store';
import { AptosCoinInfoResource } from '@/types/aptosResources';
import { nope } from '@/utils/utils';
import { composeType, extractAddressFromType } from '@/utils/contracts';
import { aliasForToken, titleForToken } from '@/utils/tokens';
import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ComputedRef, reactive, ref, watch } from 'vue';
import isNumber from 'lodash/isNumber';
import { getRegisteredCoins } from "@/api/helpers";

export interface IPersistedToken {
  type: string;
  chainId: number;
  decimals: number;
  symbol: string;
  name: string;
  address?: string;
  logo?: string;
  logo_url?: string;
  verified?: boolean;
  source: TCoinSource;
  order?: number;
  caution?: boolean;
  unsafe?: boolean;
}

export interface IPersistedTokenExtended extends IPersistedToken {
  logo: string;
  alias: string;
  title: string;
}

interface IStorage extends IStorageBasic {
  tokens: IPersistedToken[];
}

const PERSISTING_SOURCES = ['import', 'pool'];

export const useTokensStore = defineStore('tokensStore', () => {
  const mainStore = useStore();

  const { client, modules } =  useStore();

  const tokens = reactive<Record<string, IPersistedTokenExtended>>({});
  const isReady = ref(false);
  const customTokensStorage = useStorage<IStorage>(
    'customTokens',
    { tokens: [], version: 1 },
    window.localStorage,
    { writeDefaults: true },
  );

  /**
   * Storage for all added coins
   */
  const coins = ref<IPersistedToken[]>([
    {
      source: 'pontem',
      name: 'Aptos Coin',
      chainId: CORRECT_CHAIN_ID,
      decimals: 8,
      symbol: 'APT',
      type: APTOS,
    },
  ]);

  /**
   * Set to store types of verified tokens
   */
  const verifiedTokensTypes = new Set([APTOS]);

  function processFetchedCoin(item: IPersistedToken) {
    coins.value.push(item);
    if (!item?.caution) {
      verifiedTokensTypes.add(item.type);
    }
  }

  /**
   * Check is token verified
   *
   * @param type token full type
   * @returns boolean true if token verified
   */
  function isTokenVerified(type: string): boolean {
    return verifiedTokensTypes.has(type);
  }

  async function fetchCoinsList() {
    const coins = await getRegisteredCoins({ networkId: CORRECT_CHAIN_ID })

    coins.forEach(processFetchedCoin);
    return await registerCoins(coins, mainStore.network.value?.id);
  }

  async function fetchCoinsData() {
    const result = await Promise.all([
      loadFromLocalStorage(),
      fetchCoinsList(),
    ]);
    return result;
  }

  async function loadFromLocalStorage() {
    if (customTokensStorage.value) {
      try {
        const { tokens } = customTokensStorage.value;
        if (!tokens) return;

        const tokensCandidates = tokens.filter((token) => {
          return PERSISTING_SOURCES.includes(token.source);
        });

        return await Promise.all(
          tokensCandidates.map((token) => {
            return loadToken(token);
          }),
        );
      } catch (_e) {
        console.error('tokensStore:loadFromLocalStorage', _e);
      } finally {
        isReady.value = true;
      }
    }
    return;
  }

  function persistCustomToStorage(
    _tokens: Record<string, IPersistedToken>,
    canClean?: boolean,
  ) {
    const customKeys = Object.keys(_tokens).filter((key) =>
      PERSISTING_SOURCES.includes(_tokens[key].source),
    );
    if (!canClean && customKeys.length == 0) return;
    let { version } = customTokensStorage.value;
    // TODO: make an update logic while stored coins structure will be updated
    version = version ?? '1';
    customTokensStorage.value = {
      version,
      tokens: customKeys.map((key) => _tokens[key]),
    };
  }

  watch(tokens, (_tokens) => {
    persistCustomToStorage(_tokens);
  });

  const loadToken = async (token: IPersistedToken) => {
    // - - fetch coinInfo from URL
    const coinInfo = composeType(modules.CoinInfo, [token.type]);
    const resource =
      await client.getAccountResource(
        extractAddressFromType(token.type),
        coinInfo,
      ) as unknown as Promise<Resource | undefined> | any;

    if (!resource) {
      // TODO: Process error
      return undefined;
    }

    const loadingToken: IPersistedToken = {
      type: token.type,
      name: resource.data.name,
      symbol: resource.data.symbol,
      decimals: +resource.data.decimals,
      chainId: token.chainId,
      source: token.source,
      order: token.order,
    };

    return registerToken(loadingToken, { rewrite: true });
  };

  const token: ComputedRef<() => IPersistedToken | undefined> = computed(
    () => (type?: string) => type ? tokens[type] : undefined,
  );

  /**
   * Get an extended token object.
   * The list of tokens is formed from coins-registry/coins and tokens from local storage.
   * @param type token type
   * @returns
   */
  function getToken(type?: string): IPersistedTokenExtended | undefined {
    return type && tokens[type] ? tokens[type] : undefined;
  }

  async function registerToken(
    token: IPersistedToken,
    { rewrite = false },
  ): Promise<IPersistedTokenExtended> {
    const { type } = token;

    // TODO: Check try to register a duplicate
    if (!rewrite && tokens[type]) {
      if (!tokens[type].order && isNumber(token?.order)) {
        tokens[type].order = token.order;
      }
      return tokens[type];
    }

    if (token?.unsafe) {
      return tokens[type];
    }

    tokens[type] = {
      type,
      chainId: token.chainId, // *
      address: token.address, // *
      decimals: +token.decimals, // *
      name: token.name, // *
      symbol: token.symbol, // *
      source: token.source,
      order: token.order || 1000,
      caution: token.caution || false,
      alias: aliasForToken(token),
      title: titleForToken(token),
      logo: token.logo_url || '',
    };

    return tokens[type];
  }

  function searchToken(
    type: string,
    withCancel?: false,
  ): Promise<IPersistedTokenExtended>;
  function searchToken(
    type: string,
    withCancel: true,
  ): {
    request: Promise<IPersistedTokenExtended>;
    cancel: (message?: string) => void;
  };
  function searchToken(type: string, withCancel?: boolean): any {
    if (tokens[type]) {
      return withCancel
        ? {
          cancel: nope,
          request: Promise.resolve(tokens[type]),
        }
        : Promise.resolve(tokens[type]);
    }

    const promise = client.getAccountResource(
      extractAddressFromType(type),
      composeType(modules.CoinInfo, [type]),
    )as unknown as any;
    const request = withCancel ? promise.request : promise;

    request.then((resource?: Resource<AptosCoinInfoResource>) => {
      if (!resource) {
        return;
      }

      const { data } = resource;

      return registerToken(
        {
          type,
          name: data.name,
          symbol: data.symbol,
          decimals: +data.decimals,
          chainId: mainStore.networkId.value,
          caution: true,
          source: 'import',
          order: 1000,
        },
        {
          rewrite: false,
        },
      );
    });

    if (withCancel) {
      return {
        request: promise.request,
        cancel: promise.cancel,
      };
    }

    return promise;
  }

  //TODO: APT-420 getTokenInfo func could save received token to store immediately
  async function getTokenInfo(
    token: string,
    remote?: boolean,
  ): Promise<IPersistedToken | undefined> {
    if (tokens[token] && !remote) {
      return tokens[token];
    }

    const coinInfo = composeType(modules.CoinInfo, [token]);
    const resource =
      await client.getAccountResource(
        extractAddressFromType(token),
        coinInfo,
      ) as unknown as any;

    if (!resource) {
      return undefined;
    }

    const registeredToken: IPersistedToken = {
      type: token,
      chainId: mainStore.networkId.value,
      name: resource.data.name,
      symbol: resource.data.symbol,
      decimals: +resource.data.decimals,
      caution: true,
      source: 'import',
    };

    return registeredToken;
  }

  const importedTokens: ComputedRef<IPersistedTokenExtended[]> = computed(
    () =>
      Object.keys(tokens)
        .filter((type) => tokens[type].source === 'import') // 'pool', 'import'
        .map((type: string) => getToken(type))
        .filter(Boolean) as IPersistedTokenExtended[],
  );

  function removeToken(token: IPersistedToken) {
    delete tokens[token.type];
    persistCustomToStorage(tokens, true);
  }

  function registerCoins(list: IPersistedToken[], networkId: number) {
    const registerQueries = list
      .filter((token: IPersistedToken) => token.chainId === networkId)
      .map((token: IPersistedToken) =>
        registerToken(token, {
          // safe: true,
          rewrite: true,
        }),
      );

    return Promise.all(registerQueries);
  }

  watch(
    mainStore.network,
    async (network) => {
      if (!network) {
        return;
      }
      // isLoading.value = true;
      // TODO: Check tokens not valid for network
      await registerCoins(coins.value, network.id);
      // isLoading.value = false;
      // isReady.value = true;
    },
    { immediate: true },
  );

  return {
    getToken,
    tokens,
    token,
    registerToken,
    searchToken,
    getTokenInfo,
    importedTokens,
    removeToken,
    isReady,
    isTokenVerified,
    fetchCoinsList,
    fetchCoinsData,
  };
});
