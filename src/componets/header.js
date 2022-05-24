import React, { Component } from 'react';
import logo from '../trivia.png';

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
      </header>
    );
  }
}

export default Header;
