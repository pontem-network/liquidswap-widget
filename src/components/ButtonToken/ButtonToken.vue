<template>
  <PButton
    v-bind="$attrs"
    icon-pos="right"
    class="button-token p-button-rounded"
    :class="{ 'is-selected': !!token }"
  >
    <template v-if="token">
      <TokenIcon
        :logo="token?.logo"
        :type="token?.type"
        class="img"
        size="24"
      />
      <div class="token-title">
        <div class="mr-1 token-name">
          {{ token?.symbol }}<token-alert :type="token?.type" />
        </div>
        <div class="mr-1 token-provider">
          {{ tokenProvider }}
        </div>
      </div>
    </template>
    <template v-else>
      <span class="mr-1">Select token</span>
    </template>
    <i class="pi pi-angle-down ml-auto" />
  </PButton>
</template>

<script lang="ts" setup>
import { TokenAlert } from '@/components/TokenAlert';
import { TokenIcon } from '@/components/TokenIcon';
import { computed } from 'vue';
import { IPersistedTokenExtended } from '@/store/useTokenStore';
import { providerForToken } from '@/utils/tokens';
import PButton from 'primevue/button';


interface IProps {
  /**
   * Token entity
   */
  tokenEntity?: IPersistedTokenExtended;
}

defineEmits(['close']);
const props = defineProps<IProps>();

const token = computed(() => {
  if (!props?.tokenEntity) {
    return;
  }

  return props.tokenEntity;
});

const tokenProvider = computed(() => {
  if (token?.value?.type.length && token?.value?.type.length > 0) {
    return providerForToken(token.value);
  }
  return '';
});
</script>
