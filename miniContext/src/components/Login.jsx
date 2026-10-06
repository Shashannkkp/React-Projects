import React, {useState, useContext} from 'react'
import UserContext from '../context/UserContext'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { setUser } = useContext(UserContext)
   
    const handleSubmit = () =>{
       e.preventDefault()
       setUser({username, password})
    }
  return (
    <div>
        <h2>Login</h2>
        <imput type='Text' 
        value={username}
        onChange={() => setUsername(e.target.value)}
        placeholder='username' />
        <imput type='Text' 
        value={password}
        onChange={() => setPassword(e.target.value)}
        placeholder='password' />
        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Login
