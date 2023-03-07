import React, { PropsWithChildren, useMemo, useState } from 'react'
import SnakeGameContext, { ISnakeGameContext } from './snake-game-context'
import Snake from '../impl/snake'
import Board from '../impl/board'
import SnakeGame from '../impl/snake-game'
import Cell from '../impl/cell'

const SnakeGameProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const instances = useMemo(() => {
    const initPos = new Cell(2, 2)
    const snake = new Snake(initPos)
    const board = new Board(10, 10)
    const game = new SnakeGame(snake, board)

    return {
      snake,
      board,
      game,
    }
  }, [])

  const [tick, setTick] = useState(0)

  const provider = useMemo<ISnakeGameContext>(() => {
    return {
      ...instances,
      tick,
      setTick,
    }
  }, [tick, instances])

  return <SnakeGameContext.Provider value={provider}>{children}</SnakeGameContext.Provider>
}

export default SnakeGameProvider
