import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { RouterList } from '../routes/router-list'
import { initApp } from './init-app'
import { ConsoleViewer } from '../components/libs/console-viewer'

const App: React.FC = () => {
  useEffect(() => {
    initApp()
  }, [])

  return (
    <BrowserRouter>
      <RouterList />
      <ConsoleViewer />
    </BrowserRouter>
  )
}

export default App
