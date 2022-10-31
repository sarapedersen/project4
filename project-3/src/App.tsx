import React, { useEffect } from 'react'
import './App.css'
import PaginatedCountryList from './components/PaginatedCountryList'
import Header from './components/Header'
import MainPage from './components/MainPage'

function App() {

  // async function testFetch() {
  //   console.log("howrhgowrgfo")
  //   const response = await fetch('http://localhost:4000/countries')
  //   console.log(response.json())
  // }

  // testFetch()
  
  

  return (
    <div className='App bg-bgBlue h-full md:bg-[url("./icons/background.svg")] bg-no-repeat bg-cover bg-center bg-fixed'>
      <div className='min-h-screen'>
        <div className=''>
        <React.Suspense fallback={<p>Loading..</p>}>
          <Header/>
          <MainPage/>
        </React.Suspense>
        </div>
      </div>
    </div>
  )
}

export default App
