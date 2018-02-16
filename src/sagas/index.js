
import api from '../api';

import * as actions from '../actions';

  }
}

export function* fetchPlanetsSaga() {
  yield takeLatest(actions.FETCH_STAR_WARS_PLANETS_REQUEST, fetchPlanets);
}

export default function* rootSaga() {
  yield all([fork(fetchPlanetsSaga), fork(fetchPersonSaga)]);
}
