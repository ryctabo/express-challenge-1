export function map<T, R>(value: T | null | undefined, map: (value: T) => R): R | null {
  if (value !== null && value !== undefined) {
    return map(value)
  } else {
    return null
  }
}
