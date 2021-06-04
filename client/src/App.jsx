import React from 'react'
import {Switch, Route , BrowserRouter } from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import PrivateRoute from './Routes/PrivateRoute';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
         <Switch>
             <PrivateRoute exact path="/" component= {Homepage} />
             <Route exact path="/login" component= {Login}/>
             <Route exact path="/register" component= {Register} />
         </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
