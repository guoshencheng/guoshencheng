import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createApp, analysisRouteTree } from './lib/index';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import Navigation from './components/Navigation/Navigation';

//redux actions and reducers
import reducers from './scripts/reducers';
import * as actions from './scripts/actions';

// api routers define
import apis from './scripts/apis.js';

//router components
import Index from './views/Index/index.js';
import CreateProject from './views/CreateProject/CreateProject';
import Project from './views/Project/Project';

import './index.scss';

const routers = {
  createProject: {
    path:'/mockProject/create',
    component: CreateProject
  },
  projectDetail: {
    path: '/mockProject/:id',
    component: Project
  },
  home: {
    path: '/',
    component: Index,
  }
}

const buildRouter = (history) => {
  const _routers = analysisRouteTree(routers);
  const __routers = Object.keys(_routers).map(k => _routers[k]);
  return (
    <ConnectedRouter history={ history }>
      <div className="app-container">
        <Navigation></Navigation>
        <Switch>
        {
          __routers.map(router => {
            return <Route key={ router.path } { ...router }/>
          })
        }
        </Switch>
      </div>
    </ConnectedRouter>
  )
}

const app = createApp({ reducers, routers: buildRouter, actions, apis, auto: true, customThunk: true, prefix: "@gsc-mock-server" });
app.start(document.querySelector('#root'));
