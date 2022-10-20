import React, { useState } from 'react'



function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(username,password, password2)
        if (password === password2) {
            console.log(password, password2)
        } else {
            console.log("passwords are unequal")
        }
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
                <div className='field'>
                    <input type="password" name='password' placeholder='Password' required  onChange={e => setPassword2(e.target.value)}/>
                </div>
                <button type="submit"> Login</button>
            </div>
        </form>
    </div>
  )
}

export default Register