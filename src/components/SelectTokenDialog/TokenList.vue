<template>
  <div class="dialog-step">
    <div class="search">
      <InputText
          v-model.trim="search"
          data-tid="token-list-search-input"
          spellcheck="false"
          class="search__input"
          placeholder="Search name or paste address"
          autofocus
      />
    </div>
    <div class="filter-buttons">
      <PButton
          class="filter-buttons__item p-button p-button-secondary justify-content-center"
          :class="{ 'filter-buttons__item_selected': currentFilter === 'top' }"
          @click="selectFilter('top')"
      > Top
      </PButton>
      <PButton
          class="filter-buttons__item p-button p-button-secondary justify-content-center"
          :class="{ 'filter-buttons__item_selected': currentFilter === 'native' }"
          @click="selectFilter('native')"
      > Native
      </PButton>
      <PButton
          class="filter-buttons__item p-button p-button-secondary justify-content-center"
          :class="{
          'filter-buttons__item_selected': currentFilter === 'bridged',
        }"
          @click="selectFilter('bridged')"
      > Bridged
      </PButton>
    </div>
    <template v-if="address && !temporallyHideBalance">
      <div class="divider" />
      <div class="tvl-sort">
        <span class="tvl-sort__title">Token</span>
        <div class="tvl-sort__metric" @click="onClickBalance">
          Balance
          <img
              class="tvl-sort__img"
              :class="isBalanceSortedDesc ? '' : 'tvl-sort__img_selected'"
              width="12"
              src="@/assets/pools/dropdown.svg"
          />
        </div>
      </div>
    </template>
    <div class="divider" />
    <div class="dialog-step__divider" />
    <div class="dialog-step__content">
      <div class="content-container with-search">
        <div v-if="searchLoading" class="content-container__loader">
          <ProgressSpinner />
        </div>
        <template v-if="!searchLoading">
          <ul v-if="tokenList_ && tokenList_.length" class="token-list">
            <li
                v-for="item in tokenList_"
                :key="item.token.type"
                class="token-list-item"
                :class="{ 'is-selected': item.selected }"
                @click="item.command"
            >
              <div class="token-list-item__icon">
                <TokenIcon
                    :logo="item.token.logo"
                    :type="item.token.type"
                    size="32"
                />
              </div>
              <div class="token-list-item__content">
                <div class="token-list-item__symbol flex">
                  <TextHighlight
                      :text="item.token.symbol"
                      :regexp="searchRegexp"
                  /><token-alert :type="item.token.type" />
                </div>
                <div class="token-list-item__title">
                  <TextHighlight
                      :text="item.token.title"
                      :regexp="searchRegexp"
                  />
                  <div class="token-list-item__state">
                    <span
                        v-if="isDefaultToken(item.token.type)"
                        class="token-list-item__state_verified"
                    >
                      Verified
                    </span>
                    <span v-else class="token-list-item__state_unverified">
                      Unverified
                    </span>
                  </div>
                </div>
              </div>
              <span class="token-list-item__balance">{{
                  balanceInUsd2Label(item.token.balanceInUsd)
                }}</span>
            </li>
          </ul>
          <p v-else-if="isLoadingTokensList" class="text-center">
            Loading...
          </p>
          <div v-else-if="importTokenPreview" class="import-coin-wrap">
            <TokenIcon
                :logo="importTokenPreview?.logo"
                :type="importTokenPreview?.type"
                class="img"
                size="32"
            />
            <div class="coin-wrap__labels">
              <h3 class="coin-symbol">{{ importTokenPreview?.symbol }}</h3>
              <p
                  v-if="importTokenPreview?.symbol !== importTokenPreview?.name"
                  class="coin-name"
              >
                {{ importTokenPreview?.name }}
              </p>
            </div>
            <div class="coin-wrap__actions">
              <PButton class="coin-import" @click="importToken">
                Import
              </PButton>
            </div>
          </div>
          <p v-else class="text-center">
            Tokens not found
          </p>
        </template>
      </div>
    </div>
  </div>
  <ImportTokenDialog
      ref="importDialog"
      v-model:token="importTokenType"
      :has-back="true"
  />
</template>

<script setup lang="ts">
import {
  computed,
  ComputedRef,
  onBeforeMount,
  Ref,
  ref,
  watch,
  watchEffect,
} from 'vue';
import escapeRegExp from 'lodash/escapeRegExp';
import orderBy from 'lodash/orderBy';
import {
  usePoolsStore, useStore,
  useTokensStore,
} from '@/store';
import { IPersistedTokenExtended } from '@/store/useTokenStore';
import { checkAptosType } from '@/utils/utils';
import { TextHighlight } from '@/components/TextHighlight';
import { TokenAlert } from '@/components/TokenAlert';
import { TokenIcon } from '@/components/TokenIcon';
import PButton from 'primevue/button';
import { ImportTokenDialog } from '@/components/ImportTokenDialog';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';

import { useCurrentAccountBalance } from '@/composables/useAccountBalance';
import { useCurrencyFormat } from '@/composables/useCurrencyFormat';
import { getTokenPrice, getUSDEquivalent } from '@/composables/useCoinPrice';
import { getAmountWithDecimal } from '@/composables/useInputServices';
import { BRIDGES } from '@/constants/tokensList';
import { getFromCache } from '@/utils/cache';


interface IProps {
  actionToken?: string;
  secondaryToken?: string;
  poolId?: string;
}

interface IExtendedTokenInList extends IPersistedTokenExtended {
  balance?: Ref<number | undefined>;
  balanceInUsd?: number;
  tvl?: number;
  tvlInUsd?: number;
}

type TTokenInList = {
  token: IExtendedTokenInList;
  selected: boolean;
  promoted: boolean;
  command: (...args: any[]) => void;
};
type TTokensBalance = { amount: number | undefined; token: string };
type TFilterSelector = 'top' | 'native' | 'bridged' | undefined;

const props = defineProps<IProps>();
const emits = defineEmits([
  'close',
  'back',
  'navigate',
  'update:actionToken',
  'update:poolId',
]);

const temporallyHideBalance = true;

const poolsStore = usePoolsStore();
const store = useStore();

// states
const rawTokenList_ = ref<TTokenInList[]>();
const tokenList_ = ref<TTokenInList[]>();
const isLoadingTokensList = ref<boolean>(false);

const importTokenPreview = ref();
const importTokenType = computed(() => importTokenPreview.value?.type);
const importDialog = ref();

// filters and sorting
const currentFilter = ref<TFilterSelector>();
const isBalanceSortedDesc = ref(true);
const isSortedByTvlInUsd = ref(false);
const isFilteredByConditions = ref(false);

const { account } = useStore();
const address = computed(() => account.value?.address);

onBeforeMount(() => {
  if (!address.value) {
    selectFilter('top');
  }
});

function onClose() {
  emits('close');
}

const tokensStore = useTokensStore();
const search = ref<string>('');
// TODO: Process search string with address
const searchLoading = ref(false);
const searchRegexp = computed(() => {
  return new RegExp(escapeRegExp(search.value), 'gi');
});

const promotedToken = computed(() => store.promotedToken.value);

const rawTokenList = async () => {
  let tokens: ComputedRef<IExtendedTokenInList>[] = [];

  const tokens_ = Object.values(tokensStore.tokens).map(async (token) => {
    return computed(() => tokensStore.getToken(token.type));
  });

  tokens = await Promise.all(tokens_) as unknown as ComputedRef<IPersistedTokenExtended>[];

  const alreadySelected: string[] = [];

  // avoid displaying balances when the wallet is disconnected
  if (address.value && !temporallyHideBalance) {
    const cacheKey = `${address.value}-tokens-balance`;

    //Cache to avoid loading every time you open the sidebar
    const balances = await getFromCache(cacheKey, fetchBalanceForTokens, {
      time: 60000,
      args: [tokens],
    });

    // Calculate balance in USD for each token
    balances.forEach((item: TTokensBalance) => {
      if (!item) return;
      const { amount, token } = item;

      const tokenRef = tokens.find((e) => e.value.type === token);
      if (!tokenRef || amount === undefined) return;

      _fetchAndSetBalanceInUsd(tokenRef, amount);
    });
  } else {
    //Reset the balances when wallet is disconnected
    tokens.forEach((tokenRef) => {
      if (tokenRef.value.balanceInUsd) {
        tokenRef.value.balanceInUsd = 0;
      }
    });
  }

  const mappedTokensList = tokens.map((tokenRef: any) => {
    let selected = false;
    let promoted = false;

    if (
        selectedTokens.value.length &&
        tokenRef &&
        selectedTokens.value.includes(tokenRef.value.type)
    ) {
      selected = true;
    }

    if (promotedToken.value && tokenRef && promotedToken.value === tokenRef.value.type) {
      promoted = true;
    }

    _calculateTvl(tokenRef);

    return {
      token: tokenRef,
      selected,
      promoted,
      command: () => {
        if (!selected) {
          selectToken(tokenRef.value.type);
          onClose();
        }
      },
    };
  });

  const filteredList = mappedTokensList.filter((item) => {
    if (!item) {
      return false;
    }
    /**
     * item.token is reactive here
     */
    const identifier = `${item.token.value.type}-${item.token.value.symbol}`;

    if (item.selected) {
      alreadySelected.push(identifier);
    }

    return true;
  }) as TTokenInList[];

  return orderBy(
      filteredList,
      ['selected', 'promoted', 'token.caution', 'token.order', 'token.alias'],
      ['desc', 'desc', 'asc', 'asc', 'asc'],
  );
};

const selectedTokens = computed(() => {
  return [props.secondaryToken, props.actionToken].filter(Boolean);
});

const importToken = () => {
  importDialog.value.show();
};

/**
 * Filter through the search bar
 * @param list
 */
function filterTokenList(list: TTokenInList[]) {
  if (!Array.isArray(list) || list.length == 0) return [];
  const searchString = search.value.toLowerCase();
  return list.filter((item: TTokenInList) => {
    if (!searchString) {
      return true;
    }
    const symbolLowerCased = item.token.symbol.toLowerCase();
    const titleLowerCased = item.token.title.toLowerCase();
    if (
        symbolLowerCased.indexOf(searchString) !== -1 ||
        titleLowerCased.indexOf(searchString) !== -1 ||
        item.token.symbol.toLowerCase() === searchString
    ) {
      return true;
    }

    return false;
  });
}

function selectToken(token: string) {
  emits('update:actionToken', token);
  search.value = '';
}

function selectFilter(filter: TFilterSelector) {
  currentFilter.value =
      currentFilter.value && currentFilter.value === filter ? undefined : filter;

  switch (currentFilter.value) {
    case 'top': {
      isSortedByTvlInUsd.value = true;
      isBalanceSortedDesc.value = false;
      break;
    }
    case 'native': {
      isFilteredByConditions.value = true;
      isBalanceSortedDesc.value = false;
      isSortedByTvlInUsd.value = false;
      break;
    }
    case 'bridged': {
      isFilteredByConditions.value = true;
      isBalanceSortedDesc.value = false;
      isSortedByTvlInUsd.value = false;
      break;
    }
    default: {
      isFilteredByConditions.value = false;
      isBalanceSortedDesc.value = true;
      isSortedByTvlInUsd.value = false;
      break;
    }
  }
}

/**
 * Descending sorting by balance in usd.
 * Spread operator is used to avoid side effect in computed.
 */
const sortedByBalanceDesc = computed(() => {
  if (!rawTokenList_.value?.length) return;

  // First we sort by undefined field
  const undefinedHandled = [...rawTokenList_.value].sort((a, b) =>
      compByUndefined(a.token.balanceInUsd, b.token.balanceInUsd),
  );

  // Second we filter by balanceInUsd field
  if (isBalanceSortedDesc.value) {
    return undefinedHandled.sort(
        (a, b) => b.token.balanceInUsd - a.token?.balanceInUsd,
    );
  } else {
    return undefinedHandled.sort(
        (a, b) => a.token.balanceInUsd - b.token.balanceInUsd,
    );
  }
});

/**
 * sorting by token attributes
 * 2. native - not bridge
 * 3. bridged - bridge token
 */
const filteredByConditions = computed(() => {
  switch (currentFilter.value) {
    case 'native': {
      return rawTokenList_.value?.filter(
          (item) => !isBridged(item.token.source),
      );
    }
    case 'bridged': {
      return rawTokenList_.value?.filter((item) =>
          isBridged(item.token.source),
      );
    }
    default: {
      return rawTokenList_.value;
    }
  }
});

const sortedByTvlInUsd = computed(() => {
  if (!rawTokenList_.value?.length) return [];

  // First we sort by undefined field
  const undefinedProcessed = [...rawTokenList_.value].sort((a, b) =>
      compByUndefined(a.token.tvlInUsd, b.token.tvlInUsd),
  );
  return undefinedProcessed.sort((a, b) => b.token.tvlInUsd - a.token.tvlInUsd);
});

/**
 * A small state manager for filtering and sorting
 */
const sortedTokens = computed(() => {
  if (isBalanceSortedDesc.value) {
    return sortedByBalanceDesc.value;
  } else if (isSortedByTvlInUsd.value) {
    return sortedByTvlInUsd.value;
  } else if (isFilteredByConditions.value) {
    return filteredByConditions.value;
  } else {
    return sortedByBalanceDesc.value;
  }
});

// watchers
watchEffect(async () => {
  isLoadingTokensList.value = true;
  account.value; //for the address change trigger
  rawTokenList_.value = await rawTokenList();
  isLoadingTokensList.value = false;
});

watchEffect(async () => {
  if (isLoadingTokensList.value) return;
  return (tokenList_.value = filterTokenList(
      sortedTokens.value as TTokenInList[],
  ));
});

watch(search, async (v, _) => {
  if (checkAptosType(v)) {
    importTokenPreview.value = await tokensStore.getTokenInfo(search.value);
  } else {
    importTokenPreview.value = null;
    searchLoading.value = false;
  }
});

function balanceInUsd2Label(amount: number | undefined) {
  return amount ? `${+amount.toFixed(4)} $` : '';
}

/**
 * Function of fetching the balance of the token in usd
 * @param tokenRef
 * @param amount
 */
function _fetchAndSetBalanceInUsd(
    tokenRef: ComputedRef<IExtendedTokenInList>,
    amount: number,
) {
  const symbol = tokenRef.value.symbol;
  getTokenPrice(symbol)
      .then((price) => {
        if (!price) return;
        const formattedAmount = useCurrencyFormat(amount, tokenRef.value.type, {
          useSuffix: false,
        }).formatted.value;

        tokenRef.value.balanceInUsd = getUSDEquivalent(+formattedAmount, price);
      })
      .catch((error: Error) => console.error('TokenList:fetch prices', error));
}

/**
 * TVL counting. This is the amount of reserves for the token for each pool.
 * @param tokenRef
 */
function _calculateTvl(tokenRef: ComputedRef<IExtendedTokenInList>) {
  const tokenType = tokenRef.value.type;
  let tokenTvl = 0;
  poolsStore.poolsMapAsArray.forEach((item) => {
    if (item.coinX === tokenType) {
      tokenTvl += item.reserveX;
    }
    if (item.coinY === tokenType) {
      tokenTvl += item.reserveY;
    }
  });

  tokenRef.value.tvl = tokenTvl;

  getTokenPrice(tokenRef.value.symbol).then((price) => {
    if (!price) return;
    const decimalAmount = getAmountWithDecimal(
        tokenTvl,
        tokenRef.value.decimals,
    );
    const usd = getUSDEquivalent(decimalAmount, price);
    tokenRef.value.tvlInUsd = usd;
  });
}

function isBridged(source: string) {
  return BRIDGES.includes(source);
}

function isDefaultToken(type: string) {
  return tokensStore.isTokenVerified(type);
}

function onClickBalance() {
  isBalanceSortedDesc.value = !isBalanceSortedDesc.value;
  isSortedByTvlInUsd.value = false;
  isFilteredByConditions.value = false;
  currentFilter.value = undefined;
}

/**
 * Moves objects with the undefined attribute to the end of list
 * @param a
 * @param b
 */
function compByUndefined(a: number | undefined, b: number | undefined) {
  const aHas = typeof a !== 'undefined';
  const bHas = typeof b !== 'undefined';
  return bHas - aHas || (aHas === true && a - b) || 0;
}

/**
 * Small workaround.
 * Returns a promise with the resolved balance for each token from the list.
 * important: useCurrentAccountBalance.balance - it is a reactive variable that changes over time
 * @param tokens
 */
async function fetchBalanceForTokens(tokens: any) {
  return await Promise.all(
      tokens.map(
          (
              tokenRef: ComputedRef<IExtendedTokenInList>,
          ): Promise<TTokensBalance> => {
            return new Promise((resolve, _) => {
              // requesting a balance
              const amountOfToken = useCurrentAccountBalance(
                  tokenRef.value.type,
              ).balance;

              // taking the value from balance after loading
              setTimeout(() => {
                return resolve({
                  amount: amountOfToken.value,
                  token: tokenRef.value.type,
                });
              }, 500);
            });
          },
      ),
  );
}
</script>
