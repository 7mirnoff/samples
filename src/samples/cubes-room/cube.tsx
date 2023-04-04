/* eslint-disable react/no-unknown-property */
import React from 'react'
import { Html } from '@react-three/drei'

export interface ICube {
  position: [number, number, number]
  color: string
  name: string
}

export const Cube: React.FC<ICube> = ({ position, color, name }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
      <Html distanceFactor={10}>
        <div style={{ transform: 'translate3d(calc(50%), calc(-50% - 70px), 0)' }}>{name}</div>
      </Html>
    </mesh>
  )
}
