import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Chat from './components/Chatbox/Chat';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { useStateValue } from './store/UserProvider';

import './App.css';
import Login from './components/Login/Login';

function App() {

  const [{ user }, dispatch] = useStateValue()

  return (
    <BrowserRouter>
      <div className="app">
        {!user
          ?
          (<Login />)
          :
          (
            <div className="app__body">
              <Sidebar />

              <Routes>
                <Route path='/rooms/:roomId' element={<Chat />} />
                <Route path='/' element={<Chat />} />
              </Routes>

            </div>
          )
        }

      </div>
    </BrowserRouter>
  );
}

export default App;
