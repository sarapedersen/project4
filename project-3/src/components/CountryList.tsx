import React, { useState } from 'react'
import { Country } from '../types'
import earth_pale from '../icons/earth_pale.svg'
import arrow_down from '../icons/arrow_down.svg'
import arrow_up from '../icons/arrow_up.svg'


interface props {
  countries: Country[]
  showInfo: Country | null | undefined
  setshowInfo: React.Dispatch<React.SetStateAction<Country | null | undefined>>
}



function CountryList({countries, showInfo, setshowInfo}: props) {
  return (
    <div className='body'>
      <div className="flex justify-center mt-10 mb-10">
        {showInfo ? // If showInfo has a country then show info about the chosen country
        <div className="bg-white rounded-lg  w-72 text-gray-900 md:w-2/4">
          <div className='px-6 py-3 grid grid-cols-5  w-full border-b border-bgBlue place-items-center'>
            <img src={earth_pale} alt='earth' className="mx-3 w-7"/>
            <p onClick={() => setshowInfo(null)} className="text-lg col-span-3 hover:cursor-pointer">{showInfo?.name}</p>
            <img onClick={() => setshowInfo(null)} src={arrow_up} alt='/\' className="mx-3 my-2 w-6 hover:cursor-pointer"/>
          </div>
          <div className='grid grid-cols-1 place-items-center'>
            <img src={showInfo.flagSvg} alt="flag" className="my-6 w-40 "></img>
          </div>
          <div className="grid grid-rows-4 grid-col-2 mb-10 mx-6 md:mx-24"> 
            <p className="py-2 text-left font-bold col-start-1">Capital:</p>
            <p id="capital" className='py-2 text-right col-start-2'>{showInfo.capital}</p>
            
              <p className="py-2 text-left font-bold col-start-1">Population:</p>
              <p className='py-2 text-right col-start-2'>{showInfo.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</p>
            
            
              <p className="py-2 text-left font-bold col-start-1">Continent:</p>
              <p className='py-2 text-right col-start-2'>{showInfo.region}</p>
            
            
              <p className="py-2 text-left font-bold col-start-1">Area:</p>
              <p className='py-2 text-right col-start-2'>{showInfo.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} km²</p>
            
          </div>
        </div> :  // If showInfo is null, just show the country names in a list
        <div className='bg-white rounded-lg  w-72 text-gray-900 md:w-2/4'>
          <ul id="countries" className="text-gray-900 divide-y divide-bgBlue w-full">
            {countries && countries.map((c, index) => 
              <li key={index} className="px-6 py-3 rounded-b-lg grid grid-cols-5 place-items-center">
                <img src={earth_pale} alt='earth' className="mx-3 w-7"/>
                <p onClick={() => setshowInfo(c)} className='text-center text-lg col-span-3 hover:cursor-pointer'>{c.name}</p>
                <img src={arrow_down} alt='\/' onClick={() => setshowInfo(c)} className="mx-3 my-2 w-6 hover:cursor-pointer"/>
              </li>)}
          </ul>
        </div>}
      </div>
    </div>
  )
}

export default CountryList