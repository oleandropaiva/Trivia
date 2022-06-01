import { TIMER, TIME_OUT, TIME_OUT_SECONDS } from '../../data/magicNumbers';
// import { TIMER, TIME_OUT } from '../../data/magicNumbers';

const INITIAL_STATE = {
  timer: TIME_OUT_SECONDS,
  // timer: 5,
};

function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TIMER:
    return {
      ...state,
      timer: action.payload,
    };
  case TIME_OUT:
    return {
      ...state,
      timer: state.timer - action.secDegree,
    };
  default:
    return state;
  }
}

export default gameReducer;
