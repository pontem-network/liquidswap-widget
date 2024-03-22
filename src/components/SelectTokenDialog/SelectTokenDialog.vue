<template>
  <PDialog
    v-model:visible="display"
    :draggable="false"
    :style="{ width: '480px', height: '80vh', alignSelf: 'flex-start', marginTop: '61px', maxHeight: '700px' }"
    :modal="true"
    :show-header="false"
    class="stepped-dialog stepped-dialog--panel"
    :dismissableMask="true"
  >
    <TokenList2
      v-if="props.view === 'select-token'"
      v-model:actionToken="actionToken"
      v-model:secondaryToken="secondaryToken"
      class="stepped-dialog__item"
      @navigate="onNavigate"
      @cancel="$emit('cancel')"
    />
    <ManagePresets
      v-if="view === 'manage-presets'"
      class="stepped-dialog__item"
      @back="onBack"
      @navigate="onNavigate"
      @close="onClose"
    />
  </PDialog>
</template>

<script setup lang="ts">
import TokenList2 from './TokenList2.vue';
import { ref, computed } from 'vue';
import PDialog from 'primevue/dialog';
import ManagePresets from './ManagePresets.vue';

interface IProps {
  actionToken?: string;
  secondaryToken?: string;
  view: 'select-token' | 'manage-presets' | undefined;
  mode: 'from' | 'to';
}

const emits = defineEmits([
  'update:actionToken',
  'update:secondaryToken',
  'navigate',
  'cancel',
]);

const props = defineProps<IProps>();

const mode = computed(() => props.mode);

const display = ref(false);
const view = ref<'root' | 'mange-presets'>('root');
const history = ref<string[]>([]);

const localActionToken = computed({
  get: () => props.actionToken,
  set: (value) => emits('update:actionToken', value),
});

const localSecondaryToken = computed({
  get: () => props.secondaryToken,
  set: (value) => emits('update:secondaryToken', value),
});

function onNavigate(next: string | undefined) {
  history.value.push(view.value);
  view.value = (next as any) || 'root';
}

function onClose() {
  view.value = 'root';
  history.value = [];
  hide();
}

function onBack() {
  const last = history.value.pop();
  view.value = (last as any) || 'root';
}

function show() {
  display.value = true;
}

function hide() {
  display.value = false;
}

defineExpose({
  show,
  hide,
});
</script>
