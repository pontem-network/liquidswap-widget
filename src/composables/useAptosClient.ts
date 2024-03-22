import { REST_URL } from '@/constants/constants';
import { AptosClient } from '@/libs/aptos';
import { useStore } from '@/store';
import { AptosClient as SdkClient } from 'aptos';
import { watch } from 'vue';

const client = new AptosClient();
let sdkClient: SdkClient;

export function useAptosClient() {
  const store = useStore();

  const setSdkClient = (address: string) => {
    sdkClient = new SdkClient(address);
  };
  setSdkClient(store.network.value.restUrl || REST_URL);

  watch(
    store.network,
    (v) => {
      if (v) {
        changeConfig(v.restUrl);
      }
    },
    { immediate: true },
  );

  function changeConfig(baseUrl: string) {
    client.changeConfig(baseUrl);
    setSdkClient(baseUrl);
  }

  return {
    changeConfig,
    client,
    AptosSDK: sdkClient,
  };
}
