import { useState, useCallback, useEffect, useRef } from 'react'

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)


  const password_generator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "!@#$%^&*_+[]{}~`"

    for (let i = 1; i <= length; i++) {
      const charIndex = Math.floor(Math.random() * str.length)
      pass += str.charAt(charIndex)
    }

    setPassword(pass)
  }, [length, numberAllowed, characterAllowed, setPassword])


  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100)
    window.navigator.clipboard.writeText(password)
  }, [password])



  useEffect(()=>{
    password_generator()
  }, [length, numberAllowed, characterAllowed, password_generator])



return (
  <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-3 pt-2'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3 bg-white'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />

        <button
        onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer hover:bg-blue-800'>copy</button>
      </div>
      <div className='flex text-sm gap-x-6'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label className='my-2'>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={numberAllowed}
          id='numberInput'
          className='cursor-pointer'
          onChange={()=>{setNumberAllowed((prev) => !prev);}} 
          />
          <label className='cursor-pointer' htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1 '>
          <input 
          type="checkbox"
          defaultChecked={characterAllowed}
          id='characterInput'
          className='cursor-pointer'
          onChange={()=>{setCharacterAllowed((prev)=>!prev);}}
          />
          <label className='cursor-pointer' htmlFor="characterInput">Characters</label>
        </div>
      </div>


    </div>
  </>
)


}

export default App
