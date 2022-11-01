import React, { useEffect, useState, Suspense, SetStateAction } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'; 
import CountryList from './CountryList'
import Pagination from './Pagination'
import { Country } from '../types'
import { currentUser, searchCountryState } from '../data/countryData';

interface props  {
    filtration: string
}

function PaginatedCountryList({filtration}: props) {
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage] = useState(9)
    const countries = useRecoilValue(searchCountryState)
    const [hasBeen, sethasBeen] =useState<Boolean>(false)
    const [myCountries, setMyCountries] = useState<string[]>([""])
    // console.log("paginated countires", countries)

    

    const totalPages = countries.length / countriesPerPage

    const [showInfo, setshowInfo] = useState<Country | null>()
    // const [showMyCountries, setMyCountries] = useState<Country[]>()

    // removes country info on page change
    useEffect(() => {
        setshowInfo(null)
    }, [currentPage]) 


    // Pagination inpiration from https://blog.logrocket.com/pagination-components-react-tailwind-css/
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstPost = indexOfLastCountry - countriesPerPage;
    const currentCountriesAll = countries.slice(indexOfFirstPost, indexOfLastCountry);
    const currentCountriesMine = myCountries.slice(indexOfFirstPost, indexOfLastCountry);

    return (
        <div>
            <CountryList
                countries={filtration === 'all' ? currentCountriesAll : currentCountriesMine}
                showInfo={showInfo}
                setshowInfo={setshowInfo} 
                setHasBeen = {sethasBeen}
                hasBeen = {hasBeen}
                myCountries = {myCountries}
                setMyCountries = {setMyCountries}
                />
            <Pagination
                countriesPerPage={countriesPerPage}
                totalCountries={countries ? (countries).length : 0}
                paginateForward={setCurrentPage}
                paginateBack={setCurrentPage}
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </div>
    )
}

export default PaginatedCountryList