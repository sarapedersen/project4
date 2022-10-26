import React, { useEffect, useState } from 'react'
import PaginatedCountryList from './PaginatedCountryList'

function MainPage() {
    const [filtration, setFiltration] = useState<String>("all")

    return (
        <div className='grid grid-cols-1 grid-auto '>

            {/* Filtration */}
            <div className='justify-self-center cursor-pointer'>
                <div className='flex flex-row mt-10 space-x-10 justify-center'>
                    <p onClick={() => setFiltration("all")} className={filtration === "all" ? 'text-darkerBlue' : 'text-gray-400'}>All countries</p>
                    <p onClick={() => setFiltration("travelled")} className={filtration === "travelled" ? 'text-darkerBlue' : 'text-gray-400'}>My countries</p>
                </div>
                <div className='flex flex-row'>
                    <hr className={filtration === "all" ? 'bg-darkerBlue w-32 border-0 h-0.5' : 'bg-gray-400 w-32 border-0 h-0.5'} />
                    <hr className={filtration === "travelled" ? 'bg-darkerBlue w-32 border-0 h-0.5' : 'bg-gray-400 w-32 border-0 h-0.5'}/>
                </div>
            </div>

            <PaginatedCountryList />

            {/* Sorting */}
            <div className='flex space-x-6 justify-self-center pb-16'>
                <p className='font-bold'>Sort by:</p>
                <form>
                    <select className='rounded-md px-2'>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </select>
                </form>
            </div>
        </div>
    )
}


export default MainPage