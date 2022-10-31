import React from 'react'
import Register from '../components/Register';


function RegisterPage() {
    return (
        <div className='h-screen md:bg-[url("./icons/background.svg")] bg-[url("./icons/background_mobile.svg")] bg-no-repeat bg-cover bg-center bg-fixed'>
            <Register/>
        </div>
    )
}

export default RegisterPage