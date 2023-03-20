import SDK, { SdkOptions } from '@pontem/liquidswap-sdk';
import { createGlobalState, useStorage, StorageSerializers } from '@vueuse/core';
import { useWalletProviderStore, WalletAdapterNetwork } from "@pontem/aptos-wallet-adapter";
import { computed, reactive, ref, watch, readonly } from 'vue';
import { storeToRefs } from 'pinia';

import {
  RESOURCES_ACCOUNT,
  MODULES_ACCOUNT,
  NETWORKS, CORRECT_CHAIN_ID,
  APTOS_TESTNET_CHAIN_ID,
  APTOS,
  RESOURCES_V05_ACCOUNT,
  MODULES_V05_ACCOUNT,
} from "@/constants/constants";
import { Network, TStatusTransaction } from '@/types';
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
  const insideNativeWallet = ref(false);
  const dappStatusTransaction = ref<TStatusTransaction>("pending");
  const dappTransactionHash = ref(null);

  const sdk = ref(createSDK({
    nodeUrl: restUrl(`${CORRECT_CHAIN_ID}`),
    networkOptions: {
      resourceAccount: RESOURCES_ACCOUNT,
      moduleAccount: MODULES_ACCOUNT,
      resourceAccountV05: RESOURCES_V05_ACCOUNT,
      moduleAccountV05: MODULES_V05_ACCOUNT,
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
    network: adapterNetwork,
    wallet,
  } = storeToRefs(walletAdapter) as unknown as any;

  const dappWalletAccount = ref();
  const dappNetworkData = ref<{ name?: string; chainId?: string }>();

  const walletAddress = computed(() => insideNativeWallet.value ? dappWalletAccount.value : walletAccount.value?.address);
  const networkName = computed(() => insideNativeWallet.value ? dappNetworkData.value?.name : adapterNetwork.value?.name);

  const chainId = computed(
    () => {
      if (insideNativeWallet) {
        return dappNetworkData.value?.chainId;
      } else {
        return adapterNetwork.value?.chainId || `${CORRECT_CHAIN_ID}`;
      }
    }
  );

  const network = computed(
    () =>
      networks.find((network: Network) => {
        return network.id === networkId.value;
      }) as Network,
  );

  const defaultToken = computed(() => storage.value.defaultToken);
  const account = computed(() => storage.value.account);

  const walletName = computed(() => insideNativeWallet.value ? 'Pontem' : wallet.value?.adapter.name);

  const dialogs = reactive<Record<string, boolean>>({
    coinList: false,
    connectWallet: false,
    invalidNetwork: false,
    swapConfirm: false,
  });

  function resetAccount() {
    storage.value.defaultToken = APTOS;

    if (walletAddress.value) {
      if (walletName.value.toLowerCase() !== 'pontem') {
        // other wallets like Petra || Martian || rise || fewcha etc...
        if (
          networkName.value.toLowerCase() ===
          WalletAdapterNetwork.Mainnet
        ) {
          networkId.value = CORRECT_CHAIN_ID;
          sdk.value = createSDK({
            nodeUrl: restUrl(`${CORRECT_CHAIN_ID}`),
            networkOptions: {
              resourceAccount: RESOURCES_ACCOUNT,
              moduleAccount: MODULES_ACCOUNT,
              resourceAccountV05: RESOURCES_V05_ACCOUNT,
              moduleAccountV05: MODULES_V05_ACCOUNT,
            }
          });
        } else if (
          networkName.value
            .toLowerCase()
            .indexOf(WalletAdapterNetwork.Testnet) !== -1
        ) {
          networkId.value = APTOS_TESTNET_CHAIN_ID;
          sdk.value = createSDK({
            nodeUrl: restUrl(`${APTOS_TESTNET_CHAIN_ID}`),
            networkOptions: {
              resourceAccount: RESOURCES_ACCOUNT,
              moduleAccount: MODULES_ACCOUNT,
              resourceAccountV05: RESOURCES_V05_ACCOUNT,
              moduleAccountV05: MODULES_V05_ACCOUNT,
            }
          })
        } else {
          networkId.value = 0;
        }
      } else {
        // Pontem wallet
        if (
          networkName.value
            .toLowerCase()
            .indexOf(WalletAdapterNetwork.Testnet) !== -1
        ) {
          networkId.value = APTOS_TESTNET_CHAIN_ID;
          sdk.value = createSDK({
            nodeUrl: restUrl(`${APTOS_TESTNET_CHAIN_ID}`),
            networkOptions: {
              resourceAccount: RESOURCES_ACCOUNT,
              moduleAccount: MODULES_ACCOUNT,
              resourceAccountV05: RESOURCES_V05_ACCOUNT,
              moduleAccountV05: MODULES_V05_ACCOUNT,
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
                moduleAccount: MODULES_ACCOUNT,
                resourceAccountV05: RESOURCES_V05_ACCOUNT,
                moduleAccountV05: MODULES_V05_ACCOUNT,
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
        type: `${walletName.value}`,
      };
      storage.value.defaultToken = APTOS;
    } else {
      dialogs.invalidNetwork = false;
      storage.value.account = undefined;
    }
  }

  watch([insideNativeWallet, dappWalletAccount, dappNetworkData, adapterNetwork, walletAccount, chainId, walletName, walletAddress, networkName], () => {
    resetAccount();
  });

  function showDialog(alias: string) {
    dialogs[alias] = true;
  }

  window.addEventListener('resize', () => {
    storage.value.isMobile = handleMobileScreen();
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
    insideNativeWallet,
    dappWalletAccount,
    dappNetworkData,
    dappStatusTransaction,
    dappTransactionHash
  }
});
