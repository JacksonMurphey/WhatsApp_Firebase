import React, { useState } from 'react'
import '../ChatHeader.css'

//material-ui imports
import { IconButton } from '@material-ui/core';
import Search from '@material-ui/icons/Search'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVert from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search'

const HeadIcons = (props) => {

    const { setSearchTerm } = props
    const [isSearching, setIsSearching] = useState(false)
    const searchHandler = () => {
        setIsSearching(!isSearching)
    }

    return (
        <div className='chat__headerRight'>

            {!isSearching ?
                <IconButton onClick={searchHandler}>
                    <Search />
                </IconButton>
                :
                <div className="search__ChatContainer">
                    <SearchIcon onClick={searchHandler} />
                    <input
                        type='text'
                        placeholder='Search Chat'
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            }

            <IconButton>
                <AttachFileIcon />
            </IconButton>
            <IconButton>
                <MoreVert />
            </IconButton>
        </div>
    )
}

export default HeadIcons