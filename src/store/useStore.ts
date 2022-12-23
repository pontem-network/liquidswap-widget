import { SDK } from '@pontem/liquidswap-sdk';
import { createGlobalState, useStorage, StorageSerializers } from '@vueuse/core';
import { useWalletProviderStore } from "@pontem/aptos-wallet-adapter";
import { computed, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';

import { RESOURCES_ACCOUNT, MODULES_ACCOUNT, NETWORKS, CORRECT_CHAIN_ID, APTOS } from "@/constants";
import { Network } from '@/types';

type GlobalCachebleState = {
  account?: { address: string; type: string };
  defaultToken: string;
  reset: boolean;
  isMobile: boolean;
};

const handleMobileScreen = () => {
  const mediaQueryList = window.matchMedia('screen and (max-width: 768px)');
  return mediaQueryList.matches;
};

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

  const storage = useStorage<GlobalCachebleState>(
    'pontem',
    {
      account: undefined,
      defaultToken: APTOS,
      reset: false,
      isMobile: handleMobileScreen(),
    },
    undefined,
    { serializer: StorageSerializers.object },
  );

  const networkId = ref(CORRECT_CHAIN_ID);

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

  const network = computed(
    () =>
      networks.find((network: Network) => {
        return network.id === networkId.value;
      }) as Network,
  );

  const defaultToken = computed(() => storage.value.defaultToken);

  const name = computed(() => wallet.value?.adapter.name);

  return {
    sdk,
    client,
    curves,
    defaultToken,
    networkId,
    network,
  }
});