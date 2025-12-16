import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState("Black")



  return (
    <div
      className="w-screen h-screen duration-200 flex justify-center items-center"
      style={{ backgroundColor: color }}
    >
      <p className='text-4xl font-bold text-white'>{color}</p>
<div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
  <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl'>
    <button className='outline-none px-4 py-1 rounded-full shadow-lg'
    style={{backgroundColor: "red"}}
    onClick={()=> setColor("Red")}>Red</button>
    <button className='outline-none px-4 py-1 rounded-full shadow-lg'
    style={{backgroundColor: "orange"}}
    onClick={()=> setColor("Orange")}>Orange</button>
    <button className='outline-none px-4 py-1 rounded-full shadow-lg'
    style={{backgroundColor: "yellow"}}
    onClick={()=> setColor("Yellow")}>Yellow</button>
    <button className='outline-none px-4 py-1 rounded-full shadow-lg'
    style={{backgroundColor: "green"}}
    onClick={()=> setColor("Green")}>Green</button>
    <button className='outline-none px-4 py-1 rounded-full shadow-lg'
    style={{backgroundColor: "blue"}}
    onClick={()=> setColor("Blue")}>Blue</button>
    <button className='outline-none px-4 py-1 rounded-full shadow-lg'
    style={{backgroundColor: "indigo"}}
    onClick={()=> setColor("Indigo")}>Indigo</button>
    <button className='outline-none px-4 py-1 rounded-full shadow-lg'
    style={{backgroundColor: "violet"}}
    onClick={()=> setColor("Violet")}>Violet</button>
  </div>
</div>

    </div>
  )
}

export default App
