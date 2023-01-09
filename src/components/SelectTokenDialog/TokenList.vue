<template>
  <div class="dialog-step">
    <DialogHeader title="Select a coin" @close="onClose" />
    <div class="search">
      <InputText
        v-model.trim="search"
        spellcheck="false"
        class="search__input"
        placeholder="Put name or address"
      />
    </div>
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
                    :text="item.token.alias"
                    :regexp="searchRegexp"
                  /><token-alert :type="item.token.type" />
                </div>
                <div class="token-list-item__title">
                  <TextHighlight
                    :text="item.token.title"
                    :regexp="searchRegexp"
                  />
                </div>
              </div>
            </li>
          </ul>
          <p v-else-if="isLoadingTokensList" class="text-center">Loading...</p>
          <p v-else class="text-center">Coins not found</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, ref, watch, watchEffect } from 'vue';
import escapeRegExp from 'lodash/escapeRegExp';
import orderBy from 'lodash/orderBy';
import { useTokensStore } from '@/store';
import { IPersistedTokenExtended } from '@/store/useTokenStore';
import ProgressSpinner from 'primevue/progressspinner';
import InputText from 'primevue/inputtext';

import { checkAptosType } from '@/utils/utils';
import { TextHighlight } from '@/components/TextHighlight';
import { DialogHeader } from '@/components/DialogHeader';
import { TokenAlert } from '@/components/TokenAlert';
import { TokenIcon } from '@/components/TokenIcon';

interface IProps {
  actionToken?: string;
  secondaryToken?: string;
  poolId?: string;
  field?: 'from' | 'to' | 'none';
}

type TokenInList = {
  token: IPersistedTokenExtended;
  selected: boolean;
  command: (...args: any[]) => void;
};

const props = defineProps<IProps>();
const emits = defineEmits([
  'close',
  'navigate',
  'update:actionToken',
  'update:poolId',
]);

// states
const rawTokenList_ = ref<TokenInList[]>();
const tokenList_ = ref<TokenInList[]>();
const isLoadingTokensList = ref<boolean>(false);

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

const rawTokenList = async () => {
  let tokens: ComputedRef<IPersistedTokenExtended>[] = [];
  const tokens_ = Object.values(tokensStore.tokens).map(async (token) => {
    return computed(() => tokensStore.getToken(token.type));
  });
  tokens = await Promise.all(tokens_);

  const alreadySelected: string[] = [];
  const list: TokenInList[] = tokens
    .map((tokenRef): TokenInList => {
      const token = tokenRef.value;
      let selected = false;
      if (
        selectedTokens.value.length &&
        tokenRef &&
        selectedTokens.value.includes(token.type)
      ) {
        selected = true;
      }

      return {
        token,
        selected,
        command: () => {
          if (!selected) {
            onClose();
            selectToken(token.type);
          }
        },
      };
    })
    .filter((item: TokenInList) => {
      if (!item) {
        return false;
      }
      const identifier = `${item.token.type}-${item.token.alias}`;

      if (item.selected) {
        alreadySelected.push(identifier);
      }

      return true;
    }) as TokenInList[];

  return orderBy(
    list,
    ['selected', 'token.order', 'token.alias'],
    ['desc', 'asc', 'asc'],
  );
};

const selectedTokens = computed(() => {
  return [props.secondaryToken, props.actionToken].filter(Boolean);
});

function searchToken(resource: string) {
  searchLoading.value = true;
  const { cancel, request } = tokensStore.searchToken(resource, true);

  request.then(() => (searchLoading.value = false));

  return () => {
    cancel('Rejected by user');
  };
}

function filterTokenList(list: TokenInList[]) {
  if (!Array.isArray(list) || list.length == 0) return [];
  const searchString = search.value.toLowerCase();
  return list.filter((item: TokenInList) => {
    if (!searchString) {
      return true;
    }
    const aliasLowerCased = item.token.alias.toLowerCase();
    const titleLowerCased = item.token.title.toLowerCase();
    if (
      aliasLowerCased.indexOf(searchString) !== -1 ||
      titleLowerCased.indexOf(searchString) !== -1 ||
      item.token.type.toLowerCase() === searchString
    ) {
      return true;
    }

    return false;
  });
}

function selectToken(token: string) {
  emits('update:actionToken', token);
}

// watchers
watchEffect(async () => {
  isLoadingTokensList.value = true;
  rawTokenList_.value = await rawTokenList();
  isLoadingTokensList.value = false;
});

watchEffect(async () => {
  return (tokenList_.value = filterTokenList(
    rawTokenList_.value as TokenInList[],
  ));
});

watch(search, (v, _, onCleanup) => {
  if (checkAptosType(v)) {
    const cancel = searchToken(v);
    onCleanup(cancel);
  } else {
    searchLoading.value = false;
  }
});
</script>

<style scoped lang="scss">
.search {
  background: var(--surface-card);
  left: 0;
  padding: 10px 0px 20px 0px;
  margin: 0px -4px;
  z-index: 10;

  &__input {
    width: 100%;
    border-radius: 16px;
    background: none;
    border: 1px solid #36354b;
  }
}

.content-container {
  &__loader {
    margin-top: 50px;
    position: absolute;
    width: 100%;
    left: 0;
    display: flex;
  }
}

.select-tokens {
  .p-dialog-content {
    margin-bottom: 1rem !important;
  }

  .select-tokens__footer {
    display: flex !important;
    justify-content: center !important;
  }
}

.token-list {
  list-style: none;
  padding: 0;
  margin: 0 -12px;
}

.list-header {
  color: var(--text-color-secondary);
  font-weight: 500;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 8px 0;
}

.token-list-item {
  display: flex;
  flex-direction: row;
  padding: 12px;
  border-radius: 16px;
  grid-gap: 12px;
  align-items: center;
  cursor: pointer;

  &__stable-indicator {
    align-items: flex-start;
    margin-left: 0.5rem;
    margin-top: 0.2rem;

    & img {
      height: 10px;
    }

    & p {
      margin-block: 0rem !important;
      font-size: 11px;
      margin-left: 0.2rem;
      color: #e5e4fa;
      opacity: 0.6;
    }
  }

  &.is-selected {
    cursor: auto;
    opacity: 0.6;
  }

  &:hover:not(.is-selected) {
    background: #1c1c33;
  }

  &__icon {
    width: 32px;
    height: 32px;

    img,
    .img {
      width: 100%;
      height: 100%;
    }
  }

  &__symbol {
    color: var(--text-color);
    font-weight: 500;
  }

  &__title {
    font-size: 13px;
    color: transparentize(#e5e4fa, 0.4);
  }

  &__content {
    display: flex;
    flex-direction: column;
    height: 38px;
    justify-content: space-between;
  }

  &__append {
    font-size: 13px;
    display: flex;
    margin-left: auto;
    align-items: center;
    color: transparentize(#e5e4fa, 0.4);
  }
}

.pool__address {
  font-family: var(--font-family);
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  margin-block: 0.2rem;
  color: #9292a6;
  opacity: 0.6;
}
</style>
