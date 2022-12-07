import { SDK } from '@pontem/liquidswap-sdk';
import { createGlobalState } from '@vueuse/core';

import { RESOURCES_ACCOUNT, MODULES_ACCOUNT } from "@/constants";


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

  return {
    client,
    curves
  }
});