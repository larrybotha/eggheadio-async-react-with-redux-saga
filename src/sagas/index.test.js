// these are the effects we need to test in our sagas
import {call, put, fork, take, cancel} from 'redux-saga/effects';
import {createMockTask} from 'redux-saga/utils';

import * as actions from '../actions';
import {fetchPerson, forkedFetchPerson} from './index';
import api from '../api';

describe('fetchPerson', () => {
  const personGen = fetchPerson();

  it('should hit api', () => {
    // this is what we need to test first as it's the first effect that we use
    expect(personGen.next()).toEqual(call(api, '/person'));
  });

  it('on success dispatch success action', () => {
    // in our saga put expects a response object from calling the API.
    // We don't have that response object, so we need to mock one
    const person = {results: []};
    // and then explicitly pass it through to next()
    expect(personGen.next(person)).toEqual(
      put(actions.fetchStarWarsSuccess(person))
    );
  });
});

describe('forkFetchPerson', () => {
  const forkedGen = forkedFetchPerson();

  it('forks the service', () => {
    // we need to ensure that the forked effect calls the correct generator.
    const expectedYield = fork(fetchPerson);

    expect(forkedGen.next().value).toEqual(expectedYield);
  });

  it('waits for stop action and cancels the service', () => {
    // Because fork is non-blocking it can resolve at any point, and is unknown
    // to the generator when it does resolve.
    // As a result we need to mock out the saga of a running task
    // (i.e. fetchPerson)
    // This mockTask right here is equivalent to fetchPerson, except we're
    // mocking it.
    const mockTask = createMockTask();
    const expectedTakeYield = take(actions.STOP_BACKGROUND_FETCH);

    // over here we're ensuring that take is called with the correct type
    // The saga middleware carries through the running task on each generation. We
    // need to mimic this behaviour, and do so by passing through the mocked task
    // on the 'take' iteration
    expect(forkedGen.next(mockTask).value).toEqual(expectedTakeYield);

    // now we test that the cancel effect of our forkedGen is the same as
    // explicitly canceling the mocked task
    const expectedCancelYield = cancel(mockTask);
    expect(forkedGen.next().value).toEqual(expectedCancelYield);
  });
});
