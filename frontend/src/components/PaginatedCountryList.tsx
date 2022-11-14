import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import CountryList from './CountryList'
import Pagination from './Pagination'
import { Country, maxElementsOnPage } from '../types'
import { countriesBeenTo, currentPageState, maxPageState, searchCountryState } from '../data/countryData'

interface props  {
    filtration: boolean
}

function PaginatedCountryList({filtration}: props) {
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState)
    const maxPage = useRecoilValue(maxPageState)

    const countries = useRecoilValue(searchCountryState)
    const usersCountries = useRecoilValue(countriesBeenTo)
    console.log("user countries in paginated country list: ", usersCountries)    
    const [showInfo, setshowInfo] = useState<Country | null>()

    // removes country info on page change
    useEffect(() => {
        setshowInfo(null)
    }, [currentPage, filtration])
    
    // resets to first page when switching between all countries and my countries
    useEffect(() => {
        setCurrentPage(1)
    }, [filtration])


    // Pagination inpiration from https://blog.logrocket.com/pagination-components-react-tailwind-css/
    const indexOfLastCountry = currentPage * maxElementsOnPage
    const indexOfFirstPost = indexOfLastCountry - maxElementsOnPage
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