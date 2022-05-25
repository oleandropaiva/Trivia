import { QUESTION } from '../actions/newFile';

const INITIAL_STATE = {
  resultsQuestions: [],
};

function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case QUESTION:
    return {
      ...state,
      resultsQuestions: action.payload,
    };

  default:
    return state;
  }
}

export default gameReducer;
