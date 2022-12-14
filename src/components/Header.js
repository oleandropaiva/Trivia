import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import '../App.css';

class Header extends Component {
  redirect = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { gravatarEmail, name, score, timerProp } = this.props;
    const hash = md5(gravatarEmail).toString();
    return (
      <div>
        {timerProp > 0
          ? <h1>{`Restam ${timerProp} segundos`}</h1>
          : (
            <div>
              <p>Tempo encerrado</p>
              <button
                type="button"
                onClick={ this.redirect }
              >
                Tentar Novamente

              </button>
            </div>
          )}

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
      </div>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  timerProp: PropTypes.number.isRequired,
  history: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  timerProp: state.settingsReducer.timer,
});

export default connect(mapStateToProps)(Header);
