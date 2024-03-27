<template>
  <div class="tokens-container">
    <template v-for="token in tokensEntities" :key="token?.type">
      <ToolTip
          position="top"
          :tooltipText="token?.symbol"
          class="token-icon-tooltip"
      >
        <i class="pi pi-info-circle info-circle" />
      </ToolTip>
      <TokenIcon
          class="tokens-container__icon"
          :class="{
          'tokens-container__icon_inactive': activeToken !== token?.type,
        }"
          :type="token?.type"
          :logo="token?.logo"
          @click="handleIconClick(token)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { TokenIcon } from '../TokenIcon';
import ToolTip from '@/components/ToolTip/Tooltip.vue';
import { useTokensStore } from '@/store';
import { IPersistedTokenExtended } from '@/store/useTokenStore';

const tokensStore = useTokensStore();

const props = defineProps({
  tokens: {
    type: Array<string>,
    default: () => [],
  },
  activeToken: {
    type: String,
    required: false,
    default: () => undefined,
  },
});

const emits = defineEmits(['click:icon']);

const tokensEntities = computed(() => {
  return props.tokens.map((type) => tokensStore.getToken(type));
});

function handleIconClick(token?: IPersistedTokenExtended) {
  emits('click:icon', token);
}
</script>

