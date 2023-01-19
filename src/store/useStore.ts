import SDK, { SdkOptions } from '@pontem/liquidswap-sdk';
import { createGlobalState, useStorage, StorageSerializers } from '@vueuse/core';
import { useWalletProviderStore, WalletAdapterNetwork } from "@pontem/aptos-wallet-adapter";
import { computed, reactive, ref, watch, readonly } from 'vue';
import { storeToRefs } from 'pinia';

import { RESOURCES_ACCOUNT, MODULES_ACCOUNT, NETWORKS, CORRECT_CHAIN_ID, APTOS_TESTNET_CHAIN_ID, APTOS } from "@/constants/constants";
import { Network } from '@/types';
import { restUrl } from '@/utils/networkData';

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

const createSDK = ({ nodeUrl, networkOptions }: SdkOptions) => {

  const sdk = new SDK({
    nodeUrl: nodeUrl,
    networkOptions: networkOptions
  });

  return sdk;
}

export const useStore = createGlobalState(() => {

  const sdk = ref(createSDK({
    nodeUrl: restUrl(`${CORRECT_CHAIN_ID}`),
    networkOptions: {
      resourceAccount: RESOURCES_ACCOUNT,
      moduleAccount: MODULES_ACCOUNT
    }
  }));

  const client = sdk.value.client;
  const curves = sdk.value.curves;
  const networkOptions = sdk.value.networkOptions;
  const modules = networkOptions.modules;

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
  } = storeToRefs(walletAdapter) as unknown as any;

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
  const account = computed(() => storage.value.account);


  const name = computed(() => wallet.value?.adapter.name);

  function resetAccount() {
    storage.value.defaultToken = APTOS;
    if (walletAddress.value) {
      if (name.value.toLowerCase() !== 'pontem') {
        // other wallets like Petra || Martian || rise || fewcha etc...
        if (
          walletNetwork.value.name.toLowerCase() ===
          WalletAdapterNetwork.Mainnet
        ) {
          networkId.value = CORRECT_CHAIN_ID;
          sdk.value = createSDK({
            nodeUrl: restUrl(`${CORRECT_CHAIN_ID}`),
            networkOptions: {
              resourceAccount: RESOURCES_ACCOUNT,
              moduleAccount: MODULES_ACCOUNT
            }
          });
        } else if (
          walletNetwork.value.name
            .toLowerCase()
            .indexOf(WalletAdapterNetwork.Testnet) !== -1
        ) {
          networkId.value = APTOS_TESTNET_CHAIN_ID;
          sdk.value = createSDK({
            nodeUrl: restUrl(`${APTOS_TESTNET_CHAIN_ID}`),
            networkOptions: {
              resourceAccount: RESOURCES_ACCOUNT,
              moduleAccount: MODULES_ACCOUNT
            }
          })
        } else {
          networkId.value = 0;
        }
      } else {
        // Pontem wallet
        if (
          walletNetwork.value.name
            .toLowerCase()
            .indexOf(WalletAdapterNetwork.Testnet) !== -1
        ) {
          networkId.value = APTOS_TESTNET_CHAIN_ID;
          sdk.value = createSDK({
            nodeUrl: restUrl(`${APTOS_TESTNET_CHAIN_ID}`),
            networkOptions: {
              resourceAccount: RESOURCES_ACCOUNT,
              moduleAccount: MODULES_ACCOUNT
            }
          })
        } else if (
          chainId.value !== undefined &&
          !isNaN(parseInt(chainId.value)) &&
          networkId.value !== parseInt(chainId.value)
        ) {
          networkId.value = parseInt(chainId.value);
          if (parseInt(chainId.value) === CORRECT_CHAIN_ID) {
            sdk.value = createSDK({
              nodeUrl: restUrl(`${CORRECT_CHAIN_ID}`),
              networkOptions: {
                resourceAccount: RESOURCES_ACCOUNT,
                moduleAccount: MODULES_ACCOUNT
              }
            })
          }
        }
      }
      if (networkId.value === CORRECT_CHAIN_ID) {
        dialogs.invalidNetwork = false;
      } else {
        dialogs.invalidNetwork = true;
      }
      storage.value.account = {
        address: walletAddress.value as string,
        type: `${name.value}`,
      };
      storage.value.defaultToken = APTOS;
    } else {
      dialogs.invalidNetwork = false;
      storage.value.account = undefined;
    }
  }

  watch([walletAddress, walletNetwork, chainId, name], () => {
    resetAccount();
  });

  function showDialog(alias: string) {
    dialogs[alias] = true;
  }

  window.addEventListener('resize', () => {
    storage.value.isMobile = handleMobileScreen();
  });


  const dialogs = reactive<Record<string, boolean>>({
    coinList: false,
    connectWallet: false,
    invalidNetwork: false,
    swapConfirm: false,
  });

  return {
    sdk,
    client,
    curves,
    defaultToken,
    network,
    account,
    networkId: readonly(networkId),
    dialogs,
    showDialog,
    modules,
    networkOptions,
  }
});