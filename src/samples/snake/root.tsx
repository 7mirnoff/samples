import React from 'react'
import 'normalize.css'

import SnakeGameProvider from './context/snake-game-provider'
import { Grid } from './components'
import { Game } from './components/game'

const Root: React.FC = () => {
  return (
    <SnakeGameProvider>
      <Game>
        <Grid />
      </Game>
    </SnakeGameProvider>
  )
}

export default Root
