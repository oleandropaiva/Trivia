import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import getApiToken from '../services/api';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      email: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const sessionToken = await getApiToken();
    localStorage.setItem('token', sessionToken.token);

    const { history } = this.props;
    history.push('/game');
  }

  render() {
    const { user, email } = this.state;
    return (
      <div>
        <form>
          <input
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
          <input
            type="text"
            name="user"
            value={ user }
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
          <button
            disabled={ email.length === 0 || user.length === 0 }
            type="submit"
            data-testid="btn-play"
            onClick={ this.handleSubmit }
          >
            Play
          </button>
          <Link
            to="/settings"
          >
            <button
              type="button"
              data-testid="btn-settings"
            >
              Settings
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.string,
}.isRequired;

export default Login;
