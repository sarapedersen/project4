import React, { useEffect, useState } from 'react'
import PaginatedCountryList from './PaginatedCountryList'
import { myCountriesState, sortState} from '../data/countryData';
import { currentUser} from '../data/userData';
import { useRecoilState, useRecoilStateLoadable, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { useNavigate } from "react-router-dom"

function MainPage() {
    const navigate = useNavigate()
    const [myCountries, setMyCountries] = useRecoilState(myCountriesState)
    const [sort, setSort] = useRecoilState(sortState)
    const userValue = useRecoilValue(currentUser)

    function handleClick(event: React.ChangeEvent<HTMLSelectElement>) {
        setSort(event.target.value)
    }

    useEffect(() => {
        if (userValue === undefined) {
            console.log(userValue)
            navigate("/")
        }
    })


    return (
        <div tabIndex={0} className='grid grid-cols-1 grid-auto '>

            {/* Filtration */}
            <div className='justify-self-center cursor-pointer'>
                <div className='flex flex-row mt-10 space-x-10 justify-center'>
                    <p onClick={() => setMyCountries(false)} className={myCountries === false ? 'text-darkerBlue' : 'text-gray-400'}>All countries</p>
                    <p onClick={() => setMyCountries(true)} className={myCountries === true ? 'text-darkerBlue' : 'text-gray-400'}>My countries</p>
                </div>
                <div className='flex flex-row'>
                    <hr className={myCountries === false ? 'bg-darkerBlue w-32 border-0 h-0.5' : 'bg-gray-400 w-32 border-0 h-0.5'} />
                    <hr className={myCountries === true ? 'bg-darkerBlue w-32 border-0 h-0.5' : 'bg-gray-400 w-32 border-0 h-0.5'}/>
                </div>
            </div>

            <PaginatedCountryList filtration={myCountries}/>

            {/* Sorting */}
            <div className='flex space-x-6 justify-self-center pb-16'>
                <p className='font-bold'>Sort by:</p>
                <form>
                    <select id="sortbtn" className='rounded-md px-2' onChange={handleClick}>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                </form>
            </div>
        </div>
    )
}


export default MainPage


