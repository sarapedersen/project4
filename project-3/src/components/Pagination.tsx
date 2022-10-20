import React from 'react'


interface props {
    countriesPerPage: number
    totalCountries: number
    paginateForward: () => void
    paginateBack: () => void 
    currentPage: number
}
function Pagination(data: props) {
    return (
        <div>
            <nav aria-label='Pagination'>
                <a onClick={data.paginateBack} href='#'>
                    {"< "}{data.currentPage}{" / "}
                </a>
                <a onClick={data.paginateForward} href='#'>
                    {Math.ceil(data.totalCountries/data.countriesPerPage)}{" >"}
                </a>
            </nav>
        </div>
    )
}

export default Pagination