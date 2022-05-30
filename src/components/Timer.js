import React, { Component } from 'react';

class Timer extends Component {
  /*  constructor() {
    super();
    this.state = {
      seconds: 3000,
    };
  }

  componentDidUpdate() {
    const { seconds } = this.state;
    setTimeout(this.myGreeting, seconds);
  }

  myGreeting = () => {
    console.log('Teste!');
  } */

  render() {
    return (
      <div>
        <button
          type="button"
          // onClick={ this.setTimeout(test(), 3000) }
          // onClick={ () => (() => console.log('Initial timeout!'), 1000) }
        >
          Teste
        </button>
      </div>
    );
  }
}

export default Timer;
