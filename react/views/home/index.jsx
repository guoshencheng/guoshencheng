import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, bindActionCreators, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { Router, Route } from 'react-router';
import createHistory from 'history/createHashHistory';
import { syncHistoryWithStore, routerReducer, routerMiddleware, push } from 'react-router-redux';
import reducers from '../../scripts/reducer/home';

import Navigation from '../../components/Navigation/index.jsx';

let hasHistory = createHistory();
const reactRouterMiddleware = routerMiddleware(hasHistory)
let createStoreWithMiddleware = applyMiddleware(thunk, reactRouterMiddleware)(createStore);
let store = createStoreWithMiddleware(combineReducers({
    routing: routerReducer
}));
let history = syncHistoryWithStore(hasHistory, store)

require('./style.scss');

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="home_page_container">
        <Navigation />
      </div>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={HomePage} />
    </Router>
  </Provider>,
  document.querySelector('#topContainer')
)
