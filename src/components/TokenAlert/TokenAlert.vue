<template>
  <img
    v-if="isNotDefaultCoin"
    v-tooltip.right="
      'Warning: This coin may be unaudited or contain critical vulnerabilities'
    "
    class="token-alert"
    src="@/assets/alert.svg"
    alt="alert"
  />
</template>

<script lang="ts" setup>
import { useTokensStore } from '@/store';
import { toRefs } from '@vueuse/shared';
import { computed } from 'vue-demi';

const tokensStore = useTokensStore();

interface IProps {
  type: string;
}

const props = defineProps<IProps>();
const { type } = toRefs(props);

const isNotDefaultCoin = computed<boolean>(
  () => !tokensStore.isTokenVerified(type.value),
);
</script>
<style lang="scss" scoped>
img.token-alert {
  margin-left: 4px;
  width: 16px !important;
  height: 16px !important;
  display: inline-block;
  margin-bottom: -2px;
}
</style>
