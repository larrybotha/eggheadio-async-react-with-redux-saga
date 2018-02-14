import {combineReducers} from 'redux';
import * as TYPES from '../types';

const initialState = {
  uiState: 'idle',
  people: [],
};

const handleStarWarsFetchRequest = (state, action) => {
  return {
    ...state,
    uiState: 'busy',
  };
};

const handleStarWarsFetchSuccess = (state, action) => {
  return {
    ...state,
    people: action.data,
    uiState: 'idle',
  };
};

const starWars = (state = initialState, action) => {
  const handlers = {
    [TYPES.FETCH_STAR_WARS_SUCCESS]: handleStarWarsFetchSuccess,
    [TYPES.FETCH_STAR_WARS_REQUEST]: handleStarWarsFetchRequest,
  };
  return handlers[action.type] ? handlers[action.type](state, action) : state;
};

const rootReducer = combineReducers({
  starWars,
});

export default rootReducer;
