import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './SidebarChat.css'

import db from '../../firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

const SidebarChat = (props) => {

    const { addNewChat, id, name } = props
    const [seed, setSeed] = useState('')

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const createChat = async () => {
        const roomName = prompt('Please enter a name for chatroom')
        if (roomName) {
            console.log(roomName)
            try {
                await addDoc(collection(db, 'rooms'), {
                    name: roomName,
                    created: Timestamp.now()
                })

            } catch (err) {
                alert(err)
            }
        }
    }

    return !addNewChat ?
        (
            <Link to={`/rooms/${id}`} style={{ textDecoration: "none" }}>
                <div className='sidebarChat' id={id}>
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                    <div className="sidebarChat__info">
                        <h2>{name}</h2>
                        <p>This is the last message</p>
                    </div>
                </div>
            </Link>
        )
        :
        (
            <div onClick={createChat} className="sidebarChat">
                <h3>Create New Chat</h3>
            </div>
        )
}
export default SidebarChat
