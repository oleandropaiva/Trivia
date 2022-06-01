import {
  QUESTION,
  CATEGORIES,
} from '../../data/magicNumbers';

export const getApiTokenCategories = (categories) => ({
  type: CATEGORIES,
  payload: categories,
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

export const getQuestions = (question) => ({
  type: QUESTION,
  payload: question,
});

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
