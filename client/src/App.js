import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Let's Go Gang!!!</p>
        <a
          className="App-link"
          href="demo-covid-api.herokuapp.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          API link...
        </a>
      </header>
    </div>
  );
}

export default App;
