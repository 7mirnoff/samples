/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DoublyLinkedList } from '../../doubly-linked-list/doubly-linked-list'
import { INode } from '../../doubly-linked-list/types'
import { ICache } from '../types'
import { ILRUCacheValue, LRUCacheValue } from './lru-cache-value'

export class LRUCache<T, K> implements ICache<T, K> {
  private map = new Map<T, INode<ILRUCacheValue<T, K>>>()
  private dll = new DoublyLinkedList<ILRUCacheValue<T, K>>()

  constructor(private readonly capacity: number) {
    this.capacity = capacity
  }

  public get(key: T): K | -1 {
    if (this.map.has(key)) {
      const current = this.map.get(key)!

      this.dll.delete(current.value)
      this.dll.append(current.value)

      return current.value.value
    }
    return -1
  }

  public put(key: T, value: K): void {
    if (this.capacity <= 0) return

    if (this.get(key) !== -1) {
      this.dll.deleteTail()
    } else {
      if (this.map.size === this.capacity) {
        this.map.delete(this.dll.head!.value.key)
        this.dll.deleteHead()
      }

      const newCacheValue = new LRUCacheValue(key, value)
      this.dll.append(newCacheValue)
      this.map.set(key, this.dll.tail!)
    }
  }
}
