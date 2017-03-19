import { render } from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import createHistory from 'history/createHashHistory';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import CustomRouter from './router';

let hashHistory = createHistory();
const reactRouterMiddleware = routerMiddleware(hashHistory)
let createStoreWithMiddleware = applyMiddleware(thunk, reactRouterMiddleware)(createStore);
let store = createStoreWithMiddleware(combineReducers({
  routing: routerReducer
}));
let RouterComponent = CustomRouter(hashHistory);

render(
  <Provider store={store}>
    { RouterComponent }
  </Provider>,
  document.querySelector('#topContainer')
)
