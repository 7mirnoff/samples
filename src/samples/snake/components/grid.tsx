import React, { useContext } from 'react'
import { SnakeGameContext } from '../context'
import Cell from './cell'

export const Grid: React.FC = () => {
  const { board } = useContext(SnakeGameContext)
  const cells = board.getCells()
  return (
    <div>
      {cells.map((row, indexRow) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={indexRow + row.length} style={{ display: 'flex' }}>
          {row.map((col, indexCol) => {
            const cellType = col.getCellType()

            return (
              <Cell
                // eslint-disable-next-line react/no-array-index-key
                key={cellType + indexRow + indexCol}
                cellType={cellType}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Grid
