import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import CountryList from './CountryList'
import Pagination from './Pagination'
import { Country } from '../types'
import { countriesBeenTo, searchCountryState, searchState } from '../data/countryData'

interface props  {
    filtration: string
}

function PaginatedCountryList({filtration}: props) {
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage] = useState(9)
    const countries = useRecoilValue(searchCountryState)
    const usersCountries = useRecoilValue(countriesBeenTo)    
    const setSearchCountries = useSetRecoilState(searchState)
    const allCountriesPages = (countries.length / countriesPerPage)
    const myCoutriesPages = (usersCountries.length / countriesPerPage)
    const [showInfo, setshowInfo] = useState<Country | null>()

    // removes country info on page change
    useEffect(() => {
        setshowInfo(null)
    }, [currentPage, filtration])
    
    // resets to first page when switching between all countries and my countries
    useEffect(() => {
        setCurrentPage(1)
        setSearchCountries("")
    }, [filtration])




    // Pagination inpiration from https://blog.logrocket.com/pagination-components-react-tailwind-css/
    const indexOfLastCountry = currentPage * countriesPerPage
    const indexOfFirstPost = indexOfLastCountry - countriesPerPage
    const currentCountriesAll = countries.slice(indexOfFirstPost, indexOfLastCountry)
    const currentCountriesMine = usersCountries.slice(indexOfFirstPost, indexOfLastCountry)

    return (
        <div>
            <CountryList
                countries={filtration === 'all' ? currentCountriesAll : currentCountriesMine}
                showInfo={showInfo}
                setshowInfo={setshowInfo}
                />
            <Pagination
                countriesPerPage={countriesPerPage}
                totalCountries={countries ? (countries).length : 0}
                paginateForward={setCurrentPage}
                paginateBack={setCurrentPage}
                currentPage={currentPage}
                totalPages={filtration === 'all' ? allCountriesPages : myCoutriesPages}
            />
        </div>
    )
}

export default PaginatedCountryList