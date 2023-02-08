<template>
  <PDialog
      v-model:visible="displayModal"
      :header="`Change Network to Aptos ${chain}`"
      :draggable="false"
      :style="{ width: '400px' }"
      :modal="true"
      class="step"
      :closable="false"
  >
    <p>
      Right now we only support the {{ chain }} network of the Aptos blockchain.
      Please change it using your wallet and refresh page.
    </p>


    <PButton
        class="w-full relative flex align-items-center justify-content-center mt-4 account-exit"
        @click="disconnect"
    >
      {{ insideNativeWallet ? 'Close' : 'Disconnect'}}</PButton
    >
  </PDialog>
</template>

<script setup lang="ts">
import { CORRECT_CHAIN } from '@/constants/constants';
import { useWalletProviderStore } from '@pontem/aptos-wallet-adapter';
import { computed } from 'vue';
import PDialog from 'primevue/dialog';
import PButton from 'primevue/button';
import { useStore } from '@/store';

type IProps = {
  visible?: boolean;
};

const { insideNativeWallet, networkId } = useStore();
const props = defineProps<IProps>();
const emits = defineEmits(['update:visible']);
const adapter = useWalletProviderStore();

const displayModal = computed({
  get: () => !!props.visible,
  set: (v) => emits('update:visible', v),
});

const chain = computed(() => {
  return CORRECT_CHAIN === 'mainnet' ? 'Mainnet' : 'Testnet';
});

function disconnect() {
  adapter?.disconnect();
  displayModal.value = false;
}
</script>
