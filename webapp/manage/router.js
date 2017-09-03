import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import Posts from './views/Posts.js';

const CustomRouter = history => (
  <ConnectedRouter history={ history }>
    <div>
      <Switch>
        <Route exact path="/" component={ Posts } />
      </Switch>
    </div>
  </ConnectedRouter>
)

export default CustomRouter;
