import { describe, expect, test } from 'vitest'
import { LRUCache } from './lru-cache'

describe('LRUCache', () => {
  test('creates an instance', () => {
    const lruCache = new LRUCache(3)
    expect(lruCache).toBeTruthy()
  })

  test('check "get" method', () => {
    const lruCache = new LRUCache(3)
    lruCache.put('t1', 't1')
    lruCache.put('t2', 't2')
    lruCache.put('t3', 't3')
    lruCache.get('t1')
    lruCache.put('t4', 't4')

    const t1 = lruCache.get('t1')
    const t2 = lruCache.get('t2')
    const t3 = lruCache.get('t3')
    const t4 = lruCache.get('t4')

    expect([t1, t2, t3, t4]).toEqual(['t1', -1, 't3', 't4'])
  })

  test('check overflow', () => {
    const lruCache = new LRUCache(3)
    lruCache.put('t1', 't1')
    lruCache.put('t2', 't2')
    lruCache.put('t3', 't3')
    lruCache.put('t4', 't4')

    const t1 = lruCache.get('t1')
    const t2 = lruCache.get('t2')
    const t3 = lruCache.get('t3')
    const t4 = lruCache.get('t4')

    expect([t1, t2, t3, t4]).toEqual([-1, 't2', 't3', 't4'])
  })

  test('check zero capacity', () => {
    const lruCache = new LRUCache(0)
    lruCache.put('t1', 't1')

    const t1 = lruCache.get('t1')

    expect(t1).toEqual(-1)
  })
})
