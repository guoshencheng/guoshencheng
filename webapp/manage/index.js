require('./index.scss');
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import createHistory from 'history/createHashHistory';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './scripts/reducers';
const history = createHistory();
let middlewares = [ thunk, routerMiddleware(history) ];
const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)));
import CustomRouter from './router.js';
import Posts from './views/Posts.js';

const RouterComponent = CustomRouter(history)

render(
  <Provider store={ store }>
    { RouterComponent }
  </Provider>,
  document.querySelector("#container")
)
