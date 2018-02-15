import React, {Component} from 'react';
import {connect} from 'react-redux';

import './App.css';

import * as actions from '../actions';

class App extends Component {
  render() {
    const {fetchStarWarsRequest, starWarsPlanetsRequest, starWars} = this.props;
    const loading = starWars.uiState !== 'idle';

    return (
      <div>
        <h1>Redux Saga</h1>
        <div>
          {starWars.people.map((person, i) => <h4 key={i}>{person.name}</h4>)}
        </div>

        <button onClick={fetchStarWarsRequest}>
          {loading ? 'loading...' : 'people'}
        </button>

        <hr />

        <div>
          {starWars.planets.map((planet, i) => <h4 key={i}>{planet.name}</h4>)}
        </div>

        <button onClick={starWarsPlanetsRequest}>
          {loading ? 'loading...' : 'planets'}
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = {...actions};

const mapStateToProps = ({starWars}) => ({starWars});

export default connect(mapStateToProps, mapDispatchToProps)(App);
