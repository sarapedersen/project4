import React, { useEffect } from 'react'
import './App.css'
import PaginatedCountryList from './components/PaginatedCountryList'
import Header from './components/Header'

function App() {

  
  

  return (
    <div className='App bg-bgBlue h-full md:bg-[url("./icons/background.svg")] bg-no-repeat bg-cover bg-center bg-fixed'>
      <div className='min-h-screen'>
        <div className=''>
          <Header/>
          <PaginatedCountryList/>
        </div>
      </div>
    </div>
  )
}

export default App
