import { useRecoilState } from 'recoil'
import Header from '../components/Header'
import MainPage from '../components/MainPage'
import { darkMode } from '../data/userData'
import darkModeImg from '../icons/darkmode.svg'
import lightModeImg from '../icons/lightmode.svg'


function CountryPage() {
    const bgStyle = 'min-h-screen bg-no-repeat bg-cover bg-center bg-fixed'
    const [darkmode, setDarkmode] = useRecoilState(darkMode)
    
    return (
        <div className={!darkmode ? ' md:bg-[url("./icons/background.svg")] bg-[url("./icons/background_mobile.svg")] ' + `${bgStyle}` : 'md:bg-[url("./icons/background_dark.svg")] bg-[url("./icons/background_dark_mobile.svg")]'+ `${bgStyle}`}>
            <Header/>
            <MainPage/>
        </div>
    )
}

export default CountryPage