import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
// import user from './user';
import player from './player';

const rootReducer = combineReducers({
  player,
  gameReducer,
});

export default rootReducer;
