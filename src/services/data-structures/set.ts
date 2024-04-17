export function copySetAndDelete<K extends PropertyKey, S extends Set<K>>(
  set: S,
  key: K,
): S {
  const nSet = new Set(set) as S;
  nSet.delete(key);
  return nSet;
}
