import React, { useEffect, useState } from 'react'
import db from '../../firebase'
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore'

import './Sidebar.css'

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton, Avatar } from '@material-ui/core';
import SidebarChat from './SidebarChat';
import { useStateValue } from '../../store/UserProvider';

const Sidebar = () => {

    const [rooms, setRooms] = useState([])
    const [{ user }, dispatch] = useStateValue()




    useEffect(() => {
        const q = query(collection(db, 'rooms'), orderBy('created', 'desc'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setRooms(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
            console.log(rooms)
        })

        return () => {
            unsubscribe() //removes the listener when invoked

        }
    }, [])


    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchIcon />
                    <input type="text" placeholder='Search or Start new chat' />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {rooms.map((room) => (
                    <SidebarChat
                        id={room.id}
                        key={room.id}
                        name={room.data.name}
                        userImg={room.data.madeByImg}
                    />
                ))}
            </div>
        </div>
    )
}
export default Sidebar