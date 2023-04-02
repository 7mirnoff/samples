import React from 'react'

import SnakeGameProvider from './context/snake-game-provider'
import { Grid } from './components'
import { Game } from './components/game'

export const SnakeRoot: React.FC = () => {
  return (
    <SnakeGameProvider>
      <Game>
        <Grid />
      </Game>
    </SnakeGameProvider>
  )
}
