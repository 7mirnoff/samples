import { describe, expect, test } from 'vitest'
import { LFUCache } from './lfu-cache'

describe('LRUCache', () => {
  test('creates an instance', () => {
    const lfuCache = new LFUCache(3)
    expect(lfuCache).toBeTruthy()
  })

  test('check "get" method', () => {
    const lfuCache = new LFUCache(3)
    lfuCache.put('t1', 't1')
    lfuCache.put('t2', 't2')
    lfuCache.put('t3', 't3')

    const t1 = lfuCache.get('t1')
    const t2 = lfuCache.get('t2')
    const t3 = lfuCache.get('t3')

    expect([t1, t2, t3]).toEqual(['t1', 't2', 't3'])
  })

  test('check overflow', () => {
    const lruCache = new LFUCache(5)
    lruCache.put('t1', 't1') // value = [1],         frequency = [0]
    lruCache.put('t2', 't2') // value = [2,1],       frequency = [0,0]
    lruCache.put('t3', 't3') // value = [3,2,1],     frequency = [0,0,0]
    lruCache.get('t1') // value = [1,3,2],     frequency = [1,0,0], return 1
    lruCache.get('t3') // value = [3,1,2],     frequency = [1,1,0], return 3
    lruCache.get('t3') // value = [3,1,2],     frequency = [2,1,0], return 3
    lruCache.put('t4', 't4') // value = [3,1,4,2],   frequency = [2,1,0,0]
    lruCache.put('t5', 't5') // value = [3,1,5,4,2], frequency = [2,1,0,0,0], cache is full
    lruCache.put('t6', 't6') // value = [3,1,6,5,4], frequency = [2,1,0,0,0], last element 2 is removed
    lruCache.get('t4') // value = [3,4,1,6,5], frequency = [2,1,1,0,0], return 4
    lruCache.put('t7', 't7') // value = [3,4,1,7,6], frequency = [2,1,1,0,0], last element 5 is removed
    lruCache.get('t7') // value = [3,7,4,1,6], frequency = [2,1,1,1,0], return 7
    lruCache.get('t6') // value = [3,6,7,4,1], frequency = [2,1,1,1,1], return 6
    lruCache.get('t6') // value = [6,3,7,4,1], frequency = [2,2,1,1,1], return 6
    lruCache.get('t6') // value = [6,3,7,4,1], frequency = [3,2,1,1,1], return 6
    lruCache.put('t8', 't8') // value = [6,3,7,4,8], frequency = [3,2,1,1,0], last element 1 is removed

    const t1 = lruCache.get('t1')
    const t2 = lruCache.get('t2')
    const t3 = lruCache.get('t3')
    const t4 = lruCache.get('t4')
    const t5 = lruCache.get('t5')
    const t6 = lruCache.get('t6')
    const t7 = lruCache.get('t7')
    const t8 = lruCache.get('t8')

    expect([t1, t2, t3, t4, t5, t6, t7, t8]).toEqual([-1, -1, 't3', 't4', -1, 't6', 't7', 't8'])
  })

  test('check zero capacity', () => {
    const lfuCache = new LFUCache(0)
    lfuCache.put('t1', 't1')

    const t1 = lfuCache.get('t1')

    expect(t1).toEqual(-1)
  })
})
