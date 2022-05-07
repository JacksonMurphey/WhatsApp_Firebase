import React from 'react'
import './Header.css'

//material-ui imports
import { Avatar, IconButton } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const Header = (props) => {
    const { user, isSearching, setIsSearching } = props

    return (
        <div className='header'>
            <Avatar src={user?.photoURL} />
            <div className="header__right">
                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default React.memo(Header)