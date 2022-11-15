import React, { useEffect, useState } from 'react'
import PaginatedCountryList from './PaginatedCountryList'
import { sortState} from '../data/countryData';
import { currentUser} from '../data/userData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from "react-router-dom"
import { darkMode } from "../data/userData";

function MainPage() {
    const navigate = useNavigate()
    const [filtration, setFiltration] = useState<string>("all")
    const [sort, setSort] = useRecoilState(sortState)
    const userValue = useRecoilValue(currentUser)
    const [darkmode, setDarkmode] = useRecoilState(darkMode);
    const lineStyle = ' w-32 border-0 h-0.5'
   
    function handleClick(event: React.ChangeEvent<HTMLSelectElement>) {
        setSort(event.target.value)
    }

    useEffect(() => {
        if (userValue.id === "") {
            console.log(userValue)
            navigate("/")
        }
    })


    return (
        <div tabIndex={0} className='grid grid-cols-1 grid-auto '>

            {/* Filtration */}
            <div className='justify-self-center cursor-pointer'>
                <div className='flex flex-row mt-10 space-x-10 justify-center'>
                    <p onClick={() => setFiltration("all")} className={filtration === "all" ? (darkmode ? 'text-white ' : 'text-darkTeal font-bold') : (darkmode ? 'text-purple' : 'text-gray-400 font-bold')}>All countries</p>
                    <p onClick={() => setFiltration("travelled")} className={filtration === "travelled" ? (darkmode ? 'text-white' : 'text-darkTeal font-bold') : (darkmode ? 'text-purple' : 'text-gray-400 font-bold')}>My countries</p>
                </div>
                <div className='flex flex-row'>
                    <hr className={filtration === "all" ? (darkmode ? 'bg-white'+`${lineStyle }` : 'bg-darkTeal'+`${lineStyle }`) : (darkmode ? 'bg-bgBlack'+`${lineStyle }` : 'bg-bgBlue'+`${lineStyle }`)} />
                    <hr className={filtration === "travelled" ? (darkmode ? 'bg-white'+`${lineStyle }` : 'bg-darkTeal'+`${lineStyle }`) : (darkmode ? 'bg-bgBlack'+`${lineStyle }` : 'bg-bgBlue'+`${lineStyle }`)}/>
                </div>
            </div>

            <PaginatedCountryList filtration={filtration}/>

            {/* Sorting */}
            <div className='flex space-x-6 justify-self-center pb-16'>
                <p className={darkmode ? ' text-white font-bold' : 'font-bold'}>Sort by:</p>
                <form>
                    <select id="sortbtn" className={darkmode ? 'rounded-md px-2 bg-grey text-white' : 'rounded-md px-2'} onChange={handleClick}>
                        <option value="asc">A-Å</option>
                        <option value="desc">Å-A</option>
                    </select>
                </form>
            </div>
        </div>
    )
}


export default MainPage


