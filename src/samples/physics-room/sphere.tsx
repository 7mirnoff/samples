/* eslint-disable react/no-unknown-property */
import React, { useRef, useState } from 'react'
import { MathUtils, Mesh } from 'three'
import { useFrame } from '@react-three/fiber'

export interface ISphere {
  id: string
  targetPosition: [number, number, number]
}

export const Sphere: React.FC<ISphere> = ({ targetPosition, id }) => {
  const meshRef = useRef<Mesh | null>(null)

  // Начальная позиция объекта
  const [startPosition] = useState<[number, number, number]>(targetPosition)

  const [intermediatePosition, setIntermediatePosition] = useState(startPosition)

  useFrame(() => {
    setIntermediatePosition((prevPosition) => {
      const newPosition = prevPosition.map((coord, index) => MathUtils.lerp(coord, targetPosition[index], 0.5))
      return newPosition as [number, number, number]
    })

    meshRef.current?.position.set(...intermediatePosition)
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1]} />
      <meshStandardMaterial color="red" />
      {/* <Html distanceFactor={10}> */}
      {/*  <div style={{ transform: 'translate3d(calc(50%), calc(-50% - 70px), 0)' }}>{id}</div> */}
      {/* </Html> */}
    </mesh>
  )
}
