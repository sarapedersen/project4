import React from 'react'
import LogIn from '../components/LogIn'


function LogInPage() {
    return (
        <div className='h-screen md:bg-[url("./icons/background.svg")] bg-[url("./icons/background_mobile.svg")] bg-no-repeat bg-cover bg-center bg-fixed'>
            <LogIn/>
        </div>
    )
}

export default LogInPage