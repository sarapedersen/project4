import { useForm } from "react-hook-form"
import React, { useState } from 'react'


type Person = {
    username: string
    password: string
}



function LogIn() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(username,password)
        // setPassword('') 
        // setUsername('') 
        // Meteor.loginWithPassword({ username }, password);
      };

  return (
    <div>
        <form onSubmit={submit}>
            <h1>Log in</h1>
            <div className='form'>
                <div className='field'>
                    <input type="text" name='username' placeholder='Username' required onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className='field'>
                    <input type="password" name='password' placeholder='Password' required  onChange={e => setPassword(e.target.value)}/>
                </div>
                <button type="submit"> Login</button>
            </div>
        </form>
    </div>
  )
}

export default LogIn

