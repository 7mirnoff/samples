import { DoublyLinkedList } from '../../doubly-linked-list/doubly-linked-list'
import { INode } from '../../doubly-linked-list/types'
import { ICache } from '../types'

interface ILRUCacheNode<T, K> {
  key: T
  value: K
}

class LRUCacheNode<T, K> implements ILRUCacheNode<T, K> {
  constructor(public readonly key: T, public readonly value: K) {
    this.key = key
    this.value = value
  }
}

export class LRUCache<T, K> implements ICache<T, K> {
  private map = new Map<T, INode<ILRUCacheNode<T, K>>>()
  private dll = new DoublyLinkedList<ILRUCacheNode<T, K>>()

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
    if (this.get(key) !== -1) {
      // Update last element value
      this.dll.deleteTail()
      this.dll.append(new LRUCacheNode(key, value))
      return
    }

    if (this.map.size === this.capacity) {
    }
  }
}

// https://www.section.io/engineering-education/lru-cache-implementation-in-javascript/

const f = new LRUCache<string, number>(2)
console.log(f)
