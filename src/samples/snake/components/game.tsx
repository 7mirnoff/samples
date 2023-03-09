import React, { PropsWithChildren, useContext, useEffect } from 'react'
import { useInterval, useKey } from 'react-use'
import { Link } from 'react-router-dom'
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
  }, [])

  useInterval(() => {
    setTick((prevTick) => prevTick + 1)
    game.update()
  }, 500)

  const onButtonStartClick = (): void => {
    game.startGame()
  }

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {children}
      <button onClick={onButtonStartClick} type="button" style={{ marginLeft: '20px' }}>
        Start
      </button>
      <Link to="/" role="button">
        На главную
      </Link>
    </div>
  )
}
