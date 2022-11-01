import React, { useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import CountryPage from './pages/CountryPage'
import LogInPage from './pages/LogInPage'
import RegisterPage from './pages/RegisterPage'
import { RecoilRoot } from 'recoil'


function App() {

  return (
      <div className='App bg-bgBlue h-full '>
        <div className='min-h-screen'>
            <React.Suspense fallback={<p>Loading..</p>}>
              <Routes>
                <Route path="/" element={<CountryPage/>}/>
                <Route path="/login" element={<LogInPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
              </Routes>
            </React.Suspense>
        </div>
      </div>
  ) 
}

export default App
