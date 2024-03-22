/**
 * Temporary storage in memory
 */
type CacheItem = { time: number; promise: Promise<any> };

const cache = new Map<string, CacheItem>();

export async function getFromCache(
  key: string,
  getter: (() => Promise<any>) | ((...args: any[]) => Promise<any>),
  options?: { time?: number; args?: any[] },
): Promise<any> {
  const maxTime = options?.time || 0;

  if (cache.has(key)) {
    const item = cache.get(key) as CacheItem;

    if (Date.now() - item.time < maxTime) {
      return item.promise;
    }
  }

  if (options?.args) {
    const { args } = options;
    cache.set(key, { time: Date.now(), promise: getter(...args) });
    return (cache.get(key) as CacheItem).promise;
  }

  cache.set(key, { time: Date.now(), promise: getter() });

  return (cache.get(key) as CacheItem).promise;
}
