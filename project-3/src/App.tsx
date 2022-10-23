import React from 'react';
import logo from './logo.svg';
import './App.css';
import CountryList from './components/CountryList';
import Header from './components/Header'

function App() {
  return (
    <div className='App'>
      <div className='bg-bgBlue h-screen'>
            <Header/>
            <CountryList/>
      </div>
    </div>
    
  );
}

export default App;
