import React, { Component } from 'react';
import logo from '../trivia.png';

class TempHeader extends Component {
  render() {
    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
      </header>
    );
  }
}

export default TempHeader;
