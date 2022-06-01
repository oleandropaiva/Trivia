import {
  USER_EMAIL,
  USER_NAME,
  USER_SCORE,
  CURRENT_SCORE,
  RIGHT_GUESSES,
  TIMER,
  TIME_OUT,
  RESET_SCORE,
} from '../../data/magicNumbers';

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

export const currentScore = (score) => ({
  type: CURRENT_SCORE,
  score,
});

export const rightGuesses = (hit) => ({
  type: RIGHT_GUESSES,
  hit,
});

export const setTimer = (time) => ({
  type: TIMER,
  payload: time,
});

export const timeOutAction = (secDegree) => ({
  type: TIME_OUT,
  secDegree,
});

export const resetScore = (scoreInit) => ({
  type: RESET_SCORE,
  scoreInit,
});
