import React from 'react'
import { useContext } from 'react'
import UserContext from '../context/UserContext'

function Profile() {
    const {user} = useContext(UserContext)

    if (!user) return <div className='mt-2 text-2xl font-extrabold text-green-700'>Please Login!</div>

    return <div className='mt-2 text-2xl font-extrabold text-green-700'>Welcome {user.username}</div>

}

export default Profile
