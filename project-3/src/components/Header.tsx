import React, { useContext } from 'react'



function Header() {

    return (
        <div className="head">
            <div className="absolute top-3 right-0">
                <button type="button" className="inline-block px-6 py-2.5 bg-transparent text-darkTeal font-medium text-s leading-tight rounded hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out">Log out</button>
            </div>
            <div className="flex justify-center">
                <div className="mb-3 xl:w-96">
                    <input
                    type="text"
                    className="form-control block h-12 w-72 px-3 py-1.5 text-base font-normal text-gray-700 bg-white mt-20
                        rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="countrySearh"
                    placeholder="Search for a country" 
                    />
                </div>
            </div>
        </div>
    )
}

export default Header