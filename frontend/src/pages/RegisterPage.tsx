import Register from '../components/Register';
import { useRecoilState } from 'recoil'
import { darkMode } from '../data/userData'
import darkModeImg from '../icons/darkmode.svg'
import lightModeImg from '../icons/lightmode.svg'

/* Register page to register a new user */
function RegisterPage() {
    const bgStyle = ' h-screen bg-no-repeat bg-cover bg-center bg-fixed'
    const [darkmode, setDarkmode] = useRecoilState(darkMode)

    return (
        <div className={!darkmode ? 'md:bg-[url("./icons/background.svg")] bg-[url("./icons/background_mobile.svg")]' + `${bgStyle}` : 'md:bg-[url("./icons/background_dark.svg")] bg-[url("./icons/background_dark_mobile.svg")]'+ `${bgStyle}`}>
            <img src={darkmode ? darkModeImg : lightModeImg} onClick={() => setDarkmode(!darkmode)} alt="darkmode button" className="p-6 w-[150px]"/>
            <Register/>
        </div>
    )
}

export default RegisterPage