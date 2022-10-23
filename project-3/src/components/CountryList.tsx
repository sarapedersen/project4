import React, { useState } from 'react'

type Country = {
    name: string,
    flag: string,
    capital: string,
    population: number,
    continent: string, 
    area: number, 
    languages: string[]
}

function CountryList() {
    const [showInfo, setshowInfo] = useState<Country | null>()
    const [Country, setCountry] = useState<Country[]>([{ 
      name: "Norway", 
      flag: "https://flagcdn.com/no.svg",
      capital: "Oslo", 
      population: 5425270, 
      continent: "Europe", 
      area: 385207, 
      languages: ["Norwegian"] },
      {
      name: "Sweden", 
      flag: "https://flagcdn.com/se.svg",
      capital: "Stockholm", 
      population: 10481937, 
      continent: "Europe", 
      area: 450295, 
      languages: ["Swedish", "Norwegian"] }
    ])
  
  return (
    <div className='body'>
      <div className="flex justify-center">
        {showInfo ? // If showInfo has a country then show info about the chosen country
        <div className="bg-white rounded-lg  w-96 text-gray-900 w-72">
          <p onClick={() => setshowInfo(null)} className="px-6 py-2 w-full border-b border-bgBlue">{showInfo?.name}</p>
          <img src={showInfo.flag} className="px-6 py-2 w-full"></img>
          <div className="grid grid-rows-5 gap-1">
            <div className='grid grid-cols-2'>
              <p className="px-6 py-2 text-left">Capital:</p>
              <p className="px-6 py-2 text-right">{showInfo.capital}</p>
            </div>
            <div className='grid grid-cols-2'>
              <p className="px-6 py-2 text-left">Population:</p>
              <p className="px-6 py-2 text-right">{showInfo.population}</p>
            </div>
            <div className='grid grid-cols-2'>
              <p className="px-6 py-2 text-left">Continent:</p>
              <p className="px-6 py-2 text-right">{showInfo.continent}</p>
            </div>
            <div className='grid grid-cols-2'>
              <p className="px-6 py-2 text-left">Area:</p>
              <p className="px-6 py-2 text-right">{showInfo.area}</p>
            </div>
            <div>
              <p className="px-6 py-2 w-full">Languages: {showInfo.languages.map(lan => <p>{lan}</p>)}</p>
            </div>
          </div>
        </div> :  // If showInfo is null, just show the country names in a list
        <div>
          <ul className="bg-white rounded-lg  w-96 text-gray-900 divide-y divide-bgBlue w-72">
            {Country && Country.map((c, index) => 
              <li key={index} onClick={() => setshowInfo(c)}
              className="px-6 py-2 w-full rounded-b-lg">{c.name}</li>)}
          </ul>
        </div>}
      </div>
    </div>


  )
}

export default CountryList