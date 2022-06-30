import React, { useEffect, useState } from 'react'
import Chatroom from './Chatroom/Chatroom'
import './SidebarChat.css'

//firebase imports
import db from '../../firebase'
import { collection, addDoc, Timestamp, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore'

//context/reducer imports 
import { useStateValue } from '../../store/UserProvider'



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

    const deleteRoom = async (id) => {
        if (!id) return

        try {
            await deleteDoc(doc(db, 'rooms', id))
        }
        catch (err) {
            alert(err)
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


    return !addNewChat ?
        (
            <Chatroom
                id={id}
                userImg={userImg}
                tempImg={tempImg}
                name={name}
                lastMsg={lastMsg}
                deleteRoom={deleteRoom}
            />
        )
        :
        (
            <div onClick={createChat} className="sidebarChat">
                <h3>Create New Chat</h3>
            </div>
        )
}
export default SidebarChat
