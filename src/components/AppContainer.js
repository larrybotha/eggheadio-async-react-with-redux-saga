import React from 'react';
import {Provider} from 'react-redux';

import {store} from '../store/index.js';
import App from './App';

const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppContainer;
