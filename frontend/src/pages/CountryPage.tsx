import Header from '../components/Header'
import MainPage from '../components/MainPage'

function CountryPage() {
    return (
        <div className='min-h-screen md:bg-[url("./icons/background.svg")] bg-no-repeat bg-cover bg-center bg-fixed'>
            <Header/>
            <MainPage/>
        </div>
    )
}

export default CountryPage