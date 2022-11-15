import arrow_left from '../icons/arrow_left.svg'
import arrow_right from '../icons/arrow_right.svg'
import arrow_left_white from '../icons/arrow_left_white.svg'
import arrow_right_white from '../icons/arrow_right_white.svg'
import { useRecoilState } from "recoil";
import { darkMode } from "../data/userData";

interface props {
    countriesPerPage: number
    totalCountries: number
    paginateForward: (currentPage: number) => void
    paginateBack: (currentPage: number) => void 
    currentPage: number
    totalPages: number
}


function Pagination({countriesPerPage, totalCountries, paginateForward, paginateBack, currentPage, totalPages}: props) {

    const handleForwardClick = () => currentPage<=totalPages ? paginateBack(currentPage + 1) : paginateBack(currentPage)
    const handleBackwardClick = () => currentPage>=2 ? paginateBack(currentPage - 1) : paginateBack(currentPage)
    const [darkmode, setDarkmode] = useRecoilState(darkMode);

    return (
        <div>
            <nav aria-label='Pagination'>
                {/* Left and right arrows to paginate thorugh pages, and number of pages */}
                <div className='flex justify-center'>
                    <div className='grid grid-cols-3 place-items-center pb-10 w-60'>
                        <a onClick={handleBackwardClick} href='#/countries'>
                            <img id="leftArrow" src={darkmode ? arrow_left_white : arrow_left} alt='arrow left' className="w-3 hover:cursor-pointer"/>
                        </a>
                        <div className={darkmode ? 'font-extralight text-lg text-white' : 'font-extralight text-lg text-black'}>
                            {currentPage}{" / "}
                            {Math.ceil(totalPages)}
                        </div>
                        <a onClick={handleForwardClick} href='#/countries'>
                            <img id="rightArrow" src={darkmode ? arrow_right_white : arrow_right} alt='arrow right' className="w-3 hover:cursor-pointer"/>
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Pagination