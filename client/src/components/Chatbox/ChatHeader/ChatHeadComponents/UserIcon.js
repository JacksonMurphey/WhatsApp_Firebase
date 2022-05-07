import React from 'react'
import { Avatar } from '@material-ui/core'


const UserIcon = (props) => {
    const { roomData } = props

    return (
        <React.Fragment>
            {
                roomData?.madeByImg ?
                    <Avatar src={roomData.madeByImg} />
                    :
                    <Avatar src='https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' />
            }
        </React.Fragment>
    )
}

export default React.memo(UserIcon)