import React from 'react'
import { Link } from 'react-router-dom'

export const NavigationList: React.FC = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/kinetic">Kinetic</Link>
        </li>
        <li>
          <Link to="/snake">Snake</Link>
        </li>
        <li>
          <Link to="/http">HTTP</Link>
        </li>
      </ul>
    </div>
  )
}
