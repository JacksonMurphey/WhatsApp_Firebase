import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css';

//component imports
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';

//context/reducer import
import { useStateValue } from './store/UserProvider';



function App() {

  const [{ user }, dispatch] = useStateValue()

  return (
    <BrowserRouter>
      <div className="app">
        {
          !user ?
            (<Login />)
            :
            (<Dashboard />)
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
