import { computed, getCurrentInstance } from 'vue';

export function createSyncRef(key: string) {
  const instance = getCurrentInstance();

  if (!instance) {
    return undefined as any;
  }

  return computed({
    get() {
      return instance.props[key];
    },
    set(v) {
      return instance.emit(`update:${key}`, v);
    },
  });
}
