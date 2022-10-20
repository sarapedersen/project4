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
      languages: ["Swedish"] }
    ])
  
  return (
    <div>
      {showInfo ? // If showInfo has a country then show info about the chosen country
      <div>
        <p onClick={() => setshowInfo(null)}>{showInfo?.name}</p>
        <img src={showInfo.flag}></img>
        <p>{showInfo.capital}</p>
        <p>{showInfo.population}</p>
        <p>{showInfo.continent}</p>
        <p>{showInfo.area}</p>
      </div> :  // If showInfo is null, just show the country names in a list
      <ul>
        {Country && Country.map((c, index) => 
          <li key={index} onClick={() => setshowInfo(c)}>{c.name}</li>)}
      </ul>}
    </div>
  )
}

export default CountryList