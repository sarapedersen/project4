import React, { useState } from 'react'
import { Country } from '../types'


function CountryList(props: {countries: Country[]}) {
   
    const [showInfo, setshowInfo] = useState<Country | null>()
  
  return (
    <div>
      {showInfo ? // If showInfo has a country then show info about the chosen country
      <div>
        <p onClick={() => setshowInfo(null)}>{showInfo?.name}</p>
        <img src={showInfo.flag} alt="flag"></img>
        <p>{showInfo.capital}</p>
        <p>{showInfo.population}</p>
        <p>{showInfo.continent}</p>
        <p>{showInfo.area}</p>
      </div> :  // If showInfo is null, just show the country names in a list
      <ul>
        {props.countries && props.countries.map((c, index) => 
          <li key={index} onClick={() => setshowInfo(c)}>{c.name}</li>)}
      </ul>}
    </div>
  )
}

export default CountryList