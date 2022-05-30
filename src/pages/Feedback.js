import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Feedback extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
