import {
  USER_EMAIL,
  USER_NAME,
  USER_SCORE,
  CURRENT_SCORE,
  RIGHT_GUESSES,
} from '../actions/newFile';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload,
    };
  case USER_NAME:
    return {
      ...state,
      name: action.payload,
    };
  case USER_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  case CURRENT_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  case RIGHT_GUESSES:
    return {
      ...state,
      assertions: state.assertions + action.hit,
    };
  default:
    return state;
  }
}

export default userReducer;
