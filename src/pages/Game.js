import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Trivia from '../components/Trivia';
import { fetchQuestion } from '../redux/actions';
import { getTokenLocalStorage, resetLocalStorage } from '../services/localStorage';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30000,
      isDesabled: false,
    };
  }

  componentDidMount() {
    const { seconds } = this.state;
    const { fetchQuestionsProp } = this.props;
    const getToken = getTokenLocalStorage();
    fetchQuestionsProp(getToken);
    setTimeout(this.myGreeting, seconds);
  }

  myGreeting = () => {
    this.setState({ isDesabled: true });
  };

  render() {
    const { resultsQuestions, history } = this.props;
    const { isDesabled } = this.state;

    const RESPONSE_CODE_NUMBER = 3;
    if (resultsQuestions.response_code === RESPONSE_CODE_NUMBER) {
      resetLocalStorage();
      history.push('/');
    }

    return (
      <div>
        <Header />
        <Trivia
          history={ history }
          isDesabled={ isDesabled }
        />
      </div>
    );
  }
}

Game.propTypes = {
  fetchQuestionsProp: propTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsProp: (token) => dispatch(fetchQuestion(token)),
});

const mapStateToProps = (state) => ({
  resultsQuestions: state.gameReducer.resultsQuestions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
