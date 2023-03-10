import { CellType, Direction } from './utils'
import { IBoard, ICell, ISnake, ISnakeGame } from './api'

class SnakeGame implements ISnakeGame {
  private snake: ISnake
  private board: IBoard
  private direction = Direction.DirectionsNone
  private nextDirection = Direction.DirectionsNone
  private gameOver = true

  constructor(snake: ISnake, board: IBoard) {
    this.snake = snake
    this.board = board
  }

  getSnake(): ISnake {
    return this.snake
  }

  setSnake(snake: ISnake): void {
    this.snake = snake
  }

  getBoard(): IBoard {
    return this.board
  }

  setBoard(board: IBoard): void {
    this.board = board
  }

  get isGameOver(): boolean {
    return this.gameOver
  }

  set isGameOver(gameOver: boolean) {
    this.gameOver = gameOver
  }

  getDirection(): Direction {
    return this.direction
  }

  setNextDirection(nextDirection: Direction): void {
    this.nextDirection = nextDirection
  }

  update(): void {
    console.log('Going to update the game')
    if (!this.gameOver) {
      if (this.direction !== Direction.DirectionsNone || this.nextDirection !== Direction.DirectionsNone) {
        const nextCell = this.getNextCell(this.snake.getHead())

        if (this.snake.checkCrash(nextCell)) {
          this.direction = Direction.DirectionsNone
          this.gameOver = true
        } else {
          if (nextCell.getCellType() === CellType.Food) {
            this.snake.grow()
            this.board.generateFood()
          }
          this.snake.move(nextCell)
        }
      }
    }
  }

  getNextCell(currentPosition: ICell): ICell {
    console.log('Going to find next cell')
    if (this.direction !== -this.nextDirection) {
      this.direction = this.nextDirection
    }

    let row = currentPosition.getRow()
    let col = currentPosition.getCol()

    if (this.direction === Direction.DirectionsRight) {
      col++
    } else if (this.direction === Direction.DirectionsLeft) {
      col--
    } else if (this.direction === Direction.DirectionsUp) {
      row--
    } else if (this.direction === Direction.DirectionsDown) {
      row++
    }

    const nextCell = this.board.getCells()[row][col]

    return nextCell
  }

  startGame(): void {
    this.gameOver = false
    this.board.generateFood()
    this.nextDirection = Direction.DirectionsRight
  }
}

export default SnakeGame
