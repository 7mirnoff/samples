import React, { useRef, useState } from 'react'
import { Request } from './impl/request'
import { Method, sendXHR } from './impl/engine'
import { LRUCache } from '../../feature/caches'
import { ICustomResponse } from './impl/customResponse'

const cache = new LRUCache<string, ICustomResponse<unknown>>(3)
const Root: React.FC = () => {
  const [count, setCount] = useState(1)

  const ref = useRef(new Request().engine(sendXHR).cache(cache).method(Method.get))

  return (
    <div>
      http
      <button
        type="button"
        onClick={async (): Promise<void> => {
          const data = await ref.current.url(`https://jsonplaceholder.typicode.com/todos/${count}`).create()
          console.log(data)
          setCount((prevCount) => prevCount + 1)
        }}
      >
        send
      </button>
    </div>
  )
}

export default Root
