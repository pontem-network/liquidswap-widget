<template>
  <swap-container class="swap__container"></swap-container>
  <connect-wallet-dialog v-model:visible="mainStore.dialogs.connectWallet" />
  <swap-confirm-dialog v-model:visible="mainStore.dialogs.swapConfirm" />
  <invalid-network-dialog v-model:visible="mainStore.dialogs.invalidNetwork" />
  <price-impact-warning-dialog v-model:visible="mainStore.dialogs.priceImpact" />
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { SwapContainer } from './Swap';
import { usePoolsStore, useStore, useTokensStore } from "@/store";
import { ConnectWalletDialog } from '@/components/ConnectWalletDialog';
import { SwapConfirmDialog } from '@/components/SwapConfirmDialog';
import { InvalidNetworkDialog } from '@/components/InvalidNetworkDialog';
import { PriceImpactWarningDialog } from "@/components/PriceImpactWarningDialog";
import './styles/index.scss';


const props = defineProps<{
  dataAccount?: string; // account address like 0x....da14
  dataNetwork?: string; // { name?: string; chainId?: string } as JSON
  dataTransaction?: string; // { status: 'pending' | 'success' | 'error' | 'rejected'; hash: string | null } as JSON
  dataPromoted?: string; // token address to show on top of token list menu
  dataFee?: string;
  /* dataFee JSON struct:
  *
  * {
  *   feePercent: "10",
  *   feeStruct: {
  *     'scripts::swap': '0x57d91c5fbebfdc3d0f42490db87e317c700e1248db8d46f1a8c7e735e835ba0b::fee_on::wallet_swap_exact_coin_for_coin_v05',
  *     'scripts_v2::swap': '0x57d91c5fbebfdc3d0f42490db87e317c700e1248db8d46f1a8c7e735e835ba0b::fee_on::wallet_swap_exact_coin_for_coin_v0',
  *     'scripts::swap_into': '0x57d91c5fbebfdc3d0f42490db87e317c700e1248db8d46f1a8c7e735e835ba0b::fee_on::wallet_swap_coin_for_exact_coin_v05',
  *     'scripts_v2::swap_into': '0x57d91c5fbebfdc3d0f42490db87e317c700e1248db8d46f1a8c7e735e835ba0b::fee_on::wallet_swap_coin_for_exact_coin_v0',
  *   }
  * }
  *
  * */
}>();

// initialize stores
(async () => {
  const tokensStore = useTokensStore();
  const poolsStore = usePoolsStore();

  await Promise.all([
    tokensStore.fetchCoinsData(),
    poolsStore.fetchPoolsList()
  ]).catch((err) => {
    console.error('Error during stores initialization', err);
  })
})();

const mainStore = useStore();

function checkNativeWallet (){
  if (props.dataAccount && props.dataNetwork) {
    mainStore.insideNativeWallet.value = true;
    mainStore.dappWalletAccount.value = props.dataAccount;
    mainStore.dappNetworkData.value = JSON.parse(props.dataNetwork);
    mainStore.dappStatusTransaction.value = props?.dataTransaction && JSON.parse(props.dataTransaction).status;
    mainStore.dappTransactionHash.value = props?.dataTransaction && JSON.parse(props.dataTransaction)?.hash;
  }

  if (props.dataPromoted) {
    mainStore.promotedToken.value = props.dataPromoted;
  }

  if (props.dataFee) {
    mainStore.feeData.value = JSON.parse(props.dataFee);
  }
}

checkNativeWallet();
watch([props], () => {
  checkNativeWallet();
})
</script>
