import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { currentUser, darkMode, userLoginPage } from '../data/userData'
import { User } from '../types'


function LogIn() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const setUserState = useSetRecoilState(userLoginPage)
    const userCredentials = useRecoilValue(currentUser)
    const [darkmode, setDarkmode] = useRecoilState(darkMode)
    const inputStyle = ' form-control block h-12 w-72 px-6 md:w-96 py-1.5 text-lg font-normal mt-4 rounded-lg transition ease-in-out focus:outline-none'
    const btnStyle = ' text-white font-normal py-2 px-4 rounded-lg w-72 md:w-96 mt-8'
   

    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        const inputCredentials: User = {
            username: username, 
            password: password, 
            id: "",
            beenTo: []
        }
        setUserState(inputCredentials) 
        if (username != null) {
            setMessage("Wrong username or password. Check spelling and try again.")  
        }    
    }

    useEffect(() => {
        if (userCredentials === null) return
        if (userCredentials.id !== "") {
            navigate("/countries")
        } 
    }, [userCredentials])

    
    return (
        <div className={darkmode ? 'text-white grid grid-cols-1 grid-auto place-items-center' : 'grid grid-cols-1 grid-auto place-items-center'}>
            <div className='pt-24'> 
                <form onSubmit={submit}>
                    <h1 className='text-center mb-10 md:mb-16 text-3xl md:text-4xl font-bold '>Log in</h1>
                    <div className='form'>
                        <div className='field'>
                            <input type="text"
                            name='username' 
                            className={darkmode ? 'bg-[#444444]' + `${inputStyle}` : 'bg-white' + `${inputStyle}`}
                            placeholder='Username' 
                            onChange={e => setUsername(e.target.value)}/>
                        </div>
                        <div className='field'>
                            <input type="password" 
                            name='password' 
                            className={darkmode ? 'bg-[#444444]' + `${inputStyle}` : 'bg-white' + `${inputStyle}`}
                            placeholder='Password' 
                            onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <p role="error" className={darkmode ? 'text-yellow px-4 mt-2 w-72 md:w-96': 'text-red px-4 mt-2 w-72 md:w-96'}> {message} </p>
                        <button type="submit" className={darkmode ? 'bg-[#07111F] hover:bg-[#0e1216]' + `${btnStyle}` : 'bg-properTeal hover:bg-darkTeal' + `${btnStyle}`}>Sign in</button>
                    </div>
                    <div>
                        <p className='text-center mt-8'>Not a member? <Link  to='/register' className={darkmode ? 'text-purple hover:underline' : 'text-darkTeal hover:underline'}><span tabIndex={0}>Register now</span></Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LogIn;
