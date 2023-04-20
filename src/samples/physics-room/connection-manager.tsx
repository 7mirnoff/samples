import React from 'react'
import { socket } from './socket'

export const ConnectionManager: React.FC = () => {
  function connect(): void {
    socket.connect()
  }

  function disconnect(): void {
    socket.disconnect()
  }

  return (
    <>
      <button type="button" onClick={connect}>
        Connect
      </button>
      <button type="button" onClick={disconnect}>
        Disconnect
      </button>
    </>
  )
}
