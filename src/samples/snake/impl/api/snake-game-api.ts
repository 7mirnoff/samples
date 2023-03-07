import { Direction } from '../utils'
import ISnake from './snake-api'
import IBoard from './board-api'
import ICell from './cell-api'

export default interface ISnakeGame {
  getSnake: () => ISnake
  setSnake: (snake: ISnake) => void
  getBoard: () => IBoard
  setBoard: (board: IBoard) => void
  isGameOver: boolean
  getDirection: () => Direction
  setNextDirection: (nextDirection: Direction) => void

  update: () => void
  getNextCell: (currentPosition: ICell) => ICell
}
