import React from 'react'
import { Cube, ICube } from './cube'

export const AnotherPlayer: React.FC<ICube> = ({ position, color, name }) => {
  return <Cube position={position} color={color} name={name} />
}
