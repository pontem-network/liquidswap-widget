<template>
  <PDialog
    v-model:visible="display"
    :draggable="false"
    :style="{ width: '480px', height: '80vh', alignSelf: 'flex-start', marginTop: '61px', maxHeight: '700px' }"
    :modal="true"
    :closable="false"
    :show-header="false"
    class="stepped-dialog stepped-dialog--panel"
  >
    <TokenList
      v-if="view === 'root'"
      v-model:actionToken="localActionToken"
      v-model:secondaryToken="localSecondaryToken"
      :field="props.field"
      class="stepped-dialog__item"
      @back="onBack"
      @navigate="onNavigate"
      @close="onClose"
    />
  </PDialog>
</template>

<script setup lang="ts">
import TokenList from './TokenList.vue';
import { ref, computed } from 'vue';
import PDialog from 'primevue/dialog';


interface IProps {
  actionToken?: string;
  secondaryToken?: string;
  field?: 'to' | 'from' | 'none';
}

const emits = defineEmits(['update:actionToken', 'update:secondaryToken']);
const props = defineProps<IProps>();

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
