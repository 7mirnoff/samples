import React from 'react'

import { Scene } from './scene'

export const CubesRoomRoot: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Scene />
      <h2 style={{ position: 'absolute', top: 0, left: 0, textAlign: 'center', width: '100%' }}>Онлайн комната</h2>
    </div>
  )
}
