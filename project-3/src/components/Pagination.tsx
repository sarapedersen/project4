import React from 'react'


interface props {
    countriesPerPage: number
    totalCountries: number
    paginateForward: (currentPage: number) => void
    paginateBack: (currentPage: number) => void 
    currentPage: number
    totalPages: number
}


function Pagination(data: props) {

    const handleForwardClick = () => data.currentPage<=data.totalPages ? data.paginateBack(data.currentPage + 1) : data.paginateBack(data.currentPage)
    const handleBackwardClick = () => data.currentPage>=2 ? data.paginateBack(data.currentPage - 1) : data.paginateBack(data.currentPage)

    return (
        <div>
            <nav aria-label='Pagination'>
                <a onClick={handleBackwardClick} href='#'>
                    {"< "}{data.currentPage}{" / "}
                </a>
                <a onClick={handleForwardClick} href='#'>
                    {Math.ceil(data.totalCountries/data.countriesPerPage)}{" >"}
                </a>
            </nav>
        </div>
    )
}

export default Pagination