export function exclude<T, Key extends keyof T>(obj: T, keys: Key[]): Omit<T, Key> {
  if (!obj) {
    return obj;
  }
  return Object.fromEntries(Object.entries(obj).filter(([key]) => !keys.includes(key as Key))) as Omit<T, Key>;
}
