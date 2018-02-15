import {
  call,
  put,
  takeLatest,
  take,
  // non-blocking-effects
  select,
  throttle,
  fork,
  spawn,
  cancel,
} from 'redux-saga/effects';

import api from '../api';

import * as actions from '../actions';

function* handleInput(input) {}

export function* watchInput() {
  // throttle works in the same way as _.throttle
  // It takes a timeout, the type of the action to watch for, and the generator
  // to execute when that type is dispatched
  yield throttle(500, 'INPUT_CHANGE', handleInput);
}

function* fetchPerson(action) {
  try {
    // fork works in the same way as call
    // It calls a function, spreading the remaining parameters into that function,
    // but instead of blocking any further execution, allows execution to continue
    // Handy when you need to send a request, but don't need to wait for the
    // returned data
    // Despite it being non-blocking, the containing generator will not return
    // until all forks have been resolved
    yield fork(api, '/breeds/list/all');

    // spawn is similar to fork, but it creates a detached task. This means that
    // the generator will not wait for spawn tasks to resolve before returning
    const dogs = yield spawn(api, '/breeds/list/all');

    // get a piece of state in a non-blocking manner
    const selector = yield select(state => state.starWars);

    const person = yield call(api, '/people');

    yield put({type: actions.FETCH_STAR_WARS_SUCCESS, data: person.results});

    // we can cancel requests by listening for an action being dispatched, and
    // cancelling
    // In the above scenario, if both 'call' and 'put' have been executed, a user
    // may 'cancel' the dogs request
    // This is useful when someone is logging in, and then instantly attempts to
    // log out.
    yield take('CANCELLED');
    yield cancel(dogs);
  } catch (e) {
    console.log(e);
  }
}

export function* fetchPersonSaga() {
  yield takeLatest(actions.FETCH_STAR_WARS_REQUEST, fetchPerson);
}
