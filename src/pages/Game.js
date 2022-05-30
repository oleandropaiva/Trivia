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
      oneSecond: 1000,
      timer: 30,
      isDesabled: false,
      timeOut: '',
      interval: '',
    };
  }

  componentDidMount() {
    const { seconds, oneSecond } = this.state;
    const { fetchQuestionsProp } = this.props;
    const getToken = getTokenLocalStorage();
    fetchQuestionsProp(getToken);
    const timeOut = setTimeout(this.timeOut, seconds);
    const interval = setInterval(this.timeCurrent, oneSecond);
    this.setState({
      timeOut,
      interval,
    });
  }

  timeOut = () => {
    const { timer, timeOut } = this.state;
    this.setState({ isDesabled: true });
    if (timer === 0) {
      clearTimeout(timeOut);
    }
  };

  timeCurrent = () => {
    const { timer, interval } = this.state;
    this.setState({ timer: timer - 1 });
    if (timer === 0) {
      clearInterval(interval);
    }
  };

  render() {
    const { resultsQuestions, history } = this.props;
    const { isDesabled, timer } = this.state;

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
          timer={ timer }
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
