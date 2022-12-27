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
.text {
  margin-top: 0;
  color: rgba(251, 250, 255, 0.6);
}

.image-link {
  display: block;
}

.help {
  color: transparentize(#e5e4fa, 0.6);
  font-size: 13px;
  font-weight: 500;

  a {
    color: transparentize(#e5e4fa, 0.2);

    &:hover {
      text-decoration: underline;
    }
  }
}

.modal__title {
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  text-align: center;
  width: 100%;
  margin: 0 0 0 16px;
}

.connect {
  width: min-content;
  margin: 0;
  border-radius: 12px;
  background-color: #28253e;
  min-height: 64px;
  font-size: 17px;
  line-height: 24px;
  font-weight: 600;
  animation: fade ease-in-out 0.15s;
  &:hover {
    background-color: #33284f;
    border: none;
    outline: none;
    color: white;
  }
  &:focus {
    box-shadow: 0 0 0 2px #1c2127, 0 0 0 2px rgb(196 181 253 / 70%) inset,
      0 1px 2px 0 rgb(0 0 0 / 0%);
  }
  border: none;
  outline: none;
  &__description {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }
  &__title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  &__caption {
    font-size: 13px;
    line-height: 24px;
    color: #9594aa;
    font-weight: 400;
    text-align: left;
    display: flex;
    align-items: center;
  }
  &__badge {
    width: 109px;
  }
  &__wallet-image {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  &__auditor {
    width: 82px;
    margin-left: 0.25em;
  }
}

.connect-dialog {
  align-items: flex-start;
}

.divider {
  opacity: 0.15;
  border-bottom: 1px solid var(--text-color);
  margin: 0 -24px 24px;
}

.store__link {
  display: flex;
  margin-bottom: 24px;
}

.wallet-logo {
  height: 36px;
  width: auto;
}

.chevron {
  border-radius: 50px;
  height: 36px;
  width: 36px;
  background-color: #3e3e52;
  display: flex;
  align-items: center;
  justify-content: center;
}

.other-wallets__button:focus {
  box-shadow: none;
}

.block--scrollable {
  overflow-y: auto;
  height: 100%;
  max-height: calc(100vh - 451px);
}

@keyframes fade {
  0% {
    opacity: 0;
    transform: translate(0, -50%);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}
</style>
