import ICell, { Col, Row } from './api/cell-api'
import { CellType } from './utils'

export default class Cell implements ICell {
  private readonly row: Row

  private readonly col: Col

  private cellType = CellType.Empty

  constructor(row: Row, col: Col) {
    this.row = row
    this.col = col
  }

  getCellType(): CellType {
    return this.cellType
  }

  setCellType(cellType: CellType): void {
    this.cellType = cellType
  }

  getRow(): Row {
    return this.row
  }

  getCol(): Col {
    return this.col
  }
}
