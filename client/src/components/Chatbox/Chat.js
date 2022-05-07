import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Chat.css'

//component imports
import ChatHeader from './ChatHeader/ChatHeader'
import ChatBody from './ChatBody/ChatBody';
import ChatFooter from './ChatFooter/ChatFooter';

//firebase imports
import db from '../../firebase'
import { collection, onSnapshot, query, doc, orderBy, addDoc, Timestamp } from 'firebase/firestore'

//context/reducer imports
import { useStateValue } from '../../store/UserProvider'



const Chat = () => {

    const [input, setInput] = useState('')
    const [roomData, setRoomData] = useState({})
    const [messages, setMessages] = useState([])
    const { roomId } = useParams()
    const [{ user }, dispatch] = useStateValue()

    const [searchTerm, setSearchTerm] = useState('')


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

    let filteredMessages = messages.filter((message) => (
        message.message.includes(searchTerm) || message.name.includes(searchTerm)))

    return (
        <div className="chat">
            <ChatHeader roomData={roomData} messages={messages}
                setSearchTerm={setSearchTerm} />

            <ChatBody messages={filteredMessages} user={user} />

            <ChatFooter input={input} setInput={setInput}
                sendMessageHandler={sendMessageHandler} />
        </div>
    )
}
export default Chat