import React, { PropsWithChildren, useContext, useEffect } from 'react'
import { useInterval, useKey } from 'react-use'
import { SnakeGameContext } from '../context'
import { Direction } from '../impl/utils'

export const Game: React.FC<PropsWithChildren> = ({ children }) => {
  const { game, setTick } = useContext(SnakeGameContext)
  console.log(game)
  useKey('ArrowUp', () => {
    game.setNextDirection(Direction.DirectionsUp)
  })

  useKey('ArrowDown', () => {
    game.setNextDirection(Direction.DirectionsDown)
  })

  useKey('ArrowLeft', () => {
    game.setNextDirection(Direction.DirectionsLeft)
  })

  useKey('ArrowRight', () => {
    game.setNextDirection(Direction.DirectionsRight)
  })

  useEffect(() => {
    // game.setDirection(Direction.DirectionsRight)
  }, [game])

  useInterval(() => {
    setTick((prevTick) => prevTick + 1)
    game.update()
  }, 500)

  return <div>{children}</div>
}
