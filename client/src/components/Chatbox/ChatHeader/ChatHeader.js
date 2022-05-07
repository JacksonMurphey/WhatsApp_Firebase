import React from 'react'
import './ChatHeader.css'

//component imports
import UserIcon from './ChatHeadComponents/UserIcon'
import HeadInfo from './ChatHeadComponents/HeadInfo'
import HeadIcons from './ChatHeadComponents/HeadIcons'


const ChatHeader = (props) => {

    const { roomData, messages, setSearchTerm } = props

    return (
        <div className='chat__header'>
            <UserIcon roomData={roomData} />
            <HeadInfo roomData={roomData} messages={messages} />
            <HeadIcons setSearchTerm={setSearchTerm} />
        </div>
    )
}

export default React.memo(ChatHeader)