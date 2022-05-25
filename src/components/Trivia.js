import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestion } from '../redux/actions/index';

class Trivia extends React.Component {
  componentDidMount() {
    const { fetchQuestionsProp } = this.props;
    fetchQuestionsProp('7f393ae83a217f83c164fbd62ec3fdfb19a7d860bfb20137dd14f1a32c8e4655');
  }

  render() {
    const { resultsQuestions } = this.props;
    const { results } = resultsQuestions;
    console.log(results);

    return (
      <div>
        <h1>
          { results.map((e, index) => (
            <div key={ index }>
              <h1>{e.question}</h1>
            </div>
          ))}

        </h1>
        {/* <h1 data-testid="question-category">
          Category:
          {results[0].category}
        </h1>
        <h2 data-testid="question-text">{results[0].question}</h2>
        <button type="button" data-testid="correct-answer">
          {results[0].correct_answer}
        </button>
        {results[0].incorrect_answers.map((incorretAnsewr, index) => (
          <button
            type="button"
            data-testid={ `wrong-answer-${index}` }
            key={ index }
          >
            {incorretAnsewr}
          </button>
        ))} */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsProp: (token) => dispatch(fetchQuestion(token)),
});

const mapStateToProps = (state) => ({
  resultsQuestions: state.gameReducer.resultsQuestions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
