import React, { useState } from 'react'
import { Link } from 'react-router-dom'


type Person = {
    username: string
    password: string
}


// type Person = {
//   username: string;
//   password: string;
// };

function LogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(username, password);

        if (username != username) {
            setMessage("this username isn´t a user, register instead")
        } else if (password != password) {
            setMessage("wrong password")
        } else {
            setMessage("")
        }
    }

  

  return (
    <div className='grid grid-cols-1 grid-auto place-items-center'>
        <div className='pt-24'>
            <form onSubmit={submit}>
                <h1 className='text-center mb-10 md:mb-16 text-3xl md:text-4xl font-bold'>Log in</h1>
                <div className='form'>
                    <div className='field'>
                        <input type="text"
                        name='username' 
                        className='form-control block h-12 w-72 px-6 md:w-96 py-1.5 text-lg font-normal bg-white mt-12 md:mt-8 
                        rounded-lg transition ease-in-out focus:bg-white focus:outline-none'
                        placeholder='Username' 
                        required onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className='field'>
                        <input type="password" 
                        name='password' 
                        className='form-control block h-12 w-72 px-6 md:w-96 py-1.5 text-lg font-normal bg-white mt-4 
                        rounded-lg transition ease-in-out focus:bg-white focus:outline-none'
                        placeholder='Password' 
                        required  onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className='bg-properTeal hover:bg-darkTeal text-white font-normal py-2 px-4 rounded-lg w-72 md:w-96 mt-8'>Sign in</button>
                </div>
                <div>
                    <p className='text-center mt-8'>Not a member? <Link to='/register' className='text-darkTeal hover:underline'>Register now</Link></p>
                </div>
            </form>
        </div>
    </div>
  );
}

export default LogIn;
