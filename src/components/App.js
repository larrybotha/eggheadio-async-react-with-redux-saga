import React, {Component} from 'react';
import {connect} from 'react-redux';

import './App.css';

import * as actions from '../actions';

class App extends Component {
  render() {
    const loading = starWars.uiState !== 'idle';

    return (
      <div>
        <h1>Redux Saga</h1>

        <button onClick={fetchStarWarsRequest}>
          {loading ? 'loading...' : 'people'}
        </button>

      </div>
    );
  }
}

const mapDispatchToProps = {...actions};

const mapStateToProps = ({starWars}) => ({starWars});

export default connect(mapStateToProps, mapDispatchToProps)(App);
