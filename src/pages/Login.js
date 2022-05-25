import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendEmailForm, sendUserForm, getApiToken } from '../redux/actions/index';

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

    const { history, sendEmailFormProp, sendUserFormProp } = this.props;
    const { email, user } = this.state;
    sendEmailFormProp(email);
    sendUserFormProp(user);
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
            placeholder="Insira seu email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
          <input
            type="text"
            name="user"
            placeholder="Insira seu nome"
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

const mapDispatchToProps = (dispatch) => ({
  sendEmailFormProp: (emailForm) => dispatch(sendEmailForm(emailForm)),
  sendUserFormProp: (userForm) => dispatch(sendUserForm(userForm)),
});

Login.propTypes = {
  history: propTypes.string,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
