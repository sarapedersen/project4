import React from 'react'
import { Link } from 'react-router-dom'
import LogIn from '../components/LogIn'


function LogInPage() {
    return (
        <div className='h-screen bg-[url("./icons/background.svg")] bg-no-repeat bg-cover bg-center bg-fixed'>
            <LogIn/>
        </div>
    )
}

export default LogInPage