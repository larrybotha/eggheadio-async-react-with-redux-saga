import {all, call, cancel, fork, put, takeLatest} from 'redux-saga/effects';

import api from '../api';

import * as actions from '../actions';

function* fetchPerson(action) {
  try {
    const person = yield call(api, '/people');

    yield put(actions.fetchStarWarsSuccess(person.results));
  } catch (e) {
    console.log(e);
  }
}

export function* fetchPersonSaga() {
  yield takeLatest(actions.FETCH_STAR_WARS_REQUEST, fetchPerson);
}

// this is a non-blocking request on fetchPerson
export function* forkedFetchPerson() {
  // we use fork to do a non-blocking call
  const syncPersons = yield fork(fetchPerson);
  // and then wait for a STOP_BACKGROUND_FETCH action to be dispatched
  yield take(actions.STOP_BACKGROUND_FETCH);
  // at which point we can then cancel the request
  yield cancel(syncPersons);
}

export default function* rootSaga() {
  yield all([fork(fetchPersonSaga)]);
}
