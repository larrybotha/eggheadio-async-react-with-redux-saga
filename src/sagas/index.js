import {
  actionChannel,
  all,
  call,
  fork,
  put,
  take,
  takeEvery,
} from 'redux-saga/effects';

import api from '../api';

import * as actions from '../actions';

function* takeOneAtMost() {
  // the actionChannel effect instructs the middleware to queue up actions of
  // the matching type
  const chan = yield actionChannel(actions.QUEUE_CHANNEL_REQUESTS);

  for (let i = 1; i >= 1; i++) {
    // take will block the loop until there is something in the queue
    yield take(chan);
    // once we have something in the queue, we can make a request to our
    // API. This is also blocking, and will only continue once there is
    // a response
    yield call(api, '/people');
    // once the api call in call responds, we can dispatch an action
    yield put(actions.fetchStarWarsSuccess(i));
  }
}

function* takeOneAtMostSaga() {
  yield takeEvery(actions.FETCH_STAR_WARS_REQUEST, takeOneAtMost);
}

export default function* rootSaga() {
  yield all([fork(takeOneAtMostSaga)]);
}
