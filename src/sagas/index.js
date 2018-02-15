import {
  call,
  put,
  takeLatest,
  take,
  // non-blocking-effects
  // select,
  // throttle,
  // fork,
  // spawn,
  // cancel,
} from 'redux-saga/effects';

import api from '../api';

import * as actions from '../actions';

function* fetchPerson(action) {
  try {
    const person = yield call(api, '/people');

    yield put({type: actions.FETCH_STAR_WARS_SUCCESS, data: person.results});
  } catch (e) {
    console.log(e);
  }
}

export function* fetchPersonSaga() {
  yield takeLatest(actions.FETCH_STAR_WARS_REQUEST, fetchPerson);
}
