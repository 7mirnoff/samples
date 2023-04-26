/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from 'react'

import { OrbitControls, Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { socket } from './socket'
import { Chat } from '../cubes-room/chat'
import { ConnectionManager } from './connection-manager'
import { Plane } from '../cubes-room/plane'
import { Sphere } from './sphere'

interface IRoomState {
  players: any[]
  objects: any[]
}

export const PhysicRoomRoot: React.FC = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [stateScene, setStateScene] = useState<IRoomState>({ objects: [], players: [] })

  useEffect(() => {
    function onConnect(): void {
      setIsConnected(true)
    }

    function onDisconnect(): void {
      setIsConnected(false)
    }

    function onGetState(val: IRoomState): void {
      setStateScene(val)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('stateToClient', onGetState)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('stateToClient', onGetState)
    }
  }, [])

  console.log(stateScene)

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 6.2, 10] }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[0, 3, 5]} />

        {stateScene.objects.map((object) => (
          <Sphere
            key={object.id}
            targetPosition={[object.position.x, object.position.y, object.position.z]}
            id={object.id}
          />
        ))}
        <Plane />

        <gridHelper args={[20, 20]} />
        <OrbitControls position={[0, 4, 4]} />
        <Stats />
      </Canvas>
      <h2 style={{ position: 'absolute', top: 0, left: 0, textAlign: 'center', width: '100%' }}>
        Онлайн комната
        <br /> <ConnectionManager /> <br /> <p>State: {`${isConnected}`}</p>
      </h2>
      <Chat />
    </div>
  )
}
