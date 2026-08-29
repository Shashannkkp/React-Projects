import { useState, useCallback } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = "" 
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_-=+"

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)
    
  }, [length, numberAllowed, charAllowed])



  return (
   <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-blue-500'
      >
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
          type="text" 
          value={password}
          className='outline-none w-full py-1 px-3 bg-white'
          placeholder='Password'
          readOnly
          
          />

          <button
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(Number(e.target.value))} }
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
             <input 
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            className='bg-white text-black-500 rounded-md'
            onChange={() => {
                  setNumberAllowed((prev) => !prev);
               }}
            />
            <label htmlFor="numberinput">Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
             <input 
            type="checkbox"
            checked={charAllowed}
            id="characterInput"
            className='bg-white text-black-500 rounded-md'
            onChange={() => {
                  setCharAllowed((prev) => !prev);
               }}
            />
            <label 
            htmlFor="characterInput">Characters</label>



          </div>
        </div>
      </div>
   </>
  )
}

export default App
