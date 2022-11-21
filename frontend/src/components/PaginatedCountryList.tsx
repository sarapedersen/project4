import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilStateLoadable, useRecoilValueLoadable, } from 'recoil'
import CountryList from './CountryList'
import Pagination from './Pagination'
import { Country, maxElementsOnPage } from '../types'
import { countriesBeenTo, currentPageState, maxPageState, searchCountryState, searchState } from '../data/countryData'

interface props  {
    filtration: boolean
}

function PaginatedCountryList({filtration}: props) {
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState)
    const tempMaxPage = useRecoilValueLoadable(maxPageState)
    const tempCountries = useRecoilValueLoadable(searchCountryState)
    const tempUsersCountries = useRecoilValueLoadable(countriesBeenTo)
    const [searchCountries, setSearchCountries] = useRecoilStateLoadable(searchState)    
    const [showInfo, setshowInfo] = useState<Country | null>()

    const maxPage = tempMaxPage.state === 'hasValue' ? tempMaxPage.contents : 1
    const countries = tempCountries.state === 'hasValue' ? tempCountries.contents : []
    const usersCountries = tempUsersCountries.state === 'hasValue' ? tempUsersCountries.contents : []




    /* Removes country info on page change */
    useEffect(() => {
        setshowInfo(null)
    }, [currentPage, filtration, searchCountries])
    
    /* Resets to first page when switching between all countries and my countries */
    useEffect(() => {
        setCurrentPage(1)
        setSearchCountries("")
    }, [filtration, setSearchCountries])

    useEffect(() => {
        setCurrentPage(1)
    }, [searchCountries])




    // Pagination inpiration from https://blog.logrocket.com/pagination-components-react-tailwind-css/
 
    const currentCountriesAll = countries
    const currentCountriesMine = usersCountries

    return (
        <div>
            <CountryList
                countries={filtration === false ? currentCountriesAll : currentCountriesMine}
                showInfo={showInfo}
                setshowInfo={setshowInfo}
                />
            <Pagination
                countriesPerPage={maxElementsOnPage}
                totalCountries={countries ? (countries).length : 0}
                paginateForward={setCurrentPage}
                paginateBack={setCurrentPage}
                currentPage={currentPage}
                totalPages={maxPage}
            />
        </div>
    )
}

export default PaginatedCountryList