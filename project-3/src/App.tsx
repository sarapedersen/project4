import React from 'react';
import logo from './logo.svg';
import './App.css';
import CountryList from './components/CountryList';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
        <CountryList/>
        <Register/>
    </div>
  );
}

export default App;
