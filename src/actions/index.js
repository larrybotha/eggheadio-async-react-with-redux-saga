// call and put are known as effects in redux-saga
import {call, put} from 'redux-saga/effects';
import * as TYPES from '../types';

const api = url => fetch(url).then(res => res.json());

export const fetchStarWarsRequest = () => ({
  type: TYPES.FETCH_STAR_WARS_REQUEST,
});

// fetch person receives the action that initiated that initiates it.
// fetchStarWarsRequest above will eventually result in fetchPerson being executed
// when we add a watcher to fetchStarWarsRequest
export function* fetchPerson(action) {
  try {
    // api is a function which will be called with the remaining
    // parameters spread onto it
    const person = yield call(api, 'https://swapi.co/api/people');

    // put takes an action creator
    // put works in the same way as redux's dispatch - it dispatches actions
    // put will only be executed once call returns a result - call is blocking
    // This makes asynchronous requests, like fetching data from an API,
    // synchronous
    yield put({type: TYPES.FETCH_STAR_WARS_SUCCESS, data: person.results});
  } catch (e) {
    console.log(e);
  }
}
