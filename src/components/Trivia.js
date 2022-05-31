import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import propTypes from 'prop-types';
import { currentScore, rightGuesses } from '../redux/actions';

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

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate');
    const { resultsQuestions } = prevProps;
    const { currentQuestion, conditionDidUpdate } = this.state;
    const { results } = prevProps.resultsQuestions;

    if (typeof resultsQuestions.results !== 'undefined') {
      if (currentQuestion < results.length - 1 && conditionDidUpdate === true) {
        const alternatives = results[currentQuestion].incorrect_answers.map((text) => ({
          text,
          isCorrect: false,
          option: CORRECT_ANSWER,
          difficultyQuestion: results[currentQuestion].difficulty,
        }));
        alternatives.push({
          text: results[currentQuestion].correct_answer,
          isCorrect: true,
          option: WRONG_ANSWER,
          difficultyQuestion: results[currentQuestion].difficulty,
        });
        this.randomAnswers(alternatives);
        return true;
      }
      return false;
    }
    return false;
  }

  randomAnswers = (alternatives) => {
    const RANDOM_CONST = 0.5;
    const nextQuestionRandom = alternatives.sort(() => Math.random() - RANDOM_CONST);
    console.log('nextQuestionRandom', nextQuestionRandom);
    this.setState({
      question: nextQuestionRandom,
      conditionDidUpdate: false,
    });
  }

  verifyAnswer = (option, difficultyQuestion) => {
    console.log('option', option);
    console.log('difficultyQuestion', difficultyQuestion);
    const { timer, currentScoreProp, rightGuessesProp } = this.props;
    this.setState({
      isWaiting: false,
      styleBtnCorrect: 'btnCorrectOption',
      styleBtnIncorrect: 'btnIncorrectOption',
      showNextBtn: true,
    });

    if (option !== CORRECT_ANSWER) {
      const pointDifficulty = [];
      const POINT = 10;
      const ONE_POINT = 1;
      const TWO_POINTS = 2;
      const THREE_POINTS = 3;

      // difficultyQuestion === 'easy' && pointDifficulty.push(ONE_POINT);
      // difficultyQuestion === 'medium' && pointDifficulty.push(TWO_POINTS);
      // difficultyQuestion === 'hard' && pointDifficulty.push(THREE_POINTS);
      if (difficultyQuestion === 'easy') {
        pointDifficulty.push(ONE_POINT);
      } else if (difficultyQuestion === 'medium') {
        pointDifficulty.push(TWO_POINTS);
      } else if (difficultyQuestion === 'hard') {
        pointDifficulty.push(THREE_POINTS);
      }
      const score = POINT + (timer * pointDifficulty[0]);
      console.log('score', score);

      currentScoreProp(score);
      rightGuessesProp(1);
    } return false;
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
        styleBtnCorrect: '',
        styleBtnIncorrect: '',
      });
    } else {
      history.push('/feedback'); // REDIRECIONAR PARA FEEDBACK
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
    const { resultsQuestions, isDesabled } = this.props;
    const { results = [] } = resultsQuestions;
    console.log('results', results);
    console.log('question', question);

    return (
      <div>
        {question.length <= 0 && isWaiting === true
          ? <p>Carregando...</p>
          : (
            <div>
              <h1 data-testid="question-category">
                {results[currentQuestion].category}
              </h1>
              <h2 data-testid="question-text">{ results[currentQuestion].question }</h2>

              <div data-testid="answer-options">
                {question.map((quiz, index) => (
                  <div key={ index } data-testid="answer-options">
                    <button
                      type="button"
                      disabled={ isDesabled }
                      className={ quiz.isCorrect
                        ? `${styleBtnCorrect}`
                        : `${styleBtnIncorrect}` }
                      data-testid={ quiz.isCorrect
                        ? CORRECT_ANSWER
                        : `${WRONG_ANSWER}${index}` }
                      onClick={ () => this.verifyAnswer(
                        quiz.option, quiz.difficultyQuestion,
                      ) }
                    >
                      {quiz.text}
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

const mapDispatchToProps = (dispatch) => ({
  currentScoreProp: (time) => dispatch(currentScore(time)),
  rightGuessesProp: (hit) => dispatch(rightGuesses(hit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
