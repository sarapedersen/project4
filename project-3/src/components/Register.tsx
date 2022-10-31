import React, { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Link } from 'react-router-dom'


function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [message, setMessage] = useState("")
  const [message2, setMessage2] = useState("")

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    let isEqual = false
    let isCorrectlength = false
    if (password.length <= 2 || password2.length <= 2 || username.length <= 2) {
      setMessage2("All fields must have minimun lenght of three characters")
      isCorrectlength = false
    } else {
      setMessage2("")
      isCorrectlength = true
    }
    console.log(username, password, password2)
    if (password === password2) {
      setMessage("")
      isEqual = true
      
      console.log(password, password2)
    } else {
      setMessage("Passwords are not equal")
      isEqual = false
      
    }
    console.log(isEqual, isCorrectlength)
    regUser(isEqual, isCorrectlength)
  };

  const regUser = (isEqual: Boolean, isCorrectlength: Boolean) => {
    if(isEqual === true && isCorrectlength === true){
        console.log(2345)
        //legg inn logikk 
    }
  }
  

  return (
    <div className='grid grid-cols-1 grid-auto place-items-center'>
      <div className="pt-24">
        <form>
          <h1 className='text-center mb-10 md:mb-16 text-3xl md:text-4xl font-bold'>Register</h1>
          <div className="form">
            <div className="field">
              <input
                type="text"
                name="username"
                className='form-control block h-12 w-72 px-6 md:w-96 py-1.5 text-lg font-normal bg-white mt-12 md:mt-8 
                        rounded-lg transition ease-in-out focus:bg-white focus:outline-none'
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="field">
              <input
                type="password"
                name="password"
                className='form-control block h-12 w-72 px-6 md:w-96 py-1.5 text-lg font-normal bg-white mt-4 
                rounded-lg transition ease-in-out focus:bg-white focus:outline-none'
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="field">
              <input
                type="password"
                name="password"
                className='form-control block h-12 w-72 px-6 md:w-96 py-1.5 text-lg font-normal bg-white mt-4 
                rounded-lg transition ease-in-out focus:bg-white focus:outline-none'
                placeholder="Password"
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>
            <p> {message} </p>
            <p> {message2} </p>
            <button type="submit" className='bg-properTeal hover:bg-darkTeal text-white font-normal py-2 px-4 rounded-lg w-72 md:w-96 mt-8' onClick={submit}>Register</button>
          </div>
          <div>
            <p className='text-center mt-8'>Already a member? <Link to='/' className='text-darkTeal hover:underline'>Log in</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
