// call and put are known as effects in redux-saga
import {call, put, takeLatest, take,
  // race, all
} from 'redux-saga/effects';

import api from '../api';

import * as actions from '../actions';

// fetch person receives the action that initiated that initiates it.
// fetchStarWarsRequest above will eventually result in fetchPerson being executed
// when we add a watcher to fetchStarWarsRequest
function* fetchPerson(action) {
  try {
    // we can block a request by using take, and only continuing when another
    // action is dispatched with the correct type
    console.log('entered fetchPerson')
    yield take(actions.CONFIRMATION);
    console.log('after confirm');

    // race is a blocking effect that will return whichever endpoint responds first
    // It will clean up any effects that are still pending
    // const {normal, custom} = yield race({
    //   normal: call(api, '/people'),
    //   custom: call(api, '/people/justForTyler')
    // })

    // all is a hybrid effect - it can be blocking or non-blocking. This is
    // determined by the effects it contains. In this case, because we are using
    // call inside of all, it is a blocking effect
    // if all is blocking, it waits for all calls to return a response
    // const {normal, custom} = yield all({
    //   normal: call(api, '/people'),
    //   custom: call(api, '/people/justForTyler')
    // })

    // api is a function which will be called with the remaining
    // parameters spread onto it
    // call is blocking, because we don't want anything else to happend until we
    // get a result.
    const person = yield call(api, '/people');

    // put takes an action creator
    // put works in the same way as redux's dispatch - it dispatches actions
    // put will only be executed once call returns a result - call is blocking
    // This makes asynchronous requests, like fetching data from an API,
    // synchronous
    // put is non-blocking, because at this point don't need to wait for anything
    // before dispatching an action - we have our data, and we want our store
    // updated
    yield put({type: actions.FETCH_STAR_WARS_SUCCESS, data: person.results});
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
  yield takeLatest(actions.FETCH_STAR_WARS_REQUEST, fetchPerson);
}
