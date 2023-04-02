/* eslint-disable react/no-unknown-property */
import React from 'react'
import * as THREE from 'three'
import { Mesh } from 'three'
import { useSphere } from '@react-three/cannon'
import { useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export const Player: React.FC = () => {
  const [ref, api] = useSphere<Mesh>(() => ({ mass: 1, position: [0, 2, 0], isKinematic: true }))
  const [, get] = useKeyboardControls()

  useFrame(() => {
    const { forward, backward, left, right } = get()
    const speed = 5

    // Определяем вектор скорости на основе нажатых кнопок
    const direction = new THREE.Vector3()

    if (forward) direction.z = -1 // движение вперед
    if (backward) direction.z = 1 // движение назад
    if (left) direction.x = -1 // движение влево
    if (right) direction.x = 1 // движение вправо

    // Устанавливаем скорость объекта

    // Применяем скорость к объекту
    api.velocity.subscribe((prev) => {
      api.velocity.set(direction.x * speed, prev[1], direction.z * speed)
    })
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry />
      <meshStandardMaterial color="red" />
    </mesh>
  )
}
