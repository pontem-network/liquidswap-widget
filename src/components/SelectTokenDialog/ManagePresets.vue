<template>
  <div class="dialog-step manage_presets">
    <DialogHeader
      title="Manage Coin Lists"
      :has-back="true"
      @close="onClose"
      @back="onClose"
    />
    <div class="dialog-step__content">
      <div
        v-show="manageSwitch === 'lists'"
        style="opacity: 0.3; cursor: default"
      >
        <div class="address-import">
          <InputText
            v-model.trim="addressImportStr"
            spellcheck="false"
            class="address-import__input"
            placeholder="https:// or ipfs:// or ENS name"
            disabled
          />
        </div>
        <div class="dialog-step__divider" />
      </div>

      <CoinsList v-show="manageSwitch === 'coins'" />
    </div>
    <div class="dialog-step__footer">
      <div v-show="manageSwitch === 'coins'" class="coins-info__wrap">
        <p>Custom coins stored locally in your browser</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DialogHeader from '@/components/DialogHeader/DialogHeader.vue';
import { useTokensStore } from '@/store';
import { ref } from 'vue';
import CoinsList from './Coins/CoinsList.vue';

const emits = defineEmits(['back', 'close', 'navigate']);

const tokensStore = useTokensStore();

type TManageSwitch = 'lists' | 'coins';
const manageSwitch = ref<TManageSwitch>('coins');

const addressImportStr = ref<string>('');

const error = ref(false);

function onClose() {
    emits('close');
}
</script>
