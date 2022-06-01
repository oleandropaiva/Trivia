import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Feedback extends Component {
  componentDidMount() {
    this.saveRankingLocalStorage();
  }

  saveRankingLocalStorage = () => {
    const { name, score } = this.props;

    const rankingInfos = { name, score };
    const getRankind = localStorage.getItem('ranking');
    if (getRankind !== null) {
      const ranking = JSON.parse(getRankind);
      ranking.push(rankingInfos);
      localStorage.setItem('ranking', JSON.stringify(ranking));
    } else {
      localStorage.setItem('ranking', JSON.stringify([rankingInfos]));
    }
  }

  redirectToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { gravatarEmail, name, score, assertions } = this.props;
    const hash = md5(gravatarEmail).toString();
    const NUMBER = 3;
    return (
      <div>
        <header>
          {assertions < NUMBER && <p data-testid="feedback-text">Could be better...</p>}
          {assertions >= NUMBER && <p data-testid="feedback-text">Well Done!</p>}
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

        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.redirectToRanking }
        >
          Ranking
        </button>

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
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
  assertions: PropTypes.number,
  history: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
