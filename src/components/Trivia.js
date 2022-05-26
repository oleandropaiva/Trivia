import React from 'react';
import { connect } from 'react-redux';

class Trivia extends React.Component {
  render() {
    const { resultsQuestions } = this.props;
    const { results } = resultsQuestions;

    // const questions = [results[0].correct_answer, results[0].incorrect_answers];
    // console.log('questions', questions);

    return (
      <div>
        {typeof results === 'undefined'
          ? <p>Carregando</p>
          : (
            <div>
              <h1 data-testid="question-category">
                {results[0].category}
              </h1>
              <h2 data-testid="question-text">{ results[0].question }</h2>
              <button
                type="button"
                data-testid="correct-answer"
              >
                {
                  results[0].correct_answer
                }
              </button>
              {results[0].incorrect_answers
                .map((incorretAnsewr, index) => (
                  <button
                    type="button"
                    data-testid={ `wrong-answer-${index}` }
                    key={ index }
                  >
                    { incorretAnsewr }
                  </button>))}
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resultsQuestions: state.gameReducer.resultsQuestions,
});

export default connect(mapStateToProps)(Trivia);
