import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Discover Movie App.
        </p>
        <a
          className="App-link"
          href="/discovers"
          rel="noopener noreferrer"
        >
          Discover Movies
        </a>
      </header>
    </div>
  );
}

export default App;
