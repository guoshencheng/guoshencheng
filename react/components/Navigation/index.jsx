import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

require('./style.scss');

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="navigation" >
      <Link replace to="/" id="navigation_title">Century Guo</Link>
      <span id="navigation_items">
        <Link replace to="/" className="navigation_item selected">Home</Link>
        <Link replace to="/blog" className="navigation_item">Blog</Link>
      </span>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
};

let NavigationApp = connect(mapStateToProps)(Navigation);

export default NavigationApp;

