import React, { useEffect } from 'react'
import './App.css'
import logo from './logo.svg';
import PaginatedCountryList from './components/PaginatedCountryList'
import CountryList from './components/CountryList';
import Header from './components/Header'
import MainPage from './components/MainPage'
import { RecoilRoot } from 'recoil'
import Register from './components/Register';

function App() {


  return (
    <div className='App bg-bgBlue h-full md:bg-[url("./icons/background.svg")] bg-no-repeat bg-cover bg-center bg-fixed'>
      <div className='min-h-screen'>
        <div>
        <RecoilRoot>
          <React.Suspense fallback={<p>Loading..</p>}>
            <Header/>
            <MainPage/>
          </React.Suspense>
        </RecoilRoot>
        </div>
      </div>
    </div>
  )
}

export default App
