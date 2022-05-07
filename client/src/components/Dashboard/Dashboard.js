import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './Dashboard.css'

//component imports
import Chat from '../Chatbox/Chat'
import Sidebar from '../Sidebar/Sidebar'



const Dashboard = () => {
    return (
        <div className='dash__body'>
            <Sidebar />
            <Routes>
                <Route path='/rooms/:roomId' element={<Chat />} />
                <Route path='/' element={<Chat />} />
            </Routes>
        </div>
    )
}

export default Dashboard