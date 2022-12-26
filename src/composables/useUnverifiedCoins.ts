import { ref } from 'vue';

const confirmed = ref(new Set());

export function useUnverifiedCoins() {
  function checkAndConfirm(coin: string) {
    if (confirmed.value.has(coin)) {
      return true;
    }
    confirmed.value.add(coin);
    return false;
  }

  return {
    checkAndConfirm,
  };
}
