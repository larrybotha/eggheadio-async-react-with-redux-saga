import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from '../components/AppContainer';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<AppContainer />, div);
});
