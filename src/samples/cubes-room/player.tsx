/* eslint-disable react/no-unknown-property */
import React from 'react'
import { useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Cube, ICube } from './cube'
import { socket } from './socket'

export const Player: React.FC<ICube> = ({ position, name, color }) => {
  const [, get] = useKeyboardControls()
  // const [currentPlayerPosition, setCurrentPlayerPosition] = useState<[number, number, number]>([0, 0.5, 0])

  useFrame(() => {
    const { forward, backward, left, right } = get()
    const speed = 0.2
    // Определяем вектор скорости на основе нажатых кнопок
    const direction = new THREE.Vector3()

    if (forward) direction.z = -1 // движение вперед
    if (backward) direction.z = 1 // движение назад
    if (left) direction.x = -1 // движение влево
    if (right) direction.x = 1 // движение вправо

    const newPosition = [position[0] + direction.x * speed, position[1], position[2] + direction.z * speed]

    if (newPosition[0] === position[0] && newPosition[1] === position[1] && newPosition[2] === position[2]) {
      return
    }

    socket.emit('positionToServer', newPosition)
  })

  return <Cube position={position} color={color} name={name} />
}
