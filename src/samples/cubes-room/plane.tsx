/* eslint-disable react/no-unknown-property */
import React from 'react'

export const Plane: React.FC = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[15, 15]} />
      <meshStandardMaterial />
    </mesh>
  )
}
