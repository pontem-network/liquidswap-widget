import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import {
  computed,
  ComputedRef,
  onBeforeMount,
  reactive,
  ref,
  watch,
} from 'vue';
import { isNumber } from 'lodash';
import CoinsRegistry from '@pontem/coins-registry';

import { IStorageBasic, Resource, AptosCoinInfoResource } from '@/types';
import { TCoinSource } from '@/types/coins';
import { APTOS, COIN_INFO, CORRECT_CHAIN_ID } from '@/constants';
import { useStore } from '@/store/useStore';
import { composeType, extractAddressFromType } from '@/utils/contracts';
import { aliasForToken, titleForToken } from '@/utils/tokens';


export interface IPersistedToken {
  type: string;
  chainId: number;
  decimals: number;
  symbol: string;
  name: string;
  address?: string;
  logoURI?: string;
  verified?: boolean;
  source: TCoinSource;
  order?: number;
  caution?: boolean;
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
  const { client } =  useStore();

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
    return item;
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
    const { coins } = CoinsRegistry;
    coins.forEach(processFetchedCoin);
    return registerCoins(coins, mainStore.network.value?.id);
  }

  onBeforeMount(() => loadFromLocalStorage());

  async function loadFromLocalStorage() {
    if (customTokensStorage.value) {
      try {
        const { tokens } = customTokensStorage.value;
        if (!tokens) return;

        for (const token of tokens) {
          // load only coins which can be persisted
          if (PERSISTING_SOURCES.includes(token.source)) {
            await loadToken(token);
          }
        }
      } catch (_e) {
        //
      } finally {
        isReady.value = true;
      }
    }
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

  watch(tokens, (_tokens) => persistCustomToStorage(_tokens));

  const loadToken = async (token: IPersistedToken) => {
    // - - fetch coinInfo from URL
    const coinInfo = composeType(COIN_INFO, [token.type]);
    const resource =
      await client.getAccountResource(
        extractAddressFromType(token.type),
        coinInfo,
      );

    if (!resource) {
      // TODO: Process error
      return undefined;
    }

    console.log('useTokenStore', resource.data);

    tokens[token.type].name = resource.data.name;
    tokens[token.type].symbol = resource.data.symbol;
    tokens[token.type].decimals = +resource.data.decimals;
    tokens[token.type].alias = aliasForToken(token);
    tokens[token.type].title = titleForToken(token);
    tokens[token.type].logo = getLogoUrl.value(resource.data.symbol);

    return tokens[token.type];
  };

  const token: ComputedRef<() => IPersistedToken | undefined> = computed(
    () => (type?: string) => type ? tokens[type] : undefined,
  );

  const getLogoUrl = computed(() => {
    const images = require.context('../assets/tokens', false, /\.svg|.png$/);

    return (symbol: string) => {
      try {
        return images(`./${symbol.toLowerCase()}.svg`);
      } catch (_e) {
        return undefined;
        // return require('@/assets/tokens/unknown.svg');
      }
    };
  });

  /**
   * Get extended token object
   *
   * @param type token type
   * @returns
   */
  function getToken(type?: string): IPersistedTokenExtended | undefined {
    return type && tokens[type] ? tokens[type] : undefined;
  }

  function registerToken(token: IPersistedToken, { rewrite = false }) {
    const { type } = token;

    // TODO: Check try to register a duplicate
    if (!rewrite && tokens[type]) {
      if (!tokens[type].order && isNumber(token?.order)) {
        tokens[type].order = token.order;
      }
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
      alias: aliasForToken(token),
      title: titleForToken(token),
      logo: getLogoUrl.value(token.symbol),
    };

    return tokens[type];
  }

  function searchToken(type: string, withCancel?: false): Promise<any>;
  function searchToken(
    type: string,
    withCancel: true,
  ): { request: Promise<any>; cancel: (message?: string) => void };
  function searchToken(type: string, withCancel: any): any {
    if (tokens[type]) {
      return withCancel
        ? {
          cancel: () => {},
          request: Promise.resolve(tokens[type]),
        }
        : Promise.resolve(tokens[type]);
    }

    const promise = client.getAccountResource(
      extractAddressFromType(type),
      composeType(COIN_INFO, [type]),
      {
        cancelToken: !!withCancel,
      },
    );
    const request = withCancel ? promise.request : promise;

    request.then((resource?: Resource<AptosCoinInfoResource>) => {
      if (!resource) {
        return;
      }

      const data = resource.data;

      return registerToken(
        {
          name: data.name,
          symbol: data.symbol,
          decimals: +data.decimals,
          chainId: mainStore.networkId.value,
          source: 'import',
          order: 1,
          type,
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

  async function getTokenInfo(
    token: string,
    remote?: boolean,
  ): Promise<IPersistedToken | undefined> {
    if (tokens[token] && !remote) {
      return tokens[token];
    }

    const coinInfo = composeType(COIN_INFO, [token]);
    const resource =
      await client.getAccountResource(
        extractAddressFromType(token),
        coinInfo,
      ) as unknown as PromiseLike<AptosCoinInfoResource>;

    if (!resource) {
      return undefined;
    }

    const registeredToken: IPersistedToken = {
      type: token,
      chainId: mainStore.networkId.value,
      name: resource.data.name,
      symbol: resource.data.symbol,
      decimals: +resource.data.decimals,
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

  function registerCoins(list: IPersistedToken[], networkId: number): void {
    list
      .filter((token: IPersistedToken) => token.chainId === networkId)
      .map((token: IPersistedToken) =>
        registerToken(token, {
          // safe: true,
          rewrite: true,
        }),
      );
  }

  watch(
    mainStore.network,
    async (network) => {
      if (!network) {
        return;
      }
      // TODO: Check tokens not valid for network
      registerCoins(coins.value, network.id);
    },
    { immediate: true },
  );

  return {
    getLogoUrl,
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
  };
});
