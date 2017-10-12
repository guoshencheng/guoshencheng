import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import Posts from './views/Posts.js';
import Tips from './views/Tips';

const CustomRouter = history => (
  <ConnectedRouter history={ history }>
    <div>
      <Switch>
        <Route exact path="/" component={ Posts } />
        <Route exact path="/tips" component={ Tips } />
      </Switch>
    </div>
  </ConnectedRouter>
)

export default CustomRouter;
