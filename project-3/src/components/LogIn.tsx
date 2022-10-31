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
    <div className='grid grid-cols-1 grid-auto'>
        <div className='justify-self-center'>
            <form onSubmit={submit}>
                <h1>Log in</h1>
                <div className='form'>
                    <div className='field'>
                        <input type="text"
                        name='username' 
                        className='form-control block h-12 w-72 px-6 md:w-96 py-1.5 text-lg font-normal text-gray-700 bg-white mt-20 md:mt-8 md:mb-6
                        rounded-lg transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                        placeholder='Username' 
                        required onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className='field'>
                        <input type="password" 
                        name='password' 
                        className='form-control block h-12 w-72 px-6 md:w-96 py-1.5 text-lg font-normal text-gray-700 bg-white mt-20 md:mt-8 md:mb-6
                        rounded-lg transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                        placeholder='Password' 
                        required  onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className='bg-properTeal hover:bg-darkTeal text-white font-bold py-2 px-4 rounded-lg'> Sign in</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LogIn

