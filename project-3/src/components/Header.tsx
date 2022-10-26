import React, { useContext } from 'react'
import icon_search from '../icons/icon_search.svg'



function Header() {
    return (
        <div className="head">
            <div className='md:bg-properTeal flex justify-center'>
                <div className="mb-3">
                    <input type="text"
                    className="form-control block h-12 w-72 px-6 md:w-96 py-1.5 text-lg font-normal text-gray-700 bg-white mt-20 md:mt-8 md:mb-6
                        rounded-lg transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="countrySearh"
                    placeholder="Search for a country" />
                </div>
                <div className="">
                    <button type="button" className="inline-block absolute top-3 right-2 md:mt-6 md:mb-6 px-6 py-2.5 bg-transparent text-darkTeal md:text-white font-medium text-s leading-tight rounded 
                        hover:bg-gray-900 hover:bg-opacity-10 focus:outline-none focus:ring-0 active:bg-gray-900 active:bg-opacity-20 
                        transition duration-150 ease-in-out">Log out</button>
                </div>
            </div>
        </div>
    )
}

export default Header