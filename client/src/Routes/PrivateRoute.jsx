import React from 'react'
import {Redirect, Route} from 'react-router-dom'

const PrivateRoute = ({component : Component, ...args}) => {
    return (
      <Route {...args}
      render = {(props) => 
          localStorage.getItem('authToken') ? 
          <Component {...props} />
          : <Redirect to = '/login' />
      }
      />
    )
}

export default PrivateRoute
