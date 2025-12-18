import { useState } from 'react'
import './App.css'
import Profile from './components/Profile'
import Login from './components/Login'
import UserContextProvider from './context/UserContextProvider'


function App() {
  const [count, setCount] = useState(0)

  return (
    <UserContextProvider>
      <h1 className='text-3xl bg-green-600 text-white'>Mini Context</h1>
      <Login />
      <Profile />
    </UserContextProvider>
  )
}

export default App
