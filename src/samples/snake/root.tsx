import React, { useEffect } from 'react'
import Cell from './impl/cell'
import Snake from './impl/snake'
import Board from './impl/board'
import SnakeGame from './impl/snake-game'
import { Direction } from './impl/utils'

const Root: React.FC = () => {
  useEffect(() => {
    console.log('Going to start game')
    const initPos = new Cell(2, 2)
    const snake = new Snake(initPos)
    const board = new Board(10, 10)
    const game = new SnakeGame(snake, board)

    game.isGameOver = false
    game.setDirection(Direction.DirectionsRight)

    for (let i = 0; i < 5; i++) {
      if (i === 2) {
        game.getBoard().generateFood()
        game.update()
      }
      if (i === 3) {
        game.setDirection(Direction.DirectionsRight)
      }
    }

    console.log(game.getBoard().getCells())
  }, [])
  return <div>Snake root</div>
}

export default Root
