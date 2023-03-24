import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { RouterList } from '../routes/router-list'
import { initApp } from './initApp'

const App: React.FC = () => {
  useEffect(() => {
    initApp()
  }, [])

  return (
    <BrowserRouter>
      <RouterList />
    </BrowserRouter>
  )
}

export default App
