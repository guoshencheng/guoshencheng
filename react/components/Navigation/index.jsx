import { Component } from 'react';
import { connect } from 'react-redux';

require('./style.scss');

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="navigation" >
      <a href="/" id="navigation_title">Century Guo</a>
      <span id="navigation_items">
        <span className="navigation_item selected">Home</span>
        <span className="navigation_item">Blog</span>
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

