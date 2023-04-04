import React, { FormEvent, useEffect, useState } from 'react'
import { socket } from './socket'

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([])
  const [value, setValue] = useState('')

  useEffect(() => {
    function onEvent(val: string): void {
      console.log(val)
      setMessages((previous) => [...previous, val])
    }

    socket.on('msgToClient', onEvent)

    return () => {
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
      <div>
        {messages.map((event, index) => (
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
