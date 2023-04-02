/* eslint-disable react/no-unknown-property */
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls, OrbitControls, Stats } from '@react-three/drei'
import { Plane } from './plane'
import { Player } from './player'

export const Scene: React.FC = () => {
  return (
    <KeyboardControls
      map={[
        { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
        { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
        { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
        { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
        { name: 'jump', keys: ['Space'] },
      ]}
    >
      <Canvas>
        <ambientLight intensity={0.2} />
        <directionalLight position={[0, 3, 5]} />

        <Player />
        <Plane />

        <gridHelper args={[20, 20]} />
        <OrbitControls />
        <Stats />
      </Canvas>
    </KeyboardControls>
  )
}
