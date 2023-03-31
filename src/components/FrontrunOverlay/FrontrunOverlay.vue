<template>
  <overlay-panel
    ref="op"
    append-to="body"
    :show-close-icon="false"
    style="width: 365px"
    :breakpoints="{ '520px': '100vw' }"
  >
    <div class="frontrun-settings-overlay">
      <div class="settings-overlay__title">Security</div>
      <div class="settings-overlay__divider" />
      <div class="settings-overlay__content">
        <PInputSwitch
          v-model="enableFrontrun"
          input-id="switch"
          class="settings-overlay__switch"
          :disabled="!canEnable"
        />
        <label class="settings-overlay__label" for="switch"
          ><h1 class="settings-overlay__label-title">
            Enable Frontrunning Protection
          </h1>
          <h2 class="settings-overlay__label-subtitle">
            Available only for the Pontem Wallet
          </h2></label
        >
      </div>
      <div class="settings-overlay__divider" />
      <div class="links-wrapper">
        <a
          href="https://pontem.network/posts/liquidswap-adds-frontrunning-protection-dont-let-bots-get-your-money"
          rel="noreferrer noopener"
          target="_blank"
          class="links-wrapper__link links-wrapper__link_gray"
          >How it works?
          <img
            class="ml-1 svg-gray-filter"
            width="12"
            src="@/assets/external-link.svg"
        /></a>
        <a
          :href="WALLET_CHROME_STORE_URL"
          rel="noreferrer noopener"
          target="_blank"
          class="links-wrapper__link"
          >Download Pontem Wallet</a
        >
      </div>
    </div>
  </overlay-panel>
</template>

<script lang="ts" setup>
import { WALLET_CHROME_STORE_URL } from '@/constants/constants';
import { useStore, useSwapStore } from '@/store';
import { PontemWalletName } from '@pontem/aptos-wallet-adapter';
import { computed, ref } from 'vue';
import PInputSwitch from 'primevue/inputswitch';
import OverlayPanel from "primevue/overlaypanel";

const store = useStore();
const swapStore = useSwapStore();
const op = ref();

const canEnable = computed(() => store.walletName.value === PontemWalletName);

const enableFrontrun = computed({
  get() {
    return canEnable.value && swapStore.isFrontrunEnable;
  },
  set(v?: boolean) {
    if (v === undefined) return;
    swapStore.isFrontrunEnable = v;
  },
});

function show(e: Event, target?: any) {
  op?.value.show(e, target);
}

function hide() {
  op?.value.hide();
}

function toggle(e: Event, target?: any) {
  op?.value.toggle(e, target);
}

defineExpose({ show, hide, toggle });
</script>
