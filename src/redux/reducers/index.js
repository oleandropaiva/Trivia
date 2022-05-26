import { combineReducers } from 'redux';
import player from './player';
import gameReducer from './gameReducer';

const rootReducer = combineReducers({ player, gameReducer });

export default rootReducer;
