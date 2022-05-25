import { USER_EMAIL, USER_NAME, USER_SCORE, QUESTION } from './newFile';

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

export const getQuestions = (question) => ({
  type: QUESTION,
  payload: question,
});

const BASE_URL = 'https://opentdb.com/api.php?amount=5';

export async function getApiToken() {
  const recebeAPI = await fetch('https://opentdb.com/api_token.php?command=request');
  const categories = await recebeAPI.json();
  return (categories);
}

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
