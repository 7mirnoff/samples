import { INode } from './types'

export class DoublyLinkedListNode<T> implements INode<T> {
  constructor(
    public value: T,
    public next: DoublyLinkedListNode<T> | null = null,
    public previous: DoublyLinkedListNode<T> | null = null
  ) {
    this.value = value
    this.next = next
    this.previous = previous
  }
}
