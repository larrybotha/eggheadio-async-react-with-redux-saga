import {combineReducers} from 'redux';
import * as actions from '../actions';

const initialState = {
  uiState: 'idle',
  people: [],
  planets: [],
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
    [actions.FETCH_STAR_WARS_SUCCESS]: handleStarWarsFetchSuccess,
    [actions.FETCH_STAR_WARS_REQUEST]: handleStarWarsFetchRequest,
  };
  return handlers[action.type] ? handlers[action.type](state, action) : state;
};

const rootReducer = combineReducers({
  starWars,
});

export default rootReducer;
