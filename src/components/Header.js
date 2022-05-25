import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    const hash = md5(gravatarEmail).toString();
    return (
      <div>
        <h1>TESTE</h1>
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
          Placar:
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
};

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
