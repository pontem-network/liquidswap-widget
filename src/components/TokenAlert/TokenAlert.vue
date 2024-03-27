<template>
  <ToolTip
      v-if="isNotDefaultCoin"
      position="bottom"
      :tooltipText="'Warning: This token may be unaudited or contain critical vulnerabilities'"
  >
    <img
        class="token-alert"
        src="../../assets/alert.svg"
        alt="alert"
    />
  </ToolTip>

</template>

<script lang="ts" setup>
import { useTokensStore } from '@/store';
import { toRefs } from '@vueuse/shared';
import { computed } from 'vue';
import ToolTip from '@/components/ToolTip/Tooltip.vue';

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
