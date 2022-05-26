import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Trivia from '../components/Trivia';
import { fetchQuestion } from '../redux/actions';

class Game extends Component {
  componentDidMount() {
    const { fetchQuestionsProp } = this.props;
    fetchQuestionsProp(
      '7f393ae83a217f83c164fbd62ec3fdfb19a7d860bfb20137dd14f1a32c8e4655',
    );
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

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsProp: (token) => dispatch(fetchQuestion(token)),
});

export default connect(null, mapDispatchToProps)(Game);
