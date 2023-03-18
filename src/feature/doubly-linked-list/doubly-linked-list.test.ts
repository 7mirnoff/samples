import { describe, expect, test } from 'vitest'
import { DoublyLinkedList } from './doubly-linked-list'

describe('DoublyLinkedList', () => {
  test('creates an instance', () => {
    const linkedList = new DoublyLinkedList<string>()
    expect(linkedList).toBeTruthy()
  })

  test('append item', () => {
    const linkedList = new DoublyLinkedList<string>()
    linkedList.append('testValue')

    expect(linkedList.toArray()[0].value).toEqual('testValue')
  })

  test('check iterable', () => {
    const teslLinkedList = new DoublyLinkedList<number>()
    teslLinkedList.append(1)
    teslLinkedList.append(3)
    teslLinkedList.append(2)

    const resultArray = []

    for (const teslLinkedListNode of teslLinkedList) {
      resultArray.push(teslLinkedListNode?.value)
    }

    expect(resultArray).toEqual([1, 3, 2])
  })
})
