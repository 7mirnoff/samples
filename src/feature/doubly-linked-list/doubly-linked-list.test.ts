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
})
