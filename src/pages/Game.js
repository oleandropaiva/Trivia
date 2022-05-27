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
    const { responseCode } = resultsQuestions; // Verificar pq ao mudar para camel case o teste falha req6 (anteriormente era response_code)

    const RESPONSE_CODE_NUMBER = 3;
    if (responseCode === RESPONSE_CODE_NUMBER) { // Verificar pq ao mudar para camel case o teste falha req6 (anteriormente era response_code)
      resetLocalStorage();
      history.push('/');
    }

    return (
      <div>
        <Header />
        <Trivia history={ history } />
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
