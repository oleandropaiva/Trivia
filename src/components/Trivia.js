import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import propTypes from 'prop-types';

const CORRECT_ANSWER = 'correct-answer';
const WRONG_ANSWER = 'wrong-answer-';
class Trivia extends React.Component {
  state = {
    currentQuestion: 0,
    question: [],
    showNextBtn: false,
    styleBtnCorrect: '',
    styleBtnIncorrect: '',
    conditionDidUpdate: true,
    isWaiting: true,
  }

  componentDidUpdate() {
    const { resultsQuestions } = this.props;
    const { currentQuestion, conditionDidUpdate } = this.state;
    const { results } = resultsQuestions;

    if (currentQuestion < results.length - 1 && conditionDidUpdate === true) {
      const alternatives = results[currentQuestion].incorrect_answers.map((text) => ({
        text,
        isCorrect: false,
      }));
      alternatives.push({
        text: results[currentQuestion].correct_answer,
        isCorrect: true,
      });
      this.randomAnswers(alternatives);
    }
  }

  randomAnswers = (alternatives) => {
    const RANDOM_CONST = 0.5;
    const nextQuestionRandom = alternatives.sort(() => Math.random() - RANDOM_CONST);
    this.setState({
      question: nextQuestionRandom,
      conditionDidUpdate: false,
    });
  }

  verifyAnswer = () => {
    this.setState({
      isWaiting: false,
      styleBtnCorrect: 'btnCorrectOption',
      styleBtnIncorrect: 'btnIncorrectOption',
      showNextBtn: true,
    });
  }

  nextQuestion = () => {
    const { resultsQuestions, history } = this.props;
    const { currentQuestion } = this.state;
    const { results } = resultsQuestions;
    this.setState({ showNextBtn: false });
    if (currentQuestion < results.length - 1) {
      this.setState({
        currentQuestion: currentQuestion + 1,
        isWaiting: true,
        conditionDidUpdate: true,
      });
      this.setState({
        styleBtnCorrect: '',
        styleBtnIncorrect: '',
      });
    } else {
      history.push('/'); // REDIRECIONAR PARA RANKING
    }
  }

  render() {
    const {
      currentQuestion,
      question,
      showNextBtn,
      styleBtnCorrect,
      styleBtnIncorrect,
      isWaiting,
    } = this.state;
    const { resultsQuestions } = this.props;
    const { results = [] } = resultsQuestions;
    console.log('Render results', results);
    console.log('Render question', question);

    return (
      <div>
        {results.length <= 0 && isWaiting === true
          ? <p>Carregando...</p>
          : (
            <div>
              <h1 data-testid="question-category">
                {results[currentQuestion].category}
              </h1>
              <h2 data-testid="question-text">{ results[currentQuestion].question }</h2>

              <div data-testid="answer-options">
                {question.map(({ text, isCorrect }, index) => (
                  <div key={ index } data-testid="answer-options">
                    <button
                      type="button"
                      className={ isCorrect
                        ? `${styleBtnCorrect}`
                        : `${styleBtnIncorrect}` }
                      data-testid={ isCorrect
                        ? CORRECT_ANSWER
                        : `${WRONG_ANSWER}${index}` }
                      onClick={ this.verifyAnswer }
                    >
                      {text}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
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

Trivia.propTypes = {
  resultsQuestions: propTypes.arrayOf(propTypes.object),
}.isRequired;

const mapStateToProps = (state) => ({
  resultsQuestions: state.gameReducer.resultsQuestions,
});
export default connect(mapStateToProps)(Trivia);
