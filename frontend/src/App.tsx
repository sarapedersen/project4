import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import CountryPage from './pages/CountryPage'
import LogInPage from './pages/LogInPage'
import RegisterPage from './pages/RegisterPage'


function App() {

  return (
      <div className='App bg-bgBlack h-full '>
        <div className='min-h-screen'>
            <React.Suspense fallback={<p>Loading..</p>}>
              <Routes>
                <Route path="/" element={<LogInPage/>}/>
                <Route path="/countries" element={<CountryPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
              </Routes>
            </React.Suspense>
        </div>
      </div>
  )
}

export default App
