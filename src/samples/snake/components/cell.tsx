import React from 'react'
import { CellType } from '../impl/utils'

interface ICellProps {
  cellType: CellType
}

const cellColorMap = {
  [CellType.Empty]: 'yellow',
  [CellType.Food]: 'gray',
  [CellType.SnakeNode]: 'red',
}

const Cell: React.FC<ICellProps> = ({ cellType }) => {
  return (
    <div
      style={{
        border: '1px solid black',
        width: '50px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: cellColorMap[cellType],
      }}
    />
  )
}

export default Cell
