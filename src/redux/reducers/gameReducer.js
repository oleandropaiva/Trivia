import { QUESTION, CATEGORIES } from '../actions/newFile';

const INITIAL_STATE = {
  resultsQuestions: [],
  categories: [],
};

function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case QUESTION:
    return {
      ...state,
      resultsQuestions: action.payload,
    };
  case CATEGORIES:
    return {
      ...state,
      categories: action.payload,
    };
  default:
    return state;
  }
}

export default gameReducer;
