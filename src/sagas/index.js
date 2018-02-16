import {all, call, fork, put, takeLatest} from 'redux-saga/effects';

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

export default function* rootSaga() {
  yield all([fork(fetchPersonSaga)]);
}
