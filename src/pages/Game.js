import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Trivia from '../components/Trivia';
import { fetchQuestion } from '../redux/actions/actionThunk';
import { timeOutAction, setTimer } from '../redux/actions';
import { getTokenLocalStorage, resetLocalStorage } from '../services/localStorage';
import { TIME_OUT_SECONDS } from '../data/magicNumbers';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 0,
      oneSecond: 1000,
      isDesabled: false,
      timeOut: '',
      interval: '',
    };
  }

  componentDidMount() {
    const { seconds, oneSecond } = this.state;
    const { fetchQuestionsProp, timer, setTimerProp } = this.props;
    setTimerProp(TIME_OUT_SECONDS);
    console.log('timerProp', timer);
    const getToken = getTokenLocalStorage();
    fetchQuestionsProp(getToken);
    const settTimeOut = setTimeout(this.timeOut, seconds);
    const settInterval = setInterval(this.timeCurrent, oneSecond);
    this.setState({
      seconds: timer * oneSecond,
      timeOut: settTimeOut,
      interval: settInterval,
    });
  }

  componentWillUnmount() {
    const { interval } = this.state;
    clearInterval(interval);
  }

  timeOut = () => {
    const { timeOut } = this.state;
    const { timerProp } = this.props;
    console.log('timer', timerProp);
    if (timerProp === 0) {
      clearTimeout(timeOut);
    }
  };

  timeCurrent = () => {
    const { interval } = this.state;
    const { timeOutProp } = this.props;
    const { timerProp } = this.props;
    if (timerProp > 0) {
      timeOutProp(1);
    } else {
      clearInterval(interval);
      this.setState({ isDesabled: true });
    }
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
        <Header history={ history } />
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
  timeOutProp: (secDegree) => dispatch(timeOutAction(secDegree)),
  setTimerProp: (time) => dispatch(setTimer(time)),
});

const mapStateToProps = (state) => ({
  resultsQuestions: state.gameReducer.resultsQuestions,
  timerProp: state.settingsReducer.timer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
