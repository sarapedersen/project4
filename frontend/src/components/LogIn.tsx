import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { findUser } from '../data/queries'
import { darkMode, userLoginPage } from '../data/userData'
import { User } from '../types'


function LogIn() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const setUserState = useSetRecoilState(userLoginPage)
    const [users, setUser] = useState<User>(getUser)
    const darkmode = useRecoilValue(darkMode)
    const inputStyle = ' form-control block h-12 w-72 px-6 md:w-96 py-1.5 text-lg font-normal mt-4 rounded-lg transition ease-in-out focus:outline-none'
    const btnStyle = ' text-white font-normal py-2 px-4 rounded-lg w-72 md:w-96 mt-8 '
    
    //get user from backend
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

    /* Session storage off username and password */
    useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(users))
        setUsername(users.username)
        setPassword(users.password)
    }, [users])


    /* Removes the error message when the user begins to write in the input fields */
    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setUsername(event.target.value)
        setPassword(event.target.value)
		setUser((previousValues) => ({
			...previousValues,
			[event.target.name]: event.target.value,
		}))
        setMessage("")
    }
    
    /* Collects the login information, sends to backend for validation */
    const submit = async (e: React.FormEvent) => {
        e.preventDefault()
    
        const userCredentials: User | null = await findUser(username, password)
        if (userCredentials === null) {
            setMessage("Wrong username or password. Check spelling and try again.") 
            return
        } else if (userCredentials.id !== "") {
            setUserState(userCredentials)
            setMessage("")
            navigate("/countries")
        }   
    }

    
    return (
        <div className={darkmode ? 'text-white grid grid-cols-1 grid-auto place-items-center' : 'grid grid-cols-1 grid-auto place-items-center'}>
            <div className='pt-10'> 
            <React.Suspense fallback="Loading...">
                <form onSubmit={submit}>
                    {/* Log in fields */}
                    <h1 className='text-center mb-10 md:mb-16 text-3xl md:text-4xl font-bold '>Log in</h1>
                    <div className='form'>
                        <div className='field'>
                            <input type="text"
                            name='username' 
                            className={darkmode ? 'bg-[#444444]' + inputStyle : 'bg-white' + inputStyle}
                            placeholder='Username' 
                            onChange={handleChange}
                            value={users.username}/>
                        </div>
                        <div className='field'>
                            <input type="password" 
                            name='password' 
                            className={darkmode ? 'bg-[#444444]' + inputStyle : 'bg-white' + inputStyle}
                            placeholder='Password' 
                            onChange={handleChange}
                            value={users.password}/>
                        </div>
                        <p role="error" className={darkmode ? 'text-yellow px-4 mt-2 w-72 md:w-96': 'text-red px-4 mt-2 w-72 md:w-96'}> {message} </p>
                        {/* Log in button */}
                        <button type="submit" className={darkmode ? 'bg-[#4F4B81] bg-opacity-80 hover:bg-opacity-100' + btnStyle : 'bg-properTeal hover:bg-darkTeal' + btnStyle}>Sign in</button>
                    </div>
                    <div>
                        {/* Link to register page */}
                        <p className='text-center mt-8'>Not a member? <Link  to='/register' className={darkmode ? 'text-purple hover:underline' : 'text-darkTeal hover:underline'}><span tabIndex={0}>Register now</span></Link></p>
                    </div>
                </form>
            </React.Suspense>
            </div>
        </div>
    )
}

export default LogIn;
