import { USER_EMAIL, USER_NAME, USER_SCORE, CURRENT_SCORE } from '../actions/newFile';

const INITIAL_STATE = {
  name: '',
  assertions: '',
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
  default:
    return state;
  }
}

export default userReducer;
