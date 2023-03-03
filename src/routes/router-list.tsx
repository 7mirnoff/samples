import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { NavigationList } from '../navigation/navigation-list'

function NoMatch(): JSX.Element {
  return <p>There&apos;s nothing here: 404!</p>
}

const Snake = React.lazy(async () => import('../samples/snake/root'))

export function RouterList(): JSX.Element {
  return (
    <Suspense fallback={<div>Загрузка</div>}>
      <Routes>
        <Route index element={<NavigationList />} />
        <Route path="/snake" element={<Snake />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Suspense>
  )
}
