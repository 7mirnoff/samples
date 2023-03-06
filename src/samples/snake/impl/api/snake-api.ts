import ICell from './cell-api'
import { DoublyLinkedList } from '../../../../feature/doubly-linked-list/doubly-linked-list'

export default interface ISnake {
  grow: () => void
  move: (nextCell: ICell) => void
  checkCrash: (nextCell: ICell) => boolean
  getSnakePartList: () => DoublyLinkedList<ICell>
  setSnakePartList: (snakePartList: DoublyLinkedList<ICell>) => void
  getHead: () => ICell
  setHead: (head: ICell) => void
}
