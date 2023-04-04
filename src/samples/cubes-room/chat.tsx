import React, { FormEvent, useEffect, useState } from 'react'
import { socket } from './socket'
import { ConnectionManager } from './connection-manager'

export const Chat: React.FC = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [events, setEvents] = useState<string[]>([])
  const [value, setValue] = useState('')

  useEffect(() => {
    function onConnect(): void {
      setIsConnected(true)
    }

    function onDisconnect(): void {
      setIsConnected(false)
    }

    function onEvent(val: string): void {
      console.log(val)
      setEvents((previous) => [...previous, val])
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('msgToClient', onEvent)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('msgToClient', onEvent)
    }
  }, [])

  function onSubmit(evt: FormEvent<HTMLFormElement>): void {
    evt.preventDefault()
    socket.emit('msgToServer', value)
    setValue('')
  }

  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
      <p>State: {`${isConnected}`}</p>
      <ConnectionManager />
      <div>
        {events.map((event, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>{event}</li>
        ))}
      </div>
      <form onSubmit={onSubmit}>
        <input value={value} onChange={(e): void => setValue(e.target.value)} />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
