/**
 * Created by guoshencheng on 19/03/2017.
 */
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route } from 'react-router';
import Home from './views/home/index.jsx';

var CustomRouter = (store, history) => {
  history = syncHistoryWithStore(history, store)
  return (
    <Router history={history} >
        <Route path="/" component={Home} />
    </Router>
  )
};

export default CustomRouter;