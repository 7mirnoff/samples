/* eslint-disable react/no-unknown-property */
import React from 'react'
import { Mesh } from 'three'
import { useBox } from '@react-three/cannon'

export const Stone: React.FC = () => {
  const [ref] = useBox<Mesh>(() => ({ mass: 1, position: [4, 2, 0], isKinematic: true }))

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color="red" />
    </mesh>
  )
}
