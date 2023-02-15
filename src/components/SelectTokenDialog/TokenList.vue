<template>
  <div class="dialog-step">
    <DialogHeader title="Select Tokens" @close="onClose" />
    <div class="search">
      <InputText
        v-model.trim="search"
        spellcheck="false"
        class="search__input"
        placeholder="Put name or address"
        autofocus
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
              <PButton class="coin-import" @click="importToken">Import</PButton>
            </div>
          </div>
          <p v-else class="text-center">Tokens not found</p>
        </template>
      </div>
    </div>
    <div class="dialog-step__footer">
      <div class="dialog-step__divider mb-3" />
      <p-button
          class="p-button-secondary justify-content-center w-full"
          @click="onManageCoinLists"
      >
        Manage Token Lists
      </p-button>
    </div>
  </div>
  <ImportTokenDialog
    ref="importDialog"
    v-model:token="importTokenType"
    :has-back="true"
  />
</template>

<script setup lang="ts">
import { computed, ComputedRef, ref, watch, watchEffect } from 'vue';
import escapeRegExp from 'lodash/escapeRegExp';
import orderBy from 'lodash/orderBy';
import { useTokensStore } from '@/store';
import { IPersistedTokenExtended } from '@/store/useTokenStore';
import ProgressSpinner from 'primevue/progressspinner';
import InputText from 'primevue/inputtext';
import PButton from 'primevue/button';

import { checkAptosType } from '@/utils/utils';
import { TextHighlight } from '@/components/TextHighlight';
import { DialogHeader } from '@/components/DialogHeader';
import { TokenAlert } from '@/components/TokenAlert';
import { TokenIcon } from '@/components/TokenIcon';
import { ImportTokenDialog } from '@/components/ImportTokenDialog';

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

const importTokenPreview = ref();
const importDialog = ref();

const importTokenType = computed(() => importTokenPreview.value?.type);

function onClose() {
  emits('close');
}

const tokensStore = useTokensStore();
const search = ref<string>('');
const searchLoading = ref(false);
const searchRegexp = computed(() => {
  return new RegExp(escapeRegExp(search.value), 'gi');
});

const rawTokenList = async () => {
  let tokens: ComputedRef<IPersistedTokenExtended>[] = [];
  const tokens_ = Object.values(tokensStore.tokens).map(async (token) => {
    return computed(() => tokensStore.getToken(token.type));
  });
  tokens = await Promise.all(tokens_) as unknown as ComputedRef<IPersistedTokenExtended>[];

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
            selectToken(token.type);
            onClose();
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
    ['selected', 'token.caution', 'token.order', 'token.alias'],
    ['desc', 'asc', 'asc', 'asc'],
  );
};

const selectedTokens = computed(() => {
  return [props.secondaryToken, props.actionToken].filter(Boolean);
});

function searchToken(resource: string) {
  searchLoading.value = true;
  const request = tokensStore.searchToken(resource, false);

  console.log('searchToken request', request);

  request?.then(() => (searchLoading.value = false));

  // return () => {
  //   cancel('Rejected by user');
  // };
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

const importToken = () => {
  importDialog.value.show();
};

function onManageCoinLists() {
  emits('navigate', 'manage-presets');
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

watch(search, async (v, _) => {
  if (checkAptosType(v)) {
    const tokenInfo = await tokensStore.getTokenInfo(search.value);
    importTokenPreview.value = tokenInfo && {
      ...tokenInfo,
      logo: tokensStore.getLogoUrl(search.value),
    };
  } else {
    importTokenPreview.value = null;
    searchLoading.value = false;
  }
});
</script>