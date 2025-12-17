import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {
    const initialData = useLoaderData()
    const [data, setData] = useState([initialData])
    const [username, setUsername] = useState ("")
    const defaultimage = "https://static.vecteezy.com/system/resources/previews/042/125/224/non_2x/people-person-contact-black-solid-flat-glyph-icon-single-icon-isolated-on-white-background-free-vector.jpg"
    // const [data, setData] = useState([initialData])
    // useEffect(() => {
    //     fetch('https://api.github.com/users/muhammadnouraiz')
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //         setData(data)
    //     })
    // }, [])


    const searchUser = async () => {
        if (!username) return; // Don't search if input is empty

        try {
            const response = await fetch(`https://api.github.com/users/${username}`)
            const result = await response.json()
            
            if (response.ok) {
                setData(result)
            } else {
                alert("User not found!")
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center m-4 bg-gray-600 text-white p-8 rounded-lg'>
    <div className='text-3xl mb-6'>Github followers: {data.followers}</div>

    <img 
        className='rounded-3xl mb-6 shadow-lg' 
        src={data.avatar_url ? data.avatar_url : defaultimage} 
        alt="" 
        width={300} 
    />

    <input 
        type="text" 
        name={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Github username" 
        className="w-64 py-2 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 text-sm focus:border-orange-500 focus:outline-none mb-4" 
    />

    <button 
        className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200" onClick={searchUser}
    >
        Search User
    </button>
</div>
    )
}

export default Github

export const githubInfoLoader = async () =>{
    const response = await fetch('https://api.github.com/users/muhammadnouraiz')
    return response.json()
}