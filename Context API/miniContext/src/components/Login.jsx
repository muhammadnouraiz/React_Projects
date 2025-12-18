import React from 'react'
import { useState, useContext } from 'react'
import UserContext from '../context/UserContext'

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {setUser} = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        setUser({username, password})
    }
    return (
        <div className='bg-gray-100 p-6 w-64 mx-auto flex flex-col items-center justify-center rounded-lg shadow-md mt-5'>
            <h1 className='text-2xl font-bold text-green-700'>Login</h1>
            <input className='my-1 bg-white p-2 shadow-md mt-5 rounded-xl' type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            placeholder='username' />
            {""}
            <input className=' bg-white p-2 shadow-md mt-5 rounded-xl' type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='password' /> 
            <button className=' text-white bg-green-700 hover:bg-green-800 hover:shadow-md mt-6 py-2 px-4 rounded-2xl' onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Login
