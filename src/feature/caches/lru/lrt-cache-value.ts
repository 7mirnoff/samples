import { KeyValuePair } from '../../../utils/types'

export type ILRUCacheValue<T, K> = KeyValuePair<T, K>

export class LRUCacheValue<T, K> implements ILRUCacheValue<T, K> {
  constructor(public readonly key: T, public readonly value: K) {
    this.key = key
    this.value = value
  }
}
