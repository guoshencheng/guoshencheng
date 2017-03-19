import { render } from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import createHistory from 'history/createHashHistory';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import CustomRouter from './router';

let hasHistory = createHistory();
const reactRouterMiddleware = routerMiddleware(hasHistory)
let createStoreWithMiddleware = applyMiddleware(thunk, reactRouterMiddleware)(createStore);
let store = createStoreWithMiddleware(combineReducers({
  routing: routerReducer
}));
let customRouter = CustomRouter(store, hasHistory);

render(
  <Provider store={store}>
    { customRouter }
  </Provider>,
  document.querySelector('#topContainer')
)
