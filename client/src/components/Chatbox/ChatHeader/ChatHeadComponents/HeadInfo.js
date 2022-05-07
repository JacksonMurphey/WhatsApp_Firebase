import React from 'react'
import '../ChatHeader.css'

const HeadInfo = (props) => {

    const { roomData, messages } = props


    return (
        <div className='chat__headerInfo'>
            <h3>{roomData?.name}</h3>
            <p>Last Replied to on {new Date(messages[messages.length - 1]?.timestamp.toDate()).toDateString()} at {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toLocaleTimeString()}</p>
        </div>
    )
}

export default React.memo(HeadInfo)