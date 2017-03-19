import React from 'react';
import { connect } from 'react-redux';
import Navigation from '../../components/Navigation/index.jsx';

require('./style.scss');

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="home_page_container">
        <Navigation />
      </div>
    )
  }
}

export default connect()(HomePage);
