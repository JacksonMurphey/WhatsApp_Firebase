import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './SidebarChat.css'

import { useStateValue } from '../../store/UserProvider'
import db from '../../firebase'
import { collection, addDoc, Timestamp, onSnapshot, query, orderBy } from 'firebase/firestore'

const SidebarChat = (props) => {

    const { addNewChat, id, name, userImg } = props
    const [seed, setSeed] = useState('')
    const [{ user }, dispatch] = useStateValue()
    const [lastMsg, setLastMsg] = useState([])




    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])
    const tempImg = `https://avatars.dicebear.com/api/human/${seed}.svg`
    const appImg = "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"




    const createChat = async () => {
        const roomName = prompt('Please enter a name for chatroom')
        if (roomName) {
            try {
                await addDoc(collection(db, 'rooms'), {
                    name: roomName,
                    madeByImg: user?.photoURL,
                    created: Timestamp.now()
                })
            }
            catch (err) {
                alert(err)
            }
        }
    }

    useEffect(() => {
        if (id) {
            const q = query(collection(db, 'rooms', id, 'messages'), orderBy('timestamp', 'desc'))
            const unsubscribe = onSnapshot(q, (snapshot) => (
                setLastMsg(snapshot.docs.map(doc => doc.data()))
            ))

            return () => {
                unsubscribe()
            }
        }
    }, [id])


    const lastmessage = (string) => {
        if (string?.length > 25) {
            return (string.substring(0, 25) + "...")
        } else {
            return string
        }
    }

    return !addNewChat ?
        (
            <Link to={`/rooms/${id}`} style={{ textDecoration: "none" }}>
                <div className='sidebarChat' id={id}>
                    <Avatar src={userImg ? userImg : tempImg} />
                    <div className="sidebarChat__info">
                        <h2>{name}</h2>
                        <p>{lastmessage(lastMsg[0]?.message)}</p>
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
