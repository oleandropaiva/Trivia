import { combineReducers } from 'redux';
import player from './player';
import gameReducer from './gameReducer';
import settingsReducer from './settingsReducer';

const rootReducer = combineReducers({ player, gameReducer, settingsReducer });

export default rootReducer;
