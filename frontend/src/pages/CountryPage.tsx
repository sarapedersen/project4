import { useRecoilState } from 'recoil'
import Header from '../components/Header'
import InfoBox from '../components/InfoBox'
import MainPage from '../components/MainPage'
import { darkMode } from '../data/userData'


function CountryPage() {
    const bgStyle = ' min-h-screen bg-no-repeat bg-cover bg-center bg-fixed'
    const [darkmode, setDarkmode] = useRecoilState(darkMode)

    return (
        <div className={!darkmode ? ' md:bg-[url("./icons/background.svg")] bg-bgBlue ' + `${bgStyle}` : 'md:bg-[url("./icons/background_dark.svg")] bg-bgBlack'+ `${bgStyle}`}>
            <Header/>
            <MainPage/>
            <div className='absolute top-[50%] left-[7%] '>
                <InfoBox/>
            </div>
        </div>
    )
}

export default CountryPage