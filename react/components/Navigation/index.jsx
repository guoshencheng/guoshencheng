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
      <Link to="/" id="navigation_title">Century Guo</Link>
      <span id="navigation_items">
        <Link to="/" className="navigation_item selected">Home</Link>
        <Link to="/blog" className="navigation_item">Blog</Link>
      </span>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
  }
};

let NavigationApp = connect(mapStateToProps)(Navigation);

export default NavigationApp;

