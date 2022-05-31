import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Feedback extends Component {
  render() {
    const { gravatarEmail, name, score, assertions } = this.props;
    const hash = md5(gravatarEmail).toString();
    const NUMBER = 3;
    return (
      <div>
        <header>
          {
            assertions < NUMBER && <p data-testid="feedback-text">Could be better...</p>
          }
          { assertions >= NUMBER && <p data-testid="feedback-text">Well Done!</p> }
          <img
            data-testid="header-profile-picture"
            alt="gravatar"
            src={ `https://www.gravatar.com/avatar/${hash}` }
          />
          <p
            data-testid="header-player-name"
          >
            { name }
          </p>
          <p
            data-testid="header-score"
          >
            { score }
          </p>
        </header>
        <h1 data-testid="feedback-text">Feedback</h1>
        <h2 data-testid="feedback-total-score">{ score }</h2>
        <h2 data-testid="feedback-total-question">{ assertions }</h2>
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

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
