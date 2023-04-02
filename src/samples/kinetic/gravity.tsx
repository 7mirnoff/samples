/* eslint-disable react/no-unknown-property */
import React from 'react'
import { usePlane } from '@react-three/cannon'
import { Mesh } from 'three'

export const Gravity: React.FC = () => {
  const [ref] = usePlane<Mesh>(() => ({ position: [0, -5, 0], rotation: [-Math.PI / 2, 0, 0] }))

  return (
    <mesh ref={ref}>
      <planeBufferGeometry args={[10, 10]} />
      <meshStandardMaterial color="green" />
    </mesh>
  )
}
