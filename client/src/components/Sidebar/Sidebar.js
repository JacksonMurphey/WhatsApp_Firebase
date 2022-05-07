import React, { useEffect, useState } from 'react'
import './Sidebar.css'

//component imports
import Header from './Header/Header'
import SidebarChat from './SidebarChat';
import Search from './Search/Search';

//firebase imports
import db from '../../firebase'
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore'

//context/reducer imports
import { useStateValue } from '../../store/UserProvider';


const Sidebar = () => {

    const [rooms, setRooms] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
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

    //Creating filter for search purposes
    let filteredRooms = rooms.filter((room) => room.data.name.includes(searchTerm))

    // const deleteFilter = id => {
    //     const filter = filteredRooms.filter(room => room.id !== id)
    //     filteredRooms = filter
    // }

    return (
        <div className="sidebar">
            <Header user={user} />
            <Search setSearchTerm={setSearchTerm} />

            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {filteredRooms.map((room) => (
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