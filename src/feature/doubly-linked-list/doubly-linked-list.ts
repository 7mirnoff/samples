import { INode, INodeList } from './types'
import { DoublyLinkedListNode } from './doubly-linked-list-node'

export class DoublyLinkedList<T> implements INodeList<T> {
  head: INode<T> | null = null
  tail: INode<T> | null = null

  append(value: T): INodeList<T> {
    const newNode = new DoublyLinkedListNode(value)

    if (this.tail) {
      this.tail.next = newNode
    }

    newNode.previous = this.tail

    this.tail = newNode

    if (!this.head) {
      this.head = newNode
    }

    return this
  }

  delete(value: T): INode<T> | null {
    if (!this.head) {
      return null
    }

    let deletedNode = null
    let currentNode = this.head as DoublyLinkedListNode<T> | null

    while (currentNode) {
      if (value === currentNode.value) {
        deletedNode = currentNode

        if (deletedNode === this.head) {
          // Если удаляем head, то следующий узел - это новый head
          // Сделать следующий узел, новым head:
          this.head = deletedNode.next

          // Сбросить в новом head сслыку (previous):
          if (this.head) {
            this.head.previous = null
          }

          // Если все узлы в списке имеют одинаковое значение,
          // которое передается в качестве аргумента,
          // тогда все узлы будут удалены, поэтому tail необходимо обновить:

          if (deletedNode === this.tail) {
            this.tail = null
          }
        } else if (deletedNode === this.tail) {
          // Если tail должен быть удален
          // Установить tail на предпоследний узел, который станет новым tail:

          this.tail = deletedNode.previous as DoublyLinkedListNode<T>
          this.tail.next = null
        } else {
          // Если средний узел будет удален:
          const previousNode = deletedNode.previous as DoublyLinkedListNode<T>
          const nextNode = deletedNode.next as DoublyLinkedListNode<T>

          previousNode.next = nextNode
          nextNode.previous = previousNode
        }
      }

      currentNode = currentNode.next
    }

    return deletedNode
  }

  deleteHead(): INode<T> | null {
    return undefined
  }

  deleteTail(): INode<T> | null {
    return undefined
  }

  find(value?: T | undefined): INode<T> | null {
    return undefined
  }

  fromArray(values: Array<T>): INodeList<T> {
    return undefined
  }

  prepend(value: T): INodeList<T> {
    return undefined
  }

  reverse(): INodeList<T> {
    return undefined
  }

  toArray(): INode<T>[] {
    const nodes = []

    let currentNode = this.head
    while (currentNode) {
      nodes.push(currentNode)
      currentNode = currentNode.next
    }

    return nodes
  }
}
