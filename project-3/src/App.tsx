import React, { useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import CountryPage from './pages/CountryPage'
import LogInPage from './pages/LogInPage'
import RegisterPage from './pages/RegisterPage'


function App() {

  // async function testFetch() {
  //   console.log("howrhgowrgfo")
  //   const response = await fetch('http://localhost:4000/countries')
  //   console.log(response.json())
  // }

  // testFetch()
  
  

  return (
    <div className='App bg-bgBlue h-full '>
      <div className='min-h-screen'>
        <div className=''>
            <Routes>
              <Route path="/" element={<CountryPage/>}/>
              <Route path="/login" element={<LogInPage/>}/>
              <Route path="/register" element={<RegisterPage/>}/>
            </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
