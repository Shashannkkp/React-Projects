import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)

  //useRef Hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "" 
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_-=+"

    for (let i = 0; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)
    
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordtoClipboard = useCallback(() =>{
    if (!password) return

    passwordRef.current?.select();
    passwordRef.current.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }, [password])

  useEffect( () => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator] )

  return (
   <>
     <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950'>
      <div className='w-full max-w-md p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-blue-500 '
      >
        <h1 className="text-3xl font-bold text-white text-center">
          Password Generator 🔐 </h1>
          <p className="text-sm text-gray-400 text-center mt-2">
          Create a strong and secure password instantly</p>
        <div className="flex mt-6">
          <input 
          type="text" 
          value={password}
          className='flex-1 px-4 py-3 bg-white/10 text-white border border-white/20 rounded-1-x1 outline-none focus:border-blue-500 rounded-md'
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />

          <button
          onClick={copyPasswordtoClipboard}
          className={`px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-r-xl transition-all duration-200 rounded-md' ${
            copied
              ? 'bg-green-500 text-white shadow-lg shadow-green-500/40 rounded-md'
              : 'bg-blue-700 text-white hover:bg-blue-600 rounded-md'
          }`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          
        </div>
        <div className='flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm'>
           
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={8}
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
            <label htmlFor="characterInput">Characters</label>   
          </div>
        </div>
        <button
              onClick={passwordGenerator}
              className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02]"
               >
                Generate Password ⚡
        </button>
      </div>
    </div>
   </>
  )
}

export default App
