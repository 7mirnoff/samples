import { CellType } from '../utils'

export type Row = number
export type Col = number

export default interface ICell {
  getCellType: () => CellType
  setCellType: (cellType: CellType) => void
  getRow: () => Row
  getCol: () => Col
}
