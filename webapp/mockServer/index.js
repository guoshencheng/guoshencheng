import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createApp } from './lib/index';

//redux actions and reducers
import reducers from './scripts/reducers';
import * as actions from './scripts/actions';

// api routers define
import apis from './scripts/apis.js';

//router components
import Index from './views/Index/index.js';

import './index.scss';

const routers = {
  home: {
    path: '/',
    component: Index,
  }
}

const app = createApp({ reducers, routers, actions, apis, auto: true, prefix: "@gsc-mock-server" });

app.start(document.querySelector('#root'));
