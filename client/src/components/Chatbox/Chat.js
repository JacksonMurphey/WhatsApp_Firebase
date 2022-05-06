import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Chat.css'

import { Avatar, IconButton } from '@material-ui/core'
import Search from '@material-ui/icons/Search'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVert from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { collection, getDocs, onSnapshot, query, where, getDoc, doc } from 'firebase/firestore'
import db from '../../firebase'

// import db from '../../firebase'
// import { doc, onSnapshot, collection, addDoc, Timestamp } from 'firebase/firestore'


const Chat = () => {

    const [input, setInput] = useState('')
    const [roomName, setRoomName] = useState('')
    const { roomId } = useParams()




    useEffect(() => {
        if (roomId) {
            // const roomsRef = collection(db, 'rooms')
            // const q = query(roomsRef)
            // onSnapshot(q, (querySnapshot) => {
            //     querySnapshot.docs.forEach((doc) => {
            //         if (doc.id === roomId) {
            //             setRoomName(doc.data().name)
            //         }
            //     })
            // })
            // at first I couldnt find in the firebase docs, how to query 
            //where('id', '==', roomId).. So I instead queried my collection, then looped thru it and checked, then set the name. This worked.

            //---HOW TO FIND ONE DOC FROM COLLECTION---
            const unsub = onSnapshot(doc(db, 'rooms', roomId), (doc) => {
                // console.log("data: ", doc.data().name)
                setRoomName(doc.data().name)
            })
            return () => {
                unsub()
            }
        }
    }, [roomId])




    const sendMessageHandler = async (e) => {
        e.preventDefault()

    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at...</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <Search />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                <p className="chat__message ">
                    <span className="chat__name">Jackson</span>
                    Hey Guys!
                    <span className="chat__timestamp">3:52pm</span>
                </p>
            </div>

            <div className="chat__footer" >
                <InsertEmoticonIcon />
                <form >
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder='Type a message'
                    />
                    <button onClick={sendMessageHandler} type='submit'>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}
export default Chat