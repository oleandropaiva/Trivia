import {
  USER_EMAIL,
  USER_NAME,
  USER_SCORE,
  QUESTION,
  CATEGORIES,
  CURRENT_SCORE,
  RIGHT_GUESSES,
} from './newFile';

export const sendEmailForm = (email) => ({
  type: USER_EMAIL,
  payload: email,
});

export const sendUserForm = (user) => ({
  type: USER_NAME,
  payload: user,
});

export const sendScore = (score) => ({
  type: USER_SCORE,
  payload: score,
});

export const getApiTokenCategories = (categories) => ({
  type: CATEGORIES,
  payload: categories,
});

export const getQuestions = (question) => ({
  type: QUESTION,
  payload: question,
});

export const currentScore = (score) => ({
  type: CURRENT_SCORE,
  score,
});

export const rightGuesses = (hit) => ({
  type: RIGHT_GUESSES,
  hit,
});

export function getApiToken() {
  return async (dispatch) => {
    try {
      const recebeAPI = await fetch('https://opentdb.com/api_token.php?command=request');
      const categories = await recebeAPI.json();
      dispatch(getApiTokenCategories(categories));
    } catch (error) {
      console.error(error);
    }
  };
}

const BASE_URL = 'https://opentdb.com/api.php?amount=5';

export function fetchQuestion(token) {
  return async (dispatch) => {
    try {
      const fetchGetQuestion = await fetch(`${BASE_URL}&token=${token}`);
      const Questions = await fetchGetQuestion.json();
      dispatch(getQuestions(Questions));
    } catch (error) {
      console.error(error);
    }
  };
}
