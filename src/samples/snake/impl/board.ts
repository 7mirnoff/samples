import IBoard, { Field } from './api/board-api'
import Cell from './cell'
import { CellType } from './utils'

export default class Board implements IBoard {
  private readonly rowCount: number
  private readonly columnCount: number
  private cells: Field

  constructor(rowCount: number, columnCount: number) {
    this.rowCount = rowCount
    this.columnCount = columnCount

    this.cells = []
    for (let row = 0; row < rowCount; row++) {
      for (let column = 0; column < columnCount; column++) {
        this.cells[row][column] = new Cell(row, column)
      }
    }
  }

  getCells(): Field {
    return this.cells
  }

  setCells(cells: Field): void {
    this.cells = cells
  }

  generateFood(): void {
    console.log('Going to generate food')
    let row: number
    let column: number
    while (true) {
      row = Math.random() * this.rowCount
      column = Math.random() * this.columnCount

      if (this.cells[row][column].getCellType() !== CellType.SnakeNode) {
        break
      }
    }

    this.cells[row][column].setCellType(CellType.Food)
    console.log(`Food is generated at: ${row} ${column}`)
  }
}
