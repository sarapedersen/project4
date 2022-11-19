import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { currentUser, darkMode, userLoginPage } from '../data/userData'
import { defaultUser, User } from '../types'


function LogIn() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const setUserState = useSetRecoilState(userLoginPage)
    const tempUserCredentials = useRecoilValueLoadable(currentUser)
    const [users, setUser] = useState<User>(getUser)
    const userCredentials = tempUserCredentials.state === 'hasValue' ? tempUserCredentials.contents : undefined
    const darkmode = useRecoilValue(darkMode)
    const inputStyle = ' form-control block h-12 w-72 px-6 md:w-96 py-1.5 text-lg font-normal mt-4 rounded-lg transition ease-in-out focus:outline-none'
    const btnStyle = ' text-white font-normal py-2 px-4 rounded-lg w-72 md:w-96 mt-8'
    
    function getUser() {
        const storedUser = sessionStorage.getItem('user')
        if(!storedUser) return {
            id: "",
            username: "", 
            password: "", 
            beenTo: []
        }
        return JSON.parse(storedUser)
    }

    // session storage off username and password
    useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(users))
        setUsername(users.username)
        setPassword(users.password)
    }, [users])


    // removes the error message when the user begins to write in the input fields
    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setUsername(event.target.value)
        setPassword(event.target.value)
		setUser((previousValues) => ({
			...previousValues,
			[event.target.name]: event.target.value,
		}))
        setMessage("")
    }

   
    
    // collects the login information, sends to backend for validation
    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
        const inputCredentials: User = {
            username: username, 
            password: password, 
            id: "",
            beenTo: []
        }
        setUserState(inputCredentials)
        
    }

    // Handles login based on query to backend
    useEffect(() => {
        if (userCredentials === undefined) {
            return
        } else if (userCredentials.id !== "") {
            setMessage("")
            navigate("/countries")
        } else {
            setMessage("Wrong username or password. Check spelling and try again.") 
        }
    }, [navigate, userCredentials])

    
    return (
        <div className={darkmode ? 'text-white grid grid-cols-1 grid-auto place-items-center' : 'grid grid-cols-1 grid-auto place-items-center'}>
            <div className='pt-10'> 
            <React.Suspense fallback="Loading...">
                <form onSubmit={submit}>
                    <h1 className='text-center mb-10 md:mb-16 text-3xl md:text-4xl font-bold '>Log in</h1>
                    <div className='form'>
                        <div className='field'>
                            <input type="text"
                            name='username' 
                            className={darkmode ? 'bg-[#444444]' + `${inputStyle}` : 'bg-white' + `${inputStyle}`}
                            placeholder='Username' 
                            onChange={handleChange}
                            value={users.username}/>
                        </div>
                        <div className='field'>
                            <input type="password" 
                            name='password' 
                            className={darkmode ? 'bg-[#444444]' + `${inputStyle}` : 'bg-white' + `${inputStyle}`}
                            placeholder='Password' 
                            onChange={handleChange}
                            value={users.password}/>
                        </div>
                        <p role="error" className={darkmode ? 'text-yellow px-4 mt-2 w-72 md:w-96': 'text-red px-4 mt-2 w-72 md:w-96'}> {message} </p>
                        <button type="submit" className={darkmode ? 'bg-[#07111F] hover:bg-[#0e1216]' + `${btnStyle}` : 'bg-properTeal hover:bg-darkTeal' + `${btnStyle}`}>Sign in</button>
                    </div>
                    <div>
                        <p className='text-center mt-8'>Not a member? <Link  to='/register' className={darkmode ? 'text-purple hover:underline' : 'text-darkTeal hover:underline'}><span tabIndex={0}>Register now</span></Link></p>
                    </div>
                </form>
            </React.Suspense>
            </div>
        </div>
    )
}

export default LogIn;
