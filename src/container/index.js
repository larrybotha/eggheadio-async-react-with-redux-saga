import {connect} from 'react-redux';
import App from '../components/App';
import {fetchStarWarsRequest, confirmFetchStarWars} from '../actions';

const mapStateToProps = ({starWars}) => ({starWars});

const bindActionsToDispatch = dispatch => ({
  fetchStarWarsRequest: () => dispatch(fetchStarWarsRequest()),
  confirmFetchStarWars: () => dispatch(confirmFetchStarWars()),
});

const AppContainer = connect(mapStateToProps, bindActionsToDispatch)(App);

export default AppContainer;
