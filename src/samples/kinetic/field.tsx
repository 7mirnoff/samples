/* eslint-disable react/no-unknown-property */
import React from 'react'
import { useBox } from '@react-three/cannon'
import { Mesh } from 'three'

export const Field: React.FC = () => {
  const [ref] = useBox<Mesh>(() => ({ position: [0, 0, 0], args: [15, 0.2, 15] }))

  return (
    <mesh ref={ref}>
      <boxBufferGeometry args={[15, 0.2, 15]} />
      <meshStandardMaterial />
    </mesh>
  )
}
