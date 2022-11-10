import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {  useRecoilState, useSetRecoilState } from 'recoil';
import { searchState } from '../data/countryData';
import { userLoginPage, userRegisterPage, updateUserState } from '../data/userData';
import { defaultUser } from '../types';


function Header() {
    const [query, setQuery] = useState("")
    
    const [searchCountries, setSearchCountries] = useRecoilState(searchState)
    const loginUser = useSetRecoilState(userLoginPage);
    const registerUser = useSetRecoilState(userRegisterPage);
    const updateUser = useSetRecoilState(updateUserState);

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
    return (
        <div className="head">
            <div className='md:bg-properTeal flex justify-center'>
                <form onSubmit={() => setSearchCountries(query)}>
                    {/* search bar */}
                    <div className="mb-3 md:max-w-none">
                        <input type="text"
                        autoFocus
                        className="block h-12 w-52 px-6 md:w-96 py-1.5 text-lg font-normal text-gray-700 bg-white mt-20 md:mt-8 md:mb-6
                            rounded-lg transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="countrySearh"
                        placeholder="Search for a country" 
                        value={query}
                        onChange={(event) => handleChange(event)}
                        />
                    </div>
                        {/* Search button */}
                    <button onClick={() => setSearchCountries(query)} className="px-4 h-12 mt-20 md:mt-8 md:mb-6 md:px-8 rounded-lg bg-darkTeal text-white" type='button'>Search</button>
                </form>
                <div>      
                    {/* log out button */}
                    <Link to="/" onClick={handleClick} ><button type="button" className="inline-block absolute top-3 right-2 md:mt-6 md:mb-6 px-6 py-2.5 bg-transparent text-darkTeal md:text-white font-medium text-s leading-tight rounded 
                        hover:bg-gray-900 hover:bg-opacity-10 focus:outline-none focus:ring-0 active:bg-gray-900 active:bg-opacity-20 
                        transition duration-150 ease-in-out">Log out</button></Link>
                </div> 
            </div>
        </div>
    )
}

export default Header