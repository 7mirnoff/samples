import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { RouterList } from '../routes/router-list'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <RouterList />
    </BrowserRouter>
  )
}

export default App
