import React, { useEffect, useState, Suspense } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'; 
import CountryList from './CountryList'
import Pagination from './Pagination'
import { Country } from '../types'
import { searchCountryState } from '../data/countryData';

function PaginatedCountryList() {
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage] = useState(9)
    const countries = useRecoilValue(searchCountryState)
    
    //     name: "Norway",
    //     flagSvg: "https://flagcdn.com/no.svg",
    //     flagPng: "https://flagcdn.com/no.svg", 
    //     capital: "Oslo",
    //     population: 5425270,
    //     region: "Europe",
    //     area: 385207,
    //     languages: ["Norwegian"]
    // },
    // {
    //     name: "Afghanistan",
    //     flag: "https://flagcdn.com/se.svg",
    //     capital: "Stockholm",
    //     population: 10481937,
    //     continent: "Europe",
    //     area: 450295,
    //     languages: ["Swedish"]
    // },
    // {
    //     name: "Oman",
    //     flag: "https://flagcdn.com/se.svg",
    //     capital: "Stockholm",
    //     population: 10481937,
    //     continent: "Europe",
    //     area: 450295,
    //     languages: ["Swedish"]
    // },
    // {
    //     name: "Sweden",
    //     flag: "https://flagcdn.com/se.svg",
    //     capital: "Stockholm",
    //     population: 10481937,
    //     continent: "Europe",
    //     area: 450295,
    //     languages: ["Swedish"]
    // },
    // {
    //     name: "Sweden",
    //     flag: "https://flagcdn.com/se.svg",
    //     capital: "Stockholm",
    //     population: 10481937,
    //     continent: "Europe",
    //     area: 450295,
    //     languages: ["Swedish"]
    // },
    // {
    //     name: "Sweden",
    //     flag: "https://flagcdn.com/se.svg",
    //     capital: "Stockholm",
    //     population: 10481937,
    //     continent: "Europe",
    //     area: 450295,
    //     languages: ["Swedish"]
    // },
    // {
    //     name: "Sweden",
    //     flag: "https://flagcdn.com/se.svg",
    //     capital: "Stockholm",
    //     population: 10481937,
    //     continent: "Europe",
    //     area: 450295,
    //     languages: ["Swedish"]
    // },
    // {
    //     name: "Sweden",
    //     flag: "https://flagcdn.com/se.svg",
    //     capital: "Stockholm",
    //     population: 10481937,
    //     continent: "Europe",
    //     area: 450295,
    //     languages: ["Swedish"]
    // },
    // {
    //     name: "Sweden",
    //     flag: "https://flagcdn.com/se.svg",
    //     capital: "Stockholm",
    //     population: 10481937,
    //     continent: "Europe",
    //     area: 450295,
    //     languages: ["Swedish"]
    // },
    // {
    //     name: "Sweden",
    //     flag: "https://flagcdn.com/se.svg",
    //     capital: "Stockholm",
    //     population: 10481937,
    //     continent: "Europe",
    //     area: 450295,
    //     languages: ["Swedish"]
    // },
    // {
    //     name: "Sweden",
    //     flag: "https://flagcdn.com/se.svg",
    //     capital: "Stockholm",
    //     population: 10481937,
    //     continent: "Europe",
    //     area: 450295,
    //     languages: ["Swedish"]
    // },
    // {
    //     name: "Sweden",
    //     flag: "https://flagcdn.com/se.svg",
    //     capital: "Stockholm",
    //     population: 10481937,
    //     continent: "Europe",
    //     area: 450295,
    //     languages: ["Swedish"]
    // },
    // {
    //     name: "Sweden",
    //     flag: "https://flagcdn.com/se.svg",
    //     capital: "Stockholm",
    //     population: 10481937,
    //     continent: "Europe",
    //     area: 450295,
    //     languages: ["Swedish"]
    // },
    // {
    //     name: "Sweden",
    //     flag: "https://flagcdn.com/se.svg",
    //     capital: "Stockholm",
    //     population: 10481937,
    //     continent: "Europe",
    //     area: 450295,
    //     languages: ["Swedish"]
    // },
    // {
    //     name: "Sweden",
    //     flag: "https://flagcdn.com/se.svg",
    //     capital: "Stockholm",
    //     population: 10481937,
    //     continent: "Europe",
    //     area: 450295,
    //     languages: ["Swedish"]
    // },
    // {
    //     name: "Sweden",
    //     flag: "https://flagcdn.com/se.svg",
    //     capital: "Stockholm",
    //     population: 10481937,
    //     continent: "Europe",
    //     area: 450295,
    //     languages: ["Swedish"]
    // },
    // {
    //     name: "Sweden",
    //     flag: "https://flagcdn.com/se.svg",
    //     capital: "Stockholm",
    //     population: 10481937,
    //     continent: "Europe",
    //     area: 450295,
    //     languages: ["Swedish"]
    // },
    // ])
    const totalPages = countries.length / countriesPerPage

    const [showInfo, setshowInfo] = useState<Country | null>()

    // removes country info on page change
    useEffect(() => {
        setshowInfo(null)
    }, [currentPage]) 




    
    
    


    // Pagination inpiration from https://blog.logrocket.com/pagination-components-react-tailwind-css/
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstPost = indexOfLastCountry - countriesPerPage;
    const currentCountries = countries.slice(indexOfFirstPost, indexOfLastCountry);

    return (
        <div>
            <CountryList
                countries={currentCountries}
                showInfo={showInfo}
                setshowInfo={setshowInfo}
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