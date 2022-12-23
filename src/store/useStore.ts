import { SDK } from '@pontem/liquidswap-sdk';
import { createGlobalState } from '@vueuse/core';
import { useWalletProviderStore } from "@pontem/aptos-wallet-adapter";
import { computed, reactive } from 'vue';
import { storeToRefs } from 'pinia';

import { RESOURCES_ACCOUNT, MODULES_ACCOUNT, NETWORKS, CORRECT_CHAIN_ID } from "@/constants";


export const useStore = createGlobalState(() => {
  const sdk = new SDK({
    nodeUrl: 'https://fullnode.mainnet.aptoslabs.com/v1',
    networkOptions: {
      resourceAccount: RESOURCES_ACCOUNT,
      moduleAccount: MODULES_ACCOUNT
    }
  });
  const client = sdk.client;
  const curves = sdk.curves;

  const adapter = useWalletProviderStore();

  const networks = reactive(NETWORKS);

  const walletAdapter = useWalletProviderStore();
  const {
    account: walletAccount,
    network: walletNetwork,
    wallet,
  } = storeToRefs(walletAdapter);

  const walletAddress = computed(() => walletAccount?.value?.address);
  const chainId = computed(
    () => walletNetwork.value?.chainId || `${CORRECT_CHAIN_ID}`,
  );
  const name = computed(() => wallet.value?.adapter.name);

  return {
    client,
    curves
  }
});