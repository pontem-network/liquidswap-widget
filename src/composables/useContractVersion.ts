import { computed, ref } from 'vue';
import { VALID_VERSIONS, VERSION_0 } from '@/constants/constants';

export function useContractVersion(defaultVersion = VERSION_0) {
  const _version = ref(defaultVersion);

  const version = computed({
    get() {
      return _version.value;
    },
    set(newVersion: number) {
      if (!VALID_VERSIONS.includes(newVersion)) {
        throw new Error('Trying to switch on wrong swap contract version');
      }
      _version.value = newVersion;
    },
  });

  return {
    version,
  };
}
