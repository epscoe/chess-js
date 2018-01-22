import React, { Component } from 'react';
import logo from './logo.svg';
import { Chess } from './chess/Chess';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Chess</h1>
        </header>
        <Chess />
      </div>
    );
  }
}

export default App;
