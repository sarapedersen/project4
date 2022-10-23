import React from 'react'
import './App.css'
import PaginatedCountryList from './components/PaginatedCountryList'
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <div className='bg-bgBlue h-screen'>
        <Header/>
        <PaginatedCountryList/>
      </div>
    </div>
    
  );
}

export default App;
