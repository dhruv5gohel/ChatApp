import React from 'react'
import { Avatar } from 'rsuite'

const ProfileAvatar = ({ src, alt, className }) => {

    return (
        <>
            {src ? <Avatar src={src} alt={alt} circle className={className}/> : <Avatar src={src} alt={alt} circle className={className}>{alt.slice(1, 3).toUpperCase()}</Avatar>}
        </>
    )
}

export default ProfileAvatar
