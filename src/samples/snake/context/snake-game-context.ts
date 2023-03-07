import React from 'react'
import { IBoard, ISnake, ISnakeGame } from '../impl/api'

export interface ISnakeGameContext {
  snake: ISnake
  board: IBoard
  game: ISnakeGame
  tick: number
  setTick: React.Dispatch<React.SetStateAction<number>>
}

const SnakeGameContext = React.createContext<ISnakeGameContext>({} as ISnakeGameContext)

export default SnakeGameContext
