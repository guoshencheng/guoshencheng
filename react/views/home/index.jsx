import React from 'react';
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from '../../scripts/reducer/home';

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(reducer, {

})

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="home_page_container"></div>
    )
  }

}

ReactDOM.render(
  <Provider store={store}>
    <HomePage />
  </Provider>,
  document.querySelector('#topContainer')
)
