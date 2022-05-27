import React from 'react';
import { connect } from 'react-redux';

class Trivia extends React.Component {
  state = {
    currentQuestion: 0,
    showNextBtn: false,
    nextQuestion: [],
  }

  verifyAnswer = (alternative) => {
    if (alternative === 'correct-answer') {
      console.log('Correto');
    } else console.log('Errado');
    this.setState({ showNextBtn: true });
  }

  randomAnswers = () => {
    const { resultsQuestions } = this.props;
    const { currentQuestion } = this.state;
    const { results } = resultsQuestions;

    // const answers = [results[0].correct_answer, ...results[0].incorrect_answers];

    const alternatives = results[currentQuestion + 1].incorrect_answers.map((text) => ({
      text,
      isCorrect: false,
    }));
    alternatives.push({
      text: results[currentQuestion + 1].correct_answer,
      isCorrect: true,
    });
    console.log(alternatives);

    const RANDOM_CONST = 0.5;
    const nextQuestion = alternatives.sort(() => Math.random() - RANDOM_CONST);

    this.setState({
      nextQuestion,
    });

    console.log('results', results);
    return nextQuestion;
  }

  nextQuestion = () => {
    const { resultsQuestions, history } = this.props;
    const { currentQuestion } = this.state;
    const { results } = resultsQuestions;

    this.setState({ showNextBtn: false });
    if (currentQuestion < results.length - 1) {
      this.setState({ currentQuestion: currentQuestion + 1 });
    } else {
      history.push('/'); // REDIRECIONAR PARA RANKING
    }
    this.randomAnswers();
    // console.log('currentQuestion', currentQuestion);
    //
  }

  render() {
    const { currentQuestion, showNextBtn, nextQuestion } = this.state;
    const { resultsQuestions } = this.props;
    const { results = [] } = resultsQuestions;

    return (
      <div>

        {
          // eslint-disable-next-line no-nested-ternary
          results.length <= 0
            ? <p>Carregando...</p>
            : (currentQuestion === 0 ? (
              <div>
                <h1 data-testid="question-category">
                  {results[currentQuestion].category}
                </h1>
                <h2 data-testid="question-text">{ results[0].question }</h2>
                <div data-testid="answer-options">
                  <button
                    type="button"
                    data-testid="correct-answer"
                    name="correct-answer"
                    onClick={ () => this.verifyAnswer('correct-answer') }
                  >
                    {
                      results[currentQuestion].correct_answer
                    }
                  </button>

                  {results[currentQuestion].incorrect_answers
                    .map((incorretAnsewr, index) => (
                      <button
                        key={ index }
                        type="button"
                        name={ `wrong-answer-${index}` }
                        data-testid={ `wrong-answer-${index}` }
                        onClick={ () => this.verifyAnswer(`wrong-answer-${index}`) }
                      >
                        { incorretAnsewr }
                      </button>))}
                </div>
              </div>
            ) : (
              <div>
                <h1 data-testid="question-category">
                  {results[currentQuestion].category}
                </h1>

                <h2 data-testid="question-text">{ results[currentQuestion].question }</h2>

                {nextQuestion.map(({ text, isCorrect }, index) => (
                  <div key={ index } data-testid="answer-options">
                    <button
                      type="button"
                      data-testid={ isCorrect
                        ? 'correct-answer'
                        : `wrong-answer-${index}` }
                      onClick={ isCorrect
                        ? () => this.verifyAnswer('correct-answer')
                        : () => this.verifyAnswer(`wrong-answer-${index}`) }
                    >
                      {text}
                    </button>
                  </div>
                ))}
              </div>
            )
            )
        }
        {/* END - // results.length // */}

        {showNextBtn && (
          <button
            data-testid="btn-next"
            type="button"
            // key={ index }
            onClick={ this.nextQuestion }
          >
            Next
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resultsQuestions: state.gameReducer.resultsQuestions,
});

export default connect(mapStateToProps)(Trivia);
