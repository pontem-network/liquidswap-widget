<template>
  <PDialog
    v-model:visible="display"
    :draggable="false"
    :style="{ width: '480px', height: '80vh', maxHeight: '700px' }"
    :modal="true"
    :closable="false"
    :show-header="false"
    class="stepped-dialog stepped-dialog--panel"
  >
    <div class="dialog-step">
      <DialogHeader
        title="Import Token"
        :has-back="hasBack"
        @back="onClose"
        @close="onClose"
      />
      <div v-if="tokenPreview" class="token-info">
        <TokenIcon
          :logo="tokenPreview?.logo"
          :type="tokenPreview?.type"
          size="64"
          class="img"
        />
        <div class="token-info-content">
          <span>{{ tokenPreview.symbol }}</span>
          <span>{{ tokenPreview.name }}</span>
        </div>
        <span class="token-info-address">{{ tokenPreview.address }} </span>
      </div>
      <div v-else class="warning-container">
        <img src="../../assets/warning.svg" alt="" />
        <div class="warning-container-content">
          <span>Token not found!</span>
          <span>Token you're trying to trade doesn't exist in our record</span>
        </div>
      </div>
      <div v-if="tokenPreview" class="warning-container">
        <img src="../../assets/warning.svg" alt="" />
        <div class="warning-container-content">
          <span>Import at your own risk!</span>
          <span
            >This coin doesn’t appear on the active token list.<br />
            Make sure this is the token that you want to trade.</span
          >
        </div>
      </div>
      <div v-if="tokenPreview" class="dialog-step__footer">
        <div class="footer-buttons">
          <PButton
            class="p-button-outlined w-full relative flex footer-button justify-content-center circular-button"
            @click="onClose"
          >
            Cancel
          </PButton>
          <PButton
            class="w-full relative flex align-items-center justify-content-center circular-button"
            @click="importToken"
          >
            <span class="font-medium">Import</span>
          </PButton>
        </div>
      </div>
      <div v-else class="dialog-step__footer">
        <PButton
          class="w-full relative flex align-items-center justify-content-center circular-button"
          @click="onClose"
        >
          <span class="font-medium">Ok</span>
        </PButton>
      </div>
    </div>
  </PDialog>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import { DialogHeader } from '@/components/DialogHeader';
import {
  useSwapStore,
  useTokensStore,
} from '@/store';
import { TokenIcon } from '@/components/TokenIcon';
import PDialog from 'primevue/dialog';
import PButton from 'primevue/button';


interface IProps {
  token: string;
  mode?: 'to' | 'from';
  hasBack?: boolean;
}

const tokensStore = useTokensStore();

const tokenPreview = ref();
const display = ref(false);
const props = defineProps<IProps>();

const store = useSwapStore();

const emits = defineEmits(['close']);

watch(
  () => props.token,
  () => props.token && getToken(),
);

onBeforeMount(() => {
  props.token && getToken();
});

async function getToken() {
  let firstPart = props.token;
  if (props.token.indexOf('<') !== -1) {
    firstPart = props.token.substring(0, props.token.indexOf('<'));
  }
  if (firstPart.split('::').length !== 3) return;
  const tokenInfo = await tokensStore.getTokenInfo(props.token);
  tokenPreview.value = tokenInfo && {
    ...tokenInfo,
    logo: tokensStore.getLogoUrl(props.token),
    address: firstPart.split('::')[0],
  };
}

function importToken() {
  tokensStore.registerToken(tokenPreview.value, { rewrite: false });
  if (tokenPreview.value && props.mode && store) {
    if (props.mode === 'to') store.toCurrency.token = props.token;
    if (props.mode === 'from') store.fromCurrency.token = props.token;
  }
  display.value = false;
  emits('close');
}

function show() {
  display.value = props.token && tokenPreview.value && true;
}

function hide() {
  display.value = false;
}

function onClose() {
  display.value = false;
  emits('close');
}

defineExpose({
  show,
  hide,
});
</script>
