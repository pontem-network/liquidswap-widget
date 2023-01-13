<template>
  <swap-container class="swap__container"></swap-container>
  <connect-wallet-dialog v-model:visible="mainStore.dialogs.connectWallet" />
  <swap-confirm-dialog v-model:visible="mainStore.dialogs.swapConfirm" />
</template>

<script setup lang="ts">
import { SwapContainer } from './Swap';
import {usePoolsStore, useStore, useTokensStore} from "@/store";
import { ConnectWalletDialog } from '@/components/ConnectWalletDialog';
import { SwapConfirmDialog } from '@/components/SwapConfirmDialog';

// initialize stores
(async () => {
  const tokensStore = useTokensStore();
  await tokensStore.fetchCoinsList();
  const poolsStore = usePoolsStore();
  await poolsStore.fetchPoolsList();
  useStore();
})();

const mainStore = useStore();

</script>
