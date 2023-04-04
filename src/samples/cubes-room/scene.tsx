/* eslint-disable react/no-unknown-property */
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls, OrbitControls, Stats } from '@react-three/drei'
import { Plane } from './plane'
import { Player } from './player'
import { AnotherPlayer } from './another-player'

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
      <Canvas camera={{ position: [0, 6, 10] }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[0, 3, 5]} />

        <Player />

        <AnotherPlayer position={[2, 0.5, 2]} color="green" name="Guest" />
        <Plane />

        <gridHelper args={[20, 20]} />
        <OrbitControls position={[0, 4, 4]} />
        <Stats />
      </Canvas>
    </KeyboardControls>
  )
}
