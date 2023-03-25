export interface ICache<T, K> {
  put: (key: T, value: K) => void
  get: (key: T) => K | -1
}
