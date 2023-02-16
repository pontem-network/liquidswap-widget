<template>
  <div class="coins-list">
    <div class="address-import">
      <span class="address-import__label">Put a token address</span>
      <InputText
        v-model.trim="addressImportStr"
        spellcheck="false"
        class="address-import__input"
        placeholder="0x0000"
      />
    </div>
    <div v-show="hasPreview" class="coin-preview mb-3">
      <div class="coin-wrap">
        <TokenIcon
          :logo="tokenPreview?.logo"
          :type="tokenPreview?.type"
          class="img"
          size="32"
        />
        <div class="coin-wrap__labels">
          <h3 class="coin-symbol">{{ tokenPreview?.symbol }}</h3>
          <p
            v-if="tokenPreview?.symbol !== tokenPreview?.name"
            class="coin-name"
          >
            {{ tokenPreview?.name }}
          </p>
        </div>
        <div class="coin-wrap__actions">
          <PButton class="coin-import" @click="importToken">Import</PButton>
        </div>
      </div>
    </div>
    <div class="dialog-step__divider" />
    <div v-if="importedCoins.length > 0" class="imported-coins">
      <h2 class="title">Custom coins</h2>
      <div class="list-wrap">
        <div
          v-for="(one, index) in importedCoins"
          :key="index"
          class="coin-wrap -nobg"
        >
          <TokenIcon
            :logo="one?.logo"
            :type="one?.type"
            class="img"
            size="32"
          />
          <div class="coin-wrap__labels">
            <h3 class="coin-symbol">
              {{ one.alias }}<token-alert type="one.type" />
            </h3>
            <p
              v-show="one.name?.length > 0 && one.alias !== one.title"
              class="coin-name"
            >
              {{ one.title }}
            </p>
          </div>
          <div class="coin-wrap__actions">
            <PButton
              class="p-button-rounded p-button-text coin-remove"
              @click="removeToken(one)"
            >
              <i class="pi pi-trash" />
            </PButton>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-imported-coins">
      <h2 class="title">No custom coins</h2>
      <p class="description">Search by coin contract address</p>
    </div>
  </div>
  <ImportTokenDialog
    ref="importDialog"
    v-model:token="tokenType"
    :has-back="true"
  />
</template>

<script lang="ts" setup>
import { computed, ComputedRef, ref, watch } from 'vue';
import { useTokensStore } from '@/store';
import { IPersistedTokenExtended } from '@/store/useTokenStore';
import ImportTokenDialog from '@/components/ImportTokenDialog/ImportTokenDialog.vue';
import { TokenAlert } from '@/components/TokenAlert';
import { TokenIcon } from '@/components/TokenIcon';
import PButton from 'primevue/button';
import InputText from 'primevue/inputtext';

const tokensStore = useTokensStore();

const addressImportStr = ref<string>('');
const tokenPreview = ref();

const importDialog = ref();
const tokenType = computed(() => tokenPreview.value?.type);

const hasPreview = computed(
  () =>
    addressImportStr.value.length > 0 && tokenPreview.value?.symbol?.length > 0,
);

watch(addressImportStr, async () => {
  let firstPart = addressImportStr.value;
  if (addressImportStr.value.indexOf('<') !== -1) {
    firstPart = addressImportStr.value.substring(
      0,
      addressImportStr.value.indexOf('<'),
    );
  }
  if (firstPart.split('::').length !== 3) return;
  tokenPreview.value = {
    ...(await tokensStore.getTokenInfo(addressImportStr.value)),
    logo: tokensStore.getLogoUrl(addressImportStr.value),
  };
});

function importToken() {
  importDialog.value.show();
  addressImportStr.value = '';
}

const importedCoins: ComputedRef<IPersistedTokenExtended[]> = computed(
  (): IPersistedTokenExtended[] => tokensStore.importedTokens,
);

function removeToken(toRemove: IPersistedTokenExtended) {
  // TODO: prompt
  // TODO: Add tokensInput update
  tokensStore.removeToken(toRemove);
}
</script>
