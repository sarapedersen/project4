import React, { useState } from 'react'
import CountryList from './CountryList'
import Pagination from './Pagination'
import { Country } from '../types'

function PaginatedCountryList() {
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage] = useState(9)
    const [countries, setcountries] = useState<Country[]>([{ 
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
        languages: ["Swedish"] },
        {
        name: "Sweden", 
        flag: "https://flagcdn.com/se.svg",
        capital: "Stockholm", 
        population: 10481937, 
        continent: "Europe", 
        area: 450295, 
        languages: ["Swedish"] },
        {
        name: "Sweden", 
        flag: "https://flagcdn.com/se.svg",
        capital: "Stockholm", 
        population: 10481937, 
        continent: "Europe", 
        area: 450295, 
        languages: ["Swedish"] },
        {
        name: "Sweden", 
        flag: "https://flagcdn.com/se.svg",
        capital: "Stockholm", 
        population: 10481937, 
        continent: "Europe", 
        area: 450295, 
        languages: ["Swedish"] },
        {
        name: "Sweden", 
        flag: "https://flagcdn.com/se.svg",
        capital: "Stockholm", 
        population: 10481937, 
        continent: "Europe", 
        area: 450295, 
        languages: ["Swedish"] },
        {
        name: "Sweden", 
        flag: "https://flagcdn.com/se.svg",
        capital: "Stockholm", 
        population: 10481937, 
        continent: "Europe", 
        area: 450295, 
        languages: ["Swedish"] },
        {
        name: "Sweden", 
        flag: "https://flagcdn.com/se.svg",
        capital: "Stockholm", 
        population: 10481937, 
        continent: "Europe", 
        area: 450295, 
        languages: ["Swedish"] },
        {
        name: "Sweden", 
        flag: "https://flagcdn.com/se.svg",
        capital: "Stockholm", 
        population: 10481937, 
        continent: "Europe", 
        area: 450295, 
        languages: ["Swedish"] },
        {
        name: "Sweden", 
        flag: "https://flagcdn.com/se.svg",
        capital: "Stockholm", 
        population: 10481937, 
        continent: "Europe", 
        area: 450295, 
        languages: ["Swedish"] },
        {
        name: "Sweden", 
        flag: "https://flagcdn.com/se.svg",
        capital: "Stockholm", 
        population: 10481937, 
        continent: "Europe", 
        area: 450295, 
        languages: ["Swedish"] },
        {
        name: "Sweden", 
        flag: "https://flagcdn.com/se.svg",
        capital: "Stockholm", 
        population: 10481937, 
        continent: "Europe", 
        area: 450295, 
        languages: ["Swedish"] },
        {
        name: "Sweden", 
        flag: "https://flagcdn.com/se.svg",
        capital: "Stockholm", 
        population: 10481937, 
        continent: "Europe", 
        area: 450295, 
        languages: ["Swedish"] },
        {
        name: "Sweden", 
        flag: "https://flagcdn.com/se.svg",
        capital: "Stockholm", 
        population: 10481937, 
        continent: "Europe", 
        area: 450295, 
        languages: ["Swedish"] },
        {
        name: "Sweden", 
        flag: "https://flagcdn.com/se.svg",
        capital: "Stockholm", 
        population: 10481937, 
        continent: "Europe", 
        area: 450295, 
        languages: ["Swedish"] },
        {
        name: "Sweden", 
        flag: "https://flagcdn.com/se.svg",
        capital: "Stockholm", 
        population: 10481937, 
        continent: "Europe", 
        area: 450295, 
        languages: ["Swedish"] },
        {
        name: "Sweden", 
        flag: "https://flagcdn.com/se.svg",
        capital: "Stockholm", 
        population: 10481937, 
        continent: "Europe", 
        area: 450295, 
        languages: ["Swedish"] },
      ])

    // Pagination inpiration from https://blog.logrocket.com/pagination-components-react-tailwind-css/
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstPost = indexOfLastCountry - countriesPerPage;
    const currentCountries = countries.slice(indexOfFirstPost, indexOfLastCountry);
    
    // Change page
    const paginateForward = () => setCurrentPage(currentPage + 1)
    const paginateBack = () => setCurrentPage(currentPage - 1)

    return (
        <div>
            <CountryList countries={currentCountries}/>
            <Pagination
                countriesPerPage={countriesPerPage}
                totalCountries={countries ? (countries).length : 0}
                paginateForward={() => paginateForward()}
                paginateBack={() => paginateBack()}
                currentPage={currentPage}
            />
        </div>
    )
}

export default PaginatedCountryList