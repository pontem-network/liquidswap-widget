<template>
  <PDialog
    v-model:visible="displayModal"
    :draggable="false"
    :style="{ width: '483px', marginTop: '91px' }"
    :modal="true"
    :position="'top'"
    :content-style="{ overflowY: 'hidden' }"
  >
    <template #header>
      <h3 class="modal__title">Connect a Wallet</h3>
    </template>
    <div class="connect__wallet-image">
      <img class="" src="@/assets/connect.svg" alt="wallet" />
    </div>
    <p class="mb-4 text-center">
      To continue working with the site, you need to connect a wallet and allow
      the site access to your account
    </p>
    <PButton
      :key="pontemWallet.key"
      class="connect w-full mb-2"
      label="Connect"
      @click="onConnect(pontemWallet)"
    >
      <img
        :src="pontemWallet.logo"
        :alt="pontemWallet.label"
        class="wallet-logo mr-3"
      />
      <div class="connect__description">
        <div class="connect__title">
          <span>{{ pontemWallet.label }}</span>
          <div class="connect__caption">
            Audited by:
            <img
              class="connect__auditor"
              src="@/assets/auditors/halborn.svg"
              alt="Halborn"
            />
          </div>
        </div>
        <img
          class="connect__badge"
          src="@/assets/wallets/recommended.svg"
          alt="recommended"
        />
      </div>
    </PButton>
    <div class="block--scrollable p-overflow-auto">
      <PButton
        :key="'other wallets'"
        class="connect w-full mb-2 other-wallets__button"
        label="Connect"
        @click="handleToggle"
      >
        <span class="chevron mr-3">
          <i
            class="pi pi-chevron-down"
            :class="[isToggled ? 'pi-chevron-up' : 'pi-chevron-down']"
          />
        </span>
        Other Wallets
      </PButton>
      <div v-if="isToggled" class="other-wallets__block">
        <PButton
          v-for="wallet in otherWallets"
          :key="wallet.key"
          class="connect w-full mb-2"
          label="Connect"
          @click="onConnect(wallet)"
        >
          <img
            :src="wallet.logo"
            :alt="wallet.label"
            class="wallet-logo mr-3"
          />
          {{ wallet.label }}
        </PButton>
      </div>
      <div v-if="error" class="p-error mb-3 text-center text-sm">
        {{ error }}
      </div>
    </div>
  </PDialog>
</template>

<script setup lang="ts">
import { computed, ref, onBeforeUnmount } from 'vue';
import { useWalletProviderStore } from '@pontem/aptos-wallet-adapter';
import { IWallet } from '@/types';
import { walletsList } from '@/constants/wallets';
import { storeToRefs } from 'pinia';
import PDialog from 'primevue/dialog';
import PButton from 'primevue/button';

const adapter = useWalletProviderStore();

type IProps = {
  visible?: boolean;
};

const isToggled = ref<boolean>(false);

const handleToggle = () => {
  isToggled.value = !isToggled.value;
};

const props = defineProps<IProps>();
const emits = defineEmits(['update:visible']);

const otherWallets = computed(() => {
  return walletsList.filter(({ key }) => key !== 'Pontem');
});

const pontemWallet = computed(() => {
  return walletsList.find(({ key }) => key === 'Pontem');
});

const displayModal = computed({
  get: () => !!props.visible,
  set: (v) => emits('update:visible', v),
});

const isLoading = ref(false);
const error = ref(undefined);

onBeforeUnmount(() => {
  isLoading.value = false;
  error.value = undefined;
  isToggled.value = false;
});

async function onConnect(wallet: IWallet) {
  const { account } = storeToRefs(adapter);
  try {
    isLoading.value = true;
    error.value = undefined;
    adapter.select(wallet.key);
    await adapter.connect();
    if (account.value) {
      displayModal.value = false;
      error.value = undefined;
      isToggled.value = false;
    }
  } catch (e: any) {
    console.log(e);
    error.value = e.message;
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped lang="scss">

</style>
