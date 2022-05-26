import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Trivia from '../components/Trivia';
import { fetchQuestion } from '../redux/actions';
import { getTokenLocalStorage, resetLocalStorage } from '../services/localStorage';

class Game extends Component {
  componentDidMount() {
    const { fetchQuestionsProp } = this.props;

    const getToken = getTokenLocalStorage();
    fetchQuestionsProp(getToken);
  }

  render() {
    const { resultsQuestions, history } = this.props;
    const { response_code } = resultsQuestions;

    const RESPONSE_CODE_NUMBER = 3;
    if (response_code === RESPONSE_CODE_NUMBER) {
      resetLocalStorage();
      history.push('/');
    }

    return (
      <div>
        <Header />
        <Trivia />
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
