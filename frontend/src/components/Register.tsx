import React, { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import {  useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { allUsernames, currentUser, darkMode, userRegisterPage } from "../data/userData";
import { defaultUser, User } from "../types"



function Register() {
	const user = useSetRecoilState(userRegisterPage);
	const usernames = useRecoilValue(allUsernames)
	const userValue = useRecoilValue(currentUser)
  	const navigate = useNavigate()
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [password2, setPassword2] = useState("")
	const [message, setMessage] = useState("")
	const [message2, setMessage2] = useState("")
	const [message3, setMessage3] = useState("")
	const darkmode = useRecoilValue(darkMode)
	const inputStyle = ' form-control block h-12 w-72 px-6 md:w-96 py-1.5 text-lg font-normal mt-4 rounded-lg transition ease-in-out focus:outline-none'
    const btnStyle = ' text-white font-normal py-2 px-4 rounded-lg w-72 md:w-96 mt-8'
   
	

	const submit = (e: React.FormEvent) => {
		e.preventDefault()

		/* Validation of registration fields */
		let isEqual = false
		let isCorrectlength = false
		let isFree = false
		if (password.length <= 2 || password2.length <= 2 || username.length <= 2) {
		setMessage2("All fields must have minimum lenght of three characters.")
		isCorrectlength = false
		} else {
		setMessage2("")
		isCorrectlength = true
		}
		if (usernames.includes(username)) {
			setMessage3("Username is already taken. Select another name.")
		} else {
			setMessage3("")
			isFree = true
		}
		if (password === password2) {
		setMessage("")
		isEqual = true
		} else {
		setMessage("Passwords do not match.")
		isEqual = false
		}
		regUser(isEqual, isCorrectlength, isFree)
	}

	const regUser = (isEqual: Boolean, isCorrectlength: Boolean, isFree: Boolean) => {
		if (isEqual === true && isCorrectlength === true && isFree === true) {
			let newUser: User =  {
				username: username,
				password: password,
				beenTo: [],
				id: ""
			}
			user(newUser)
		}
	}

	useEffect(() => {
		if (userValue !== undefined) {
			user(defaultUser)
            navigate("/countries")
        } 
	}, [userValue, user, navigate])

  	return (
		<div className={darkmode ? 'text-white grid grid-cols-1 grid-auto place-items-center' :  'grid grid-cols-1 grid-auto place-items-center'}>
		<div className="pt-10">
			<form>
			<h1 className='text-center mb-10 md:mb-16 text-3xl md:text-4xl font-bold'>Register</h1>
			<div className="form">
				<div className="field">
				<input
					type="text"
					name="username"
					className={ darkmode ? 'bg-[#444444]' + `${inputStyle}` : 'bg-white' + `${inputStyle}`}
					placeholder="Username"
					onChange={(e) => setUsername(e.target.value)}
				/>
				</div>
				<div className="field">
				<input
					type="password"
					name="password"
					className={darkmode ? 'bg-[#444444]' + `${inputStyle}` : 'bg-white' + `${inputStyle}`}
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				</div>
				<div className="field">
				<input
					type="password"
					name="password"
					className={darkmode ? 'bg-[#444444]' + `${inputStyle}` : 'bg-white' + `${inputStyle}`}
					placeholder="Repeat password"
					onChange={(e) => setPassword2(e.target.value)}
				/>
				</div>
				<p className={darkmode ? 'text-yellow px-4 mt-2 w-72 md:w-96': 'text-red px-4 mt-2 w-72 md:w-96'}> {message} {message2} {message3}</p>
				<button type="submit" className={darkmode ? 'bg-[#4F4B81] bg-opacity-80 hover:bg-opacity-100' + `${btnStyle}` : 'bg-properTeal hover:bg-darkTeal' + `${btnStyle}`} onClick={submit}>Register</button>
				</div>
			<div>
				<p className='text-center mt-8'>Already a member? <Link to='/' className={darkmode ? 'text-purple hover:underline' : 'text-darkTeal hover:underline'}>Log in</Link></p>
			</div>
			</form>
		</div>
		</div>
	)
}

export default Register
