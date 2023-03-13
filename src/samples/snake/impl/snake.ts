import { ICell, ISnake } from './api'
import { DoublyLinkedList } from '../../../feature/doubly-linked-list/doubly-linked-list'
import { CellType } from './utils'

export default class Snake implements ISnake {
  snakePartList = new DoublyLinkedList<ICell>()
  head: ICell

  constructor(initPos: ICell) {
    this.head = initPos
    this.snakePartList.prepend(this.head)
    this.head.setCellType(CellType.SnakeNode)
  }

  grow(): void {
    this.snakePartList.prepend(this.head)
  }

  move(nextCell: ICell): void {
    console.log(`Snake is moving to ${nextCell.getRow()} ${nextCell.getCol()}`);
    const tail = this.snakePartList.deleteTail()?.value

    if (tail) {
      tail.setCellType(CellType.Empty)
      this.head = nextCell
      this.head.setCellType(CellType.SnakeNode)
      this.snakePartList.prepend(this.head)
    }
  }

  checkCrash(nextCell: ICell): boolean {
    console.log('Going to check for Crash')

    const snakePartArray = this.snakePartList.toArray()

    for (let i = 0; i < snakePartArray.length - 1; i++) {
      if (snakePartArray[i].value === nextCell) {
        return true
      }
    }

    return false
  }

  getHead(): ICell {
    return this.head
  }

  setHead(head: ICell): void {
    this.head = head
  }

  getSnakePartList(): DoublyLinkedList<ICell> {
    return this.snakePartList
  }

  setSnakePartList(snakePartList: DoublyLinkedList<ICell>): void {
    this.snakePartList = snakePartList
  }
}
