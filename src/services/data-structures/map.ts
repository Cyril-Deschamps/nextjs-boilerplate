export function copyMapAndDelete<
  K extends PropertyKey,
  M extends Map<K, unknown>,
>(map: M, key: K): M {
  const nMap = new Map(map) as M;
  nMap.delete(key);
  return nMap;
}

export function copyMapAndReplace<K extends PropertyKey, V>(
  map: Map<K, V>,
  key: K,
  value: V,
): Map<K, V> {
  return new Map(map).set(key, value);
}
