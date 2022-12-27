<template>
  <div class="coins-list">
    <div class="address-import">
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

<style lang="scss" scoped>
.coins-list {
  position: relative;
  max-height: calc(100% - 80px);
  overflow: hidden;
  height: fill-available;
}

.address-import {
  background: var(--surface-card);
  width: 100%;
  display: flex;
  padding: 16px 0;

  &__input {
    min-width: 100%;
    display: flex;
    border-radius: 16px;
    background: transparent;
    border: 1px solid #36354b;
  }
}

.coin-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 16px;
  background: #28253e;
  padding: 12px;

  &.-nobg {
    background: transparent;
  }
  .img {
    width: 32px;
    height: 32px;
    margin-right: 12px;
  }
  .coin-wrap__labels {
    display: block;
    margin-right: auto;

    .coin-symbol {
      margin: 0 0 1px;
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
      letter-spacing: 0.03em;
      color: #e5e4fa;
    }

    .coin-name {
      margin: 0;
      font-weight: 400;
      font-size: 13px;
      line-height: 18px;
      letter-spacing: -0.0008em;
      color: #e5e4fa;
      opacity: 0.6;
    }
  }

  .coin-import {
    border-radius: 70px;
  }
}

.no-imported-coins {
  height: calc(100% - 90px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    margin: 0;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    letter-spacing: 0.15px;
    color: #e5e4fa;
  }
  .description {
    min-height: 60px;
    font-weight: 400;
    font-size: 15px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.44px;
    color: #77768c;
  }
}

.dialog-step__divider {
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  display: flex;
  align-items: center;
  letter-spacing: 0.15px;
  color: #e5e4fa;
}

::-webkit-scrollbar {
  width: 6px;
  height: 95px;
}

::-webkit-scrollbar-thumb {
  background-color: #e5e4fa30;
  opacity: 0.3;
  border-radius: 40px;
}

.imported-coins {
  position: relative;
  max-height: calc(100% - 75px);
  overflow-x: hidden;
  overflow-y: auto;

  .list-wrap {
    //
  }
}
</style>
