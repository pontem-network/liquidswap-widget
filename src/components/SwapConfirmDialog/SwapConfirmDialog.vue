<template>
  <PDialog
    v-model:visible="displayModal"
    :draggable="false"
    :modal="true"
    :closable="false"
    :show-header="false"
    :style="{ width: '400px', marginTop: 'auto', marginBottom: 'auto' }"
    position="top"
    class="stepped-dialog"
  >
    <template
      v-if="
        !(tokenBalance.isFetching.value && tokenBalance.isFirstFetching.value)
      "
    >
      <RegisterToken
        v-if="view === 'register'"
        :token="swap.toCurrency.token"
        @close="onClose"
        @success="onRegisterSuccess"
        @reject="onRegisterRejected"
      />
      <SwapConfirm
        v-if="view === 'swap'"
        @close="onClose"
        @success="onSwapSuccess"
        @reject="onSwapRejected"
      />
    </template>
  </PDialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { RegisterToken } from '@/components/Steps';
import { SwapConfirm } from '@/components/SwapConfirm';
import { useSwapStore } from '@/store';
import { useCurrentAccountBalance } from '@/composables/useAccountBalance';
import PDialog from 'primevue/dialog';


type IProps = {
  visible?: boolean;
};

const props = defineProps<IProps>();
const emits = defineEmits(['update:visible']);
const view = ref<'register' | 'swap'>('register');

const displayModal = computed({
  get: () => !!props.visible,
  set: (v) => emits('update:visible', v),
});

const swap = useSwapStore();
const tokenBalance = useCurrentAccountBalance(
  computed(() => swap.toCurrency.token),
  { useSuffix: false },
);

function onClose() {
  displayModal.value = false;
}

function onRegisterSuccess() {
  view.value = 'swap';
}

function onRegisterRejected() {
  view.value = 'register';
}

function onSwapSuccess() {
  onClose();
  view.value = 'register';
}

function onSwapRejected() {
  onClose();
  view.value = 'register';
}

watch(displayModal, async (visible) => {
  if (!visible) {
    return;
  }

  const result = await tokenBalance.refetch();
  view.value = result?.isExists ? 'swap' : 'register';
});
</script>

<style lang="scss" scoped></style>
