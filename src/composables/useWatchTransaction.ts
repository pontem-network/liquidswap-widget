import { MaybeRef, useTimeoutPoll } from '@vueuse/core';
import { computed, isRef, unref, watch, WatchStopHandle, ref } from 'vue';
import { RECALCULATION_TX_TIME } from '@/constants/constants';
import { useStore } from "@/store";

export function useWatchTransaction(
  txHash: MaybeRef<string | undefined>,
  options?: { onError?: (e: any) => void; onComplete?: (state: any) => void },
) {
  const mainStore = useStore();
  const aptos = mainStore.client;
  const state = ref();
  const error = ref<unknown | undefined>(undefined);
  const isStopped = ref(false);
  const isLoading = computed(() => !isStopped.value && isActive);
  const { isActive, pause, resume } = useTimeoutPoll(
    watchForTx,
    RECALCULATION_TX_TIME,
    {
      immediate: false,
    },
  );
  let stopWatch: undefined | WatchStopHandle;

  function cancel() {
    pause();
    if (stopWatch) {
      stopWatch();
    }
    isStopped.value = true;
  }

  async function watchForTx() {
    const hash = unref(txHash);
    if (!hash) {
      if (isActive.value) {
        pause();
      }
      return;
    }

    try {
      const data = await aptos.waitForTransactionWithResult(hash);

      state.value = data;

      if (data && 'success' in data) {
        options?.onComplete?.(data);
        cancel();
      }
    } catch (e) {
      error.value = e;
      options?.onError?.(error);
      cancel();
    }
  }

  if (isRef(txHash)) {
    stopWatch = watch(txHash, () => {
      if (txHash.value && !isActive.value) {
        resume();
      }
    });
  }

  return {
    state,
    isStopped,
    isActive,
    isLoading,
    error,
    cancel,
  };
}
