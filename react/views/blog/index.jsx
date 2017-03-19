import React from 'react';
import { connect } from 'react-redux';
import Navigation from '../../components/Navigation/index.jsx';

require('./style.scss');

class BlogPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="home_page_container">
        <h1> Blog </h1>
      </div>
    )
  }
}

export default connect()(BlogPage);
