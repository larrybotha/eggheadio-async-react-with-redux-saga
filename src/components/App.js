import React, {Component} from 'react';

import './App.css';

// nope, no magic here, it's wrapped inside container/index
class App extends Component {
  state = { open: false }

  // handle the fetch click
  handleFetchClick = () => {
    const {fetchStarWarsRequest} = this.props;

    // dispatch the request
    // The actual api request will be blocked thanks to the take effect
    // in the saga
    fetchStarWarsRequest();
    // show a modal to allow the user to confirm that they want to make the
    // request
    this.setState({open: true});
  }

  // handle the confirmation
  handleConfirmClick = () => {
    const {confirmFetchStarWars} = this.props;

    // if the user confirms that they want to make the request, we dispatch
    // the confirm action
    // The confirm action's type is the type that the take effect in our saga
    // is expecting. Once an action of that type is dispatched, take will allow
    // further processing
    confirmFetchStarWars();
    this.setState({open: false})
  }

  render() {
    const {starWars} = this.props;
    const {open} = this.state;

    return (
      <div>
        <h1>Redux Saga</h1>
        <div>
          {starWars.people.map((person, i) => <h4 key={i}>{person.name}</h4>)}
        </div>

        <div style={{display: open ? 'inherit' : 'none'}} className="modal">
          <button onClick={this.handleConfirmClick}>confirm</button>
        </div>

          <button
            style={{display: open ? 'none' : 'inherit'}}
            onClick={this.handleFetchClick}>
          {starWars.uiState === 'busy' ? 'loading...' : 'Load More'}
        </button>
      </div>
    );
  }
}

export default App;
