import React from 'react'
import arrow_left from '../icons/arrow_left.svg'
import arrow_right from '../icons/arrow_right.svg'

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
                <div className='flex justify-center'>
                    <div className='grid grid-cols-3 place-items-center pb-10 w-60'>
                        <a onClick={handleBackwardClick} href='#/countries'>
                            <img id="leftArrow" src={arrow_left} alt='<' className="w-3 hover:cursor-pointer"/>
                        </a>
                        <div className='font-extralight text-lg'>
                            {data.currentPage}{" / "}
                            {Math.ceil(data.totalCountries/data.countriesPerPage)}
                        </div>
                        <a onClick={handleForwardClick} href='#/countries'>
                            <img id="rightArrow" src={arrow_right} alt='>' className="w-3 hover:cursor-pointer"/>
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Pagination