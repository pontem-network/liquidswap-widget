<template>
  <PDialog
      v-model:visible="displayModal"
      :draggable="false"
      :style="{ width: '400px', marginTop: '61px', marginBottom: 'auto' }"
      :modal="true"
      class="step price-impact"
      :closable="true"
  >
    <div class="price-impact-dialog">
      <img
          class="warning-img"
          width="88"
          src="@/assets/round-red-exclamation-mark.svg"
      />
      <h1 class="title">Are you sure you want to swap?</h1>
      <h3 class="description">
        Price impact is {{ priceImpact }}%. You can lose money on this transaction
      </h3>
      <div class="button-wrapper">
        <PButton
            class="p-button-secondary button"
            @click="onClickAction('cancel')"
        >Cancel</PButton
        >
        <PButton
            class="p-button-secondary button"
            :class="[priceImpactState === 'warning' ? 'button_warning' : 'button_alert']"
            @click="onClickAction('swap')"
        >Swap</PButton
        >
      </div>
    </div>
  </PDialog>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import PButton from 'primevue/button';
import PDialog from 'primevue/dialog';
import { useSwapStore , useStore} from "@/store";

type IProps = {
  visible?: boolean;
};

const props = defineProps<IProps>();
const emits = defineEmits(['update:visible']);

const swapStore = useSwapStore();
const mainStore = useStore();

const priceImpactState = computed(() => swapStore.priceImpactState);

const priceImpact = computed(() => swapStore.priceImpact ? swapStore.priceImpact.toFixed(2) : '0.00');

const displayModal = computed({
  get: () => !!props.visible,
  set: (v) => emits('update:visible', v),
});

const hide = () => {
  displayModal.value = false;
}

function onClickAction(type: 'cancel' | 'swap') {
  switch (type) {
    case "cancel":
      hide();
      break;
    case "swap":
      hide();
      mainStore.showDialog('swapConfirm');
  }
}
</script>