import React, {Component} from 'react';
import {connect} from 'react-redux';

import './App.css';

import * as actions from '../actions';

class App extends Component {
  state = {count: 0};

  handleQueue = () => {
    this.props.queueChannelRequests();
    this.setState(({count}) => ({count: count + 1}));
  };

  render() {
    const {count} = this.state;
    const {fetchStarWarsRequest, starWars} = this.props;
    const loading = starWars.uiState !== 'idle';

    return (
      <div>
        <h1>Redux Saga</h1>
        <h3># of Button Clicks {count}</h3>
        <h3># of Saga effects {starWars.people}</h3>

        <button onClick={fetchStarWarsRequest}>
          {loading ? 'loading...' : 'people'}
        </button>

        <button onClick={this.handleQueue}>Queue channel</button>
      </div>
    );
  }
}

const mapDispatchToProps = {...actions};

const mapStateToProps = ({starWars}) => ({starWars});

export default connect(mapStateToProps, mapDispatchToProps)(App);
