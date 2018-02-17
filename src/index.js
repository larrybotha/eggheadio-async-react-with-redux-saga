import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AppContainer from './components/AppContainer';

ReactDOM.render(<AppContainer />, document.getElementById('root'));

registerServiceWorker();
