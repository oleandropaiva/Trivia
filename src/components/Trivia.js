import React from 'react';
import { connect } from 'react-redux';

class Trivia extends React.Component {
  state = {
    currentQuestion: 0,
    showNextBtn: false,
  }

  verifyAnswer = (alternative) => {
    if (alternative === 'correct-answer') {
      console.log('Correto');
    } else console.log('Errado');
    this.setState({ showNextBtn: true });
  }

  randomAnswers = () => {
    const { resultsQuestions } = this.props;
    const { results } = resultsQuestions;

    const answers = [results[0].correct_answer, ...results[0].incorrect_answers];

    const alternatives = results[0].incorrect_answers.map((text) => ({ text, isCorrect: false }));
    alternatives.push({
      text: results[0].correct_answer,
      isCorrect: true,
    });
    console.log(alternatives);

    const RANDOM_CONST = 0.5;
    const randomAnsArray = answers.sort(() => Math.random() - RANDOM_CONST);

    // console.log('answers', answers);
    return randomAnsArray;
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
  }

  render() {
    const { currentQuestion, showNextBtn } = this.state;
    const { resultsQuestions } = this.props;
    const { results = [] } = resultsQuestions;

    return (
      <div>
        {
          results.length <= 0
            ? <p>Carregando...</p>
            : (
              <div>
                <h1 data-testid="question-category">
                  {results[currentQuestion].category}
                </h1>
                <h2 data-testid="question-text">{ results[0].question }</h2>
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
            )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resultsQuestions: state.gameReducer.resultsQuestions,
});

export default connect(mapStateToProps)(Trivia);

/* {randomAnsArray.map((answers, index) => (
  <div key={ index }>
    <button
      data-testid={ `wrong-answer-${index}` }
      type="button"
      onClick={ this.handleAnswers }
    >
teste
    </button>
  </div>
))} */
