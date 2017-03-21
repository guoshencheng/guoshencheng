import React from 'react';
import { connect } from 'react-redux';

require('./style.scss');

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="home_page_container">
        <h1> Home </h1>
      </div>
    )
  }
}

export default connect()(HomePage);
