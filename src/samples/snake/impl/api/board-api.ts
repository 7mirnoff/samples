import ICell from './cell-api'

export type Field = ICell[][]

export default interface IBoard {
  getCells: () => Field
  setCells: (cells: Field) => void
  generateFood: () => void
}
