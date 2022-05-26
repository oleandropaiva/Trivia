import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Trivia from '../components/Trivia';
import { fetchQuestion } from '../redux/actions';
import { getTokenLocalStorage } from '../services/localStorage';

class Game extends Component {
  componentDidMount() {
    const { fetchQuestionsProp } = this.props;

    const getToken = getTokenLocalStorage();
    fetchQuestionsProp(getToken);
  }

  render() {
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

export default connect(null, mapDispatchToProps)(Game);
