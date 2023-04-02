/* eslint-disable react/no-unknown-property */
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls, OrbitControls, Stats } from '@react-three/drei'
import { Debug, Physics } from '@react-three/cannon'
import { Player } from './player'
import { Field } from './field'
import { Gravity } from './gravity'
import { Stone } from './stone'

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

        <Physics>
          <Debug>
            <Gravity />
            <Player />
            <Stone />
            <Field />
          </Debug>
        </Physics>

        <gridHelper args={[20, 20]} />
        <OrbitControls />
        <Stats />
      </Canvas>
    </KeyboardControls>
  )
}
