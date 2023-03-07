import React, { PropsWithChildren, useContext, useEffect, useState } from 'react'
import { useInterval, useKey } from 'react-use'
import { SnakeGameContext } from '../context'
import { Direction } from '../impl/utils'

export const Game: React.FC<PropsWithChildren> = ({ children }) => {
  const { game, setTick } = useContext(SnakeGameContext)

  useKey('ArrowUp', () => {
    game.setDirection(Direction.DirectionsUp)
  })

  useKey('ArrowDown', () => {
    game.setDirection(Direction.DirectionsDown)
  })

  useKey('ArrowLeft', () => {
    game.setDirection(Direction.DirectionsLeft)
  })

  useKey('ArrowRight', () => {
    game.setDirection(Direction.DirectionsRight)
  })

  useEffect(() => {
    game.isGameOver = false
    game.getBoard().generateFood()
    // game.setDirection(Direction.DirectionsRight)
  }, [game])

  useInterval(() => {
    setTick((prevTick) => prevTick + 1)
    game.update()
  }, 1000)

  return <div>{children}</div>
}
