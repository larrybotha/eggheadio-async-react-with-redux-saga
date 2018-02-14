import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import {fetchPersonSaga} from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// 'run' here is referred to as a task, and is what glues the saga to the store,
// and is how takeLatest inside the saga has access to the dispatch actions
sagaMiddleware.run(fetchPersonSaga);
