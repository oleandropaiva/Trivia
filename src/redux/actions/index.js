import { USER_EMAIL, USER_NAME, USER_SCORE } from './newFile';

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
