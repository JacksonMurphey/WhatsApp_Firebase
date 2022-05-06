import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Chat.css'

import { Avatar, IconButton } from '@material-ui/core'
import Search from '@material-ui/icons/Search'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVert from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

import db from '../../firebase'
import { collection, getDocs, onSnapshot, query, where, getDoc, doc, orderBy, collectionGroup, addDoc, Timestamp } from 'firebase/firestore'
import { useStateValue } from '../../store/UserProvider'
// import { getDatabase, ref, onValue } from 'firebase/database'
// import db from '../../firebase'
// import { doc, onSnapshot, collection, addDoc, Timestamp } from 'firebase/firestore'


const Chat = () => {

    const [input, setInput] = useState('')
    // const [roomName, setRoomName] = useState('')
    const [roomData, setRoomData] = useState({})
    const [messages, setMessages] = useState([])
    const { roomId } = useParams()
    const [{ user }, dispatch] = useStateValue()



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
                // setRoomName(doc.data().name)
                setRoomData(doc.data())
                console.log(doc.data())
            })

            //---HOW TO TARGET A NESTED COLLECTION---
            const q = query(collection(db, 'rooms', roomId, 'messages'), orderBy('timestamp', 'asc'))

            const unsubscribe = onSnapshot(q, (snapshot) => {
                setMessages(snapshot.docs.map((doc) => {
                    console.log(doc.data())
                    return doc.data()
                }))
            })


            return () => {
                unsub()
                unsubscribe()
            }
        }
    }, [roomId])

    //This return an array of objects containing all messages
    // const colref = collectionGroup(db, 'messages')
    // const getData = () => {
    //     getDocs(colref)
    //         .then(res => {
    //             console.log(res.docs.map(item => {
    //                 return item.data()
    //             }))
    //             // res.docs.forEach(doc => {
    //             //     if(doc.id === roomId)
    //             // })
    //         })
    //         .catch(err => console.log(err))
    // }
    // getData()

    const sendMessageHandler = async (e) => {
        e.preventDefault()
        try {
            await addDoc(collection(db, 'rooms', roomId, 'messages'), {
                message: input,
                name: user.displayName,
                timestamp: Timestamp.now()
            })
        } catch (err) {
            alert(err)
        }
        setInput('')
    }

    return (
        <div className="chat">
            <div className="chat__header">
                {roomData.madeByImg ?
                    <Avatar src={roomData.madeByImg} />
                    :
                    <Avatar src='https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' />
                }

                <div className="chat__headerInfo">
                    <h3>{roomData.name}</h3>
                    <p>Last replied to on {new Date(messages[messages.length - 1]?.timestamp.toDate()).toDateString()} at {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toLocaleTimeString()}</p>
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
                {messages.map((message, index) => (
                    <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}
                        key={index}>

                        <span className="chat__name">
                            {message.name}
                        </span>
                        {message.message}
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
                        </span>
                    </p>
                ))}

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