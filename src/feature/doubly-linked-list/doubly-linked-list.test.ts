import { describe, expect, test } from 'vitest'
import { DoublyLinkedList } from './doubly-linked-list'

describe('DoublyLinkedList', () => {
  test('createInstance', () => {
    const linkedList = new DoublyLinkedList<string>()
    linkedList.append('testValue')

    expect(linkedList.toArray()[0].value).toEqual('testValue')
  })
})
