import { combineReducers } from 'redux';
// import user from './user';
import player from './player';

const rootReducer = combineReducers({
  player,
});

export default rootReducer;
