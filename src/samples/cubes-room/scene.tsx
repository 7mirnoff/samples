/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls, OrbitControls, Stats } from '@react-three/drei'
import { Plane } from './plane'
import { Player } from './player'
import { AnotherPlayer } from './another-player'
import { socket } from './socket'

export const Scene: React.FC = () => {
  const [users, setUsers] = useState<Record<string, [number, number, number]>>({})
  useEffect(() => {
    function onEvent(val: { clientId: string; position: [number, number, number] }): void {
      setUsers((prev) => ({ ...prev, [val.clientId]: val.position }))
    }

    function onConnect(): void {
      setUsers((prev) => ({ ...prev, [socket.id]: [0, 0.5, 0] }))
      socket.emit('positionToServer', [0, 0.5, 0])
    }

    function onDisconnect(): void {
      // setIsConnected(false)
    }

    socket.on('positionToClient', onEvent)
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('positionToClient', onEvent)
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])
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

        {/* <Player position={[0, 0.5, 0]} color="red" name="User" /> */}

        {/* <AnotherPlayer position={[2, 0.5, 2]} color="green" name="Guest" /> */}

        {Object.keys(users).map((key) =>
          key === socket.id ? (
            <Player key={key} position={users[key]} color="red" name={key} />
          ) : (
            <AnotherPlayer key={key} position={users[key]} color="green" name={key} />
          )
        )}
        <Plane />

        <gridHelper args={[20, 20]} />
        <OrbitControls position={[0, 4, 4]} />
        <Stats />
      </Canvas>
    </KeyboardControls>
  )
}
