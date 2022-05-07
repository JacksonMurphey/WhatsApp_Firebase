import React from 'react'
import './ChatBody.css'

const ChatBody = (props) => {
    const { messages, user } = props

    return (
        <div className='chat__body'>
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
    )
}

export default ChatBody