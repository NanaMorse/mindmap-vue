
export function deepCopy<T>(target: T): T {
  return JSON.parse(JSON.stringify(target));
}