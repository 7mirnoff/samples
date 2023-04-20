import React, { useEffect, useState } from 'react'

import { socket } from './socket'
import { Chat } from '../cubes-room/chat'
import { ConnectionManager } from './connection-manager'

export const PhysicRoomRoot: React.FC = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    function onConnect(): void {
      setIsConnected(true)
    }

    function onDisconnect(): void {
      setIsConnected(false)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <h2 style={{ position: 'absolute', top: 0, left: 0, textAlign: 'center', width: '100%' }}>
        Онлайн комната
        <br /> <ConnectionManager /> <br /> <p>State: {`${isConnected}`}</p>
      </h2>
      <Chat />
    </div>
  )
}
