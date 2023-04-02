/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react'
import { Html, useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const Player: React.FC = () => {
  const [, get] = useKeyboardControls()
  const [currentPlayerPosition, setCurrentPlayerPosition] = useState<[number, number, number]>([0, 0.5, 0])

  useFrame(() => {
    const { forward, backward, left, right } = get()
    const speed = 0.2

    // Определяем вектор скорости на основе нажатых кнопок
    const direction = new THREE.Vector3()

    if (forward) direction.z = -1 // движение вперед
    if (backward) direction.z = 1 // движение назад
    if (left) direction.x = -1 // движение влево
    if (right) direction.x = 1 // движение вправо

    setCurrentPlayerPosition([
      currentPlayerPosition[0] + direction.x * speed,
      currentPlayerPosition[1],
      currentPlayerPosition[2] + direction.z * speed,
    ])
  })

  return (
    <mesh position={currentPlayerPosition}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
      <Html distanceFactor={10}>
        <div style={{ transform: 'translate3d(calc(50%), calc(-50% - 70px), 0)' }}>User</div>
      </Html>
    </mesh>
  )
}
