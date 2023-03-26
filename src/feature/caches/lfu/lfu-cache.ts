/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ICache } from '../types'
import { Count } from './types'

export class LFUCache<T, K> implements ICache<T, K> {
  private values = new Map<T, K>()
  private counts = new Map<T, Count>()
  private lists = new Map<Count, Set<T>>()
  private min = -1

  constructor(private readonly capacity: number) {
    this.capacity = capacity

    this.lists.set(0, new Set())
  }

  public get(key: T): -1 | K {
    if (!this.values.has(key)) {
      return -1
    }

    const count = this.counts.get(key) ?? 0
    this.counts.set(key, count + 1)
    this.lists.get(count)!.delete(key)
    if (count === this.min && this.lists.get(count)!.size === 0) {
      this.min++
    }
    if (!this.lists.has(count + 1)) {
      this.lists.set(count + 1, new Set())
    }
    this.lists.get(count + 1)!.add(key)
    return this.values.get(key)!
  }

  public put(key: T, value: K): void {
    if (this.capacity <= 0) return

    if (this.values.has(key)) {
      this.values.set(key, value)
      this.get(key) // trigger the reorder
      return
    }

    if (this.values.size >= this.capacity) {
      const evict = this.lists.get(this.min)!.values().next().value
      this.lists.get(this.min)!.delete(evict)
      this.values.delete(evict)
      this.counts.delete(evict)
    }
    this.values.set(key, value)
    this.counts.set(key, 0)
    this.min = 0
    this.lists.get(0)!.add(key)
  }
}
