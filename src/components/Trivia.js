import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import propTypes from 'prop-types';
import { currentScore } from '../redux/actions';

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
    // difficulty: '',
  }

  componentDidUpdate() {
    // console.log('componentDidUpdate');
    const { resultsQuestions } = this.props;
    const { currentQuestion, conditionDidUpdate } = this.state;
    const { results } = resultsQuestions;

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

  verifyAnswer = (option, difficultyQuestion) => {
    console.log('option', option);
    const { timer, currentScoreProp } = this.props;
    this.setState({
      isWaiting: false,
      styleBtnCorrect: 'btnCorrectOption',
      styleBtnIncorrect: 'btnIncorrectOption',
      showNextBtn: true,
      // difficulty: difficultyQuestion,
    });

    const totalScore = [];
    const POINT = 10;
    const ONE_POINT = 1;
    const TWO_POINT = 2;
    const THREE_POINT = 3;
    if (difficultyQuestion === 'easy') {
      totalScore.push(ONE_POINT);
    } else if (difficultyQuestion === 'medium') {
      totalScore.push(TWO_POINT);
    } else if (difficultyQuestion === 'hard') {
      totalScore.push(THREE_POINT);
    }
    const score = (timer * totalScore[0]) + POINT;
    console.log('score', score);

    if (option !== 'correct-answer') {
      currentScoreProp(score);
    } else {
      currentScoreProp(0);
    }
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
    // console.log('results', results);
    console.log('question', question);
    // console.log('props', this.props);

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
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
