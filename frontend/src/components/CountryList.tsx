import React, { useEffect } from "react";
import { Country, defaultUser, User } from "../types";
import earth_pale from "../icons/earth_pale.svg";
import earth from "../icons/earth.svg";
import dark_earth_unchecked from "../icons/dark_earth_unchecked.svg";
import dark_earth_checked from "../icons/dark_earth_checked.svg";
import arrow_down from "../icons/arrow_down.svg";
import arrow_up from "../icons/arrow_up.svg";
import arrow_down_white from "../icons/arrow_down_white.svg";
import arrow_up_white from "../icons/arrow_up_white.svg";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { currentUser, darkMode, updateUserState } from "../data/userData";

interface props {
  countries: Country[];
  showInfo: Country | null | undefined;
  setshowInfo: React.Dispatch<React.SetStateAction<Country | null | undefined>>;
}
let myCountri: string[] = [];

function CountryList({
  countries,
  showInfo,
  setshowInfo,
}: props) {

  const tempCurrent = useRecoilValueLoadable(currentUser)
  const update = useSetRecoilState(updateUserState)
  const [darkmode, setDarkmode] = useRecoilState(darkMode);
  
  const current = tempCurrent.state === 'hasValue' ? tempCurrent.contents : defaultUser


  if (current === undefined) {
    myCountri = []
  } else {
    myCountri = [...current.beenTo]
  }

  function handleClick(c: Country) {
    
    const index = myCountri.indexOf(c.id);
    if (index === -1) {
      myCountri.push(c.id);
    } else {
      myCountri.splice(index, 1);
    }
    let tempList = myCountri
    if (current !== undefined) {
      let upUser: User = {
        username: current.username,
        id: current.id,
        password: current.password,
        beenTo: tempList
      }
      update(upUser)
    }
  }
  return (
    <div className="body">
      <div className="flex justify-center mt-10 mb-10">
        {showInfo ? ( // If showInfo has a country then show info about the chosen country 
          <div className={darkmode ? "bg-grey rounded-lg  w-72 text-white md:w-2/4":"bg-white rounded-lg  w-72 text-gray-900 md:w-2/4"}>
            <div className={darkmode ? "px-6 py-3 grid grid-cols-5  w-full border-b border-[#27272F] place-items-center":"px-6 py-3 grid grid-cols-5  w-full border-b border-bgBlue place-items-center"} >
              <img
                onClick={() => handleClick(showInfo)}
                src={myCountri.includes(showInfo.id) ? (darkmode ? dark_earth_checked : earth) : (darkmode ? dark_earth_unchecked : earth_pale)}
                alt="earth"
                className="mx-3 w-7 hover:cursor-pointer"
              />
              <p
                onClick={() => setshowInfo(null)}
                className="text-lg col-span-3 hover:cursor-pointer"
              >
                {showInfo?.name}
              </p>
              <img
                onClick={() => setshowInfo(null)}
                src={darkmode ? arrow_up_white : arrow_up}
                alt="/\"
                className="mx-3 my-2 w-6 hover:cursor-pointer"
              />
            </div>
            <div className="grid grid-cols-1 place-items-center">
              <img
                src={showInfo.flags_svg}
                alt="flag"
                className="my-6 w-40 shadow-lg"
              ></img>
            </div>
            <div className="grid grid-rows-4 grid-col-2 mb-10 mx-6 md:mx-24">
              <p className="py-2 text-left font-bold col-start-1">Capital:</p>
              <p className="py-2 text-right col-start-2">{showInfo.capital === null ? "no data" : showInfo.capital}</p>

              <p className="py-2 text-left font-bold col-start-1">
                Population:
              </p>
              <p className="py-2 text-right col-start-2">
                {showInfo.population
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              </p>

              <p className="py-2 text-left font-bold col-start-1">Continent:</p>
              <p className="py-2 text-right col-start-2">{showInfo.region}</p>

              <p className="py-2 text-left font-bold col-start-1">Area:</p>

              <p className="py-2 text-right col-start-2">
                {showInfo.area === null ? "no data" : showInfo.area?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " km²"}
              </p>
            </div>
          </div> // If showInfo is null, just show the country names in a list
        ) : (
          <div className={darkmode ? "bg-grey rounded-lg  w-72 text-white md:w-2/4":"bg-white rounded-lg  w-72 text-gray-900 md:w-2/4"}>
            <ul className={darkmode ? "text-white divide-y divide-[#27272F] w-full": "text-gray-900 divide-y divide-bgBlue w-full"}>
              {/* Maps through all countries and displays country name, expand arrow and check box  */}
              {countries &&
                countries.map((c, index) => (
                  <li
                    key={index}
                    className="px-6 py-3 rounded-b-lg grid grid-cols-5 place-items-center"
                  >
                    <img
                      onClick={() => handleClick(c)}
                      src={myCountri.includes(c.id) ? (darkmode ? dark_earth_checked : earth) : (darkmode ? dark_earth_unchecked : earth_pale)}
                      alt="earth"
                      className="mx-3 w-7 hover:cursor-pointer"
                    />
                    <p
                      onClick={() => setshowInfo(c)}
                      className="text-center text-lg col-span-3 hover:cursor-pointer"
                    >
                      {c.name}
                    </p>
                    <img
                      id="arrow"
                      src={darkmode ? arrow_down_white : arrow_down}
                      alt="\/"
                      onClick={() => setshowInfo(c)}
                      className="mx-3 my-2 w-6 hover:cursor-pointer"
                    />
                  </li>
                ))}
            </ul>
            {/* Show message if no countries matches search or filter */}
            {countries.length<1 && <p className="text-center">No results</p>}
          </div>
        )}
      </div>
    </div>
  );
}
export default CountryList;
