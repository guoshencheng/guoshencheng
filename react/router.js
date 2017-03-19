/**
 * Created by guoshencheng on 19/03/2017.
 */
import { Route, Switch } from 'react-router-dom';
import Home from './views/home/index.jsx';
import Blog from './views/blog/index.jsx';
import Navigation from './components/Navigation/index.jsx';
import { ConnectedRouter } from 'react-router-redux'

var CustomRouter = (history) => {
  return  (
    <ConnectedRouter history={history}>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/blog" component={Blog}/>
          <Route path="/blog/:id" component={Home}/>
          <Route component={Home}/>
        </Switch>
      </div>
    </ConnectedRouter>
  )
};

export default CustomRouter;