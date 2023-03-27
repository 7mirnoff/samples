/* eslint-disable @typescript-eslint/no-unused-vars, class-methods-use-this */
import { ICache } from '../types'

export class NeverCache<T, K> implements ICache<T, K> {
  public get(key: T): -1 | K {
    return -1
  }

  public put(key: T, value: K): void {}
}
