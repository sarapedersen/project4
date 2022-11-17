import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {  useRecoilState, useSetRecoilState } from 'recoil';
import { searchState } from '../data/countryData';
import { userLoginPage, userRegisterPage, updateUserState, darkMode } from '../data/userData';
import { defaultUser } from '../types';
import darkModeImg from '../icons/darkmode.svg';
import lightModeImg from '../icons/lightmode.svg';

function Header() {
    const [query, setQuery] = useState("")
    
    const [searchCountries, setSearchCountries] = useRecoilState(searchState)
    const loginUser = useSetRecoilState(userLoginPage);
    const registerUser = useSetRecoilState(userRegisterPage);
    const updateUser = useSetRecoilState(updateUserState);
    const [darkmode, setDarkmode] = useRecoilState(darkMode);
    const btnStyle = " flex-shrink-0 ml-2 mr-16 px-4 h-12 mt-20 md:mt-8 md:mb-6 md:px-8 rounded-lg text-white "
    const inputStyle = " block h-12 w-52 ml-16 px-6 md:w-96 py-1.5 text-lg font-normal mt-20 md:mt-8 md:mb-6 rounded-lg transition ease-in-out focus:outline-none"
    const logoutStyle = "inline-block absolute top-3 right-2 md:mt-6 md:mb-6 px-6 py-2.5 bg-transparent md:text-white font-medium text-s leading-tight rounded hover:bg-gray-900 hover:bg-opacity-10 focus:outline-none focus:ring-0 active:bg-gray-900 active:bg-opacity-20 transition duration-150 ease-in-out"

    useEffect(() => {
        setQuery(searchCountries)
    }, [searchCountries])

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.currentTarget.value)
    }

    function handleClick() {
        loginUser(defaultUser)
        registerUser(defaultUser)
        updateUser(defaultUser)
    }
    // flex justify-center
    return (
        <div className="head">
            <div className={darkmode ? "md:bg-[#07111F] " : "md:bg-properTeal flex justify-center"}>
                <img className="inline-block absolute left-4 top-2 md:mt-6 md:mb-6" alt="darkmode button" src={darkmode ? darkModeImg : lightModeImg} width="100px" onClick={() => setDarkmode(!darkmode)}/>
                <form onSubmit={() => setSearchCountries(query)}>
                    {/* search bar */}
                    <div className="mb-3 md:max-w-none flex justify-center ">
                        <input type="text"
                        autoFocus
                        className={darkmode ? " bg-grey focus:bg-grey text-[#E1E1E1] focus:text-[#E1E1E1]"+ `${inputStyle}` : "bg-white text-gray-700 focus:text-gray-700 focus:bg-white focus:border-blue-600  "+ `${inputStyle}` }
                        id="countrySearh"
                        placeholder="Search for a country" 
                        value={query}
                        onChange={(event) => handleChange(event)}
                        />
                        {/* Search button */}
                        <button onClick={() => setSearchCountries(query)} className={darkmode ?  "bg-[#2d2b49] " + `${btnStyle}` : "bg-darkTeal "+ `${btnStyle}`} type='button'>Search</button>
                    </div>
                </form>
                <div>      
                    {/* log out button */}
                    <Link to="/" onClick={handleClick} ><button type="button" className={darkmode ? "text-white " + `${logoutStyle}`: "text-darkTeal md:text-white" + `${logoutStyle}`} >Log out</button></Link>
                </div> 
            </div>
        </div>
    )
}

export default Header