import { io } from 'socket.io-client'

// TODO: переписать на класс

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? 'undefined' : 'http://localhost:3000'

export const socket = io(URL, {
  autoConnect: false,
  path: '/physic-room',
})
