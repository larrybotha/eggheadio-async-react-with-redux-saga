// call and put are known as effects in redux-saga
import {call, put, takeLatest} from 'redux-saga/effects';

import api from '../api';

import * as TYPES from '../types';

// fetch person receives the action that initiated that initiates it.
// fetchStarWarsRequest above will eventually result in fetchPerson being executed
// when we add a watcher to fetchStarWarsRequest
function* fetchPerson(action) {
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

// the watcher connects our fetch function to the store
export function* fetchPersonSaga() {
  // it watches for FETCH_STAR_WARS_REQUEST being dispatched, and then calls
  // fetchPerson, which then receives the data sent through when dispatched
  // takeLatest is what's doing the listening here. If another action of the same
  // type is dispatched, then takeLatest will cancel the previous call to
  // fetchPerson and execute again. This ensures that only the latest function
  // runs at any given time.
  yield takeLatest(TYPES.FETCH_STAR_WARS_REQUEST, fetchPerson);
}
