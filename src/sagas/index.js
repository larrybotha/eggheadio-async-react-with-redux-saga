import {all, call, fork, put, takeLatest, take} from 'redux-saga/effects';

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

function* fetchPlanets(action) {
  try {
    const planets = yield call(api, '/planets');

    yield put({
      type: actions.FETCH_STAR_WARS_PLANETS_SUCCESS,
      data: planets.results,
    });
  } catch (e) {
    console.log(e);
  }
}

export function* fetchPlanetsSaga() {
  yield takeLatest(actions.FETCH_STAR_WARS_PLANETS_REQUEST, fetchPlanets);
}

export default function* rootSaga() {
  yield all([fork(fetchPlanetsSaga), fork(fetchPersonSaga)]);
}
