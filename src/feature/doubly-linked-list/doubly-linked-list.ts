import { INode, INodeList } from './types'
import { DoublyLinkedListNode } from './doubly-linked-list-node'

export class DoublyLinkedList<T> implements INodeList<T>, Iterable<INode<T> | null> {
  [Symbol.iterator](): Iterator<INode<T> | null> {
    let node = this.head
    return {
      next(): IteratorResult<INode<T> | null> {
        const currentNode = node
        node = node?.next ?? null
        return {
          value: currentNode,
          done: !currentNode,
        }
      },
    }
  }

  head: INode<T> | null = null
  tail: INode<T> | null = null

  // Добавляем узел в начало списка.
  prepend(value: T): INodeList<T> {
    // Создаем новый узел, который будет head.
    const newNode = new DoublyLinkedListNode(value, this.head)

    // Если есть head, то он больше не будет head.
    // Поэтому делаем его предыдущую (previous) ссылку на новый узел (new head).
    // Затем делаем новый узел head.

    if (this.head) {
      this.head.previous = newNode
    }
    this.head = newNode

    // Если еще нет tail, сделаем новый узел tail.
    if (!this.tail) {
      this.tail = newNode
    }

    return this
  }

  // Добавляем узел в конец списка.
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
    if (!this.head) {
      return null
    }

    const deletedHead = this.head

    if (this.head.next) {
      this.head = this.head.next
      this.head.previous = null
    } else {
      this.head = null
      this.tail = null
    }

    return deletedHead
  }

  deleteTail(): INode<T> | null {
    if (!this.tail) {
      return null
    }

    const deletedTail = this.tail

    if (this.tail.previous) {
      this.tail = this.tail.previous
      this.tail.next = null
    } else {
      this.head = null
      this.tail = null
    }

    return deletedTail
  }

  find(value?: T | undefined): INode<T> | null {
    if (!this.head) {
      return null
    }

    let currentNode: DoublyLinkedListNode<T> | null = this.head

    while (currentNode) {
      // Если указано значение, пробуем сравнить по значению.
      if (value !== undefined && currentNode.value === value) {
        return currentNode
      }

      currentNode = currentNode.next
    }

    return null
  }

  fromArray(values: Array<T>): INodeList<T> {
    values.forEach((value: T) => this.append(value))

    return this
  }

  reverse(): INodeList<T> {
    let currNode = this.head
    let prevNode = null
    let nextNode = null

    while (currNode) {
      // Сохраняем следующий и предыдуший узел.
      nextNode = currNode.next
      prevNode = currNode.previous

      // Меняем следующий узел текущего узла, чтобы он ссылался с предыдущий узел.
      currNode.next = prevNode
      currNode.previous = nextNode

      // Перемещаем узлы prevNode и currNode на один шаг вперед.
      prevNode = currNode
      currNode = nextNode
    }

    // Сбрасываем head и tail.
    this.tail = this.head
    this.head = prevNode

    return this
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
