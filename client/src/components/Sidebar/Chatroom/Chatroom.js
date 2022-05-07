import React from 'react'
import { Link } from 'react-router-dom'
import './Chatroom.css'

//material-ui imports
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import { IconButton } from '@material-ui/core';
import { Avatar } from '@material-ui/core'


const Chatroom = (props) => {

    const { id, userImg, tempImg, name, lastMsg, deleteRoom } = props

    const lastmessage = (string) => {
        if (string?.length > 25) {
            return (string.substring(0, 25) + "...")
        } else {
            return string
        }
    }

    return (
        <Link to={`/rooms/${id}`}>
            <div className="btn">
                <IconButton>
                    <HighlightOffOutlinedIcon />
                </IconButton>
            </div>
            <div className="chatroom">
                <Avatar src={userImg ? userImg : tempImg} />
                <div className="chatroom__info">
                    <h2>{name}</h2>
                    <p>{lastmessage(lastMsg[0]?.message)}</p>
                </div>

            </div>
        </Link>
    )
}

export default Chatroom