import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendEmailForm, sendUserForm, getApiToken } from '../redux/actions/index';
import { addTokenLocalStorage } from '../services/localStorage';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      email: '',
    };
  }

  componentDidMount() {
    const { getApiTokenProp } = this.props;
    getApiTokenProp(); // Primeira chamada => undefined
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      getApiTokenProp,
      getTokenProp,
      sendEmailFormProp,
      sendUserFormProp,
      history,
    } = this.props;
    const { email, user } = this.state;

    await getApiTokenProp(); // Segunda chamada => retorna valor

    addTokenLocalStorage(getTokenProp.token);

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

Login.propTypes = {
  history: propTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  getTokenProp: state.gameReducer.categories,
});

const mapDispatchToProps = (dispatch) => ({
  sendEmailFormProp: (emailForm) => dispatch(sendEmailForm(emailForm)),
  sendUserFormProp: (userForm) => dispatch(sendUserForm(userForm)),
  getApiTokenProp: () => dispatch(getApiToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
