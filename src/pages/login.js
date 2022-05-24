import React from 'react';

class Login extends React.Component {
  state = {
    user: '',
    email: '',
  }

  handleChange = ({ target }) => {
    console.log(target.value);
    this.setState({
      [target.name]: target.value,
    });
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
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}
export default Login;
