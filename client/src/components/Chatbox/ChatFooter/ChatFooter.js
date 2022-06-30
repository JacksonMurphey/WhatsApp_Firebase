import React from 'react'
import './ChatFooter.css'

//material-ui imports
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

const ChatFooter = (props) => {

    const { input, setInput, sendMessageHandler } = props

    return (
        <div className='chat__footer'>
            <InsertEmoticonIcon />
            <form onSubmit={sendMessageHandler}>
                <input
                    type='text'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder='Type a message'
                />
                <button type='submit'>Send a message</button>
            </form>
            <MicIcon />
        </div>
    )
}

export default ChatFooter