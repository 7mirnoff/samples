import React, { useEffect } from 'react'
import { DoublyLinkedList } from '../../feature/doubly-linked-list/doubly-linked-list'

const Root: React.FC = () => {
  useEffect(() => {
    // const game = new SnakeGame()

    const list = new DoublyLinkedList()
    list.append(1).append(2).append(3)

    console.log(list.toArray())

    list.delete(1)
    list.delete(2)
    console.log(list.toArray())
  }, [])
  return <div>Snake root</div>
}

export default Root
