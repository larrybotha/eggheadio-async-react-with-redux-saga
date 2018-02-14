import React, {Component} from 'react';

import './App.css';

// wtf... this is magically connected... is this create-react magic?
class App extends Component {
  render() {
    const {starWars, fetchStarWarsRequest} = this.props;

    return (
      <div>
        <h1>Redux Saga</h1>
        <div>
          {starWars.people.map((person, i) => <h4 key={i}>{person.name}</h4>)}
        </div>
        <button onClick={fetchStarWarsRequest}>
          {starWars.uiState === 'busy' ? 'loading...' : 'Load More'}
        </button>
      </div>
    );
  }
}

export default App;
