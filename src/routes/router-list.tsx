import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { NavigationList } from '../navigation/navigation-list'

function NoMatch(): JSX.Element {
  return <p>There&apos;s nothing here: 404!</p>
}

const Snake = React.lazy(async () => import('../pages/samples/snake'))
const Http = React.lazy(async () => import('../pages/samples/http'))
const Kinetic = React.lazy(async () => import('../pages/samples/kinetic'))
const CubesRoom = React.lazy(async () => import('../pages/samples/cubes-room'))

export function RouterList(): JSX.Element {
  return (
    <Suspense fallback={<div>Загрузка</div>}>
      <Routes>
        <Route index element={<NavigationList />} />

        <Route path="/cubes-room" element={<CubesRoom />} />
        <Route path="/snake" element={<Snake />} />
        <Route path="/kinetic" element={<Kinetic />} />
        <Route path="/http" element={<Http />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Suspense>
  )
}
