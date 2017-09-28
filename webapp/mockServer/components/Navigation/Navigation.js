import React from 'react';
import { connectApp } from '../../lib/index';
import './Navigation.scss'

class Navigation extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const { router } = this.props;
    return (
      <div id="navigation">
        <div className="table-row-group">
          <div className="table-cell">
              <span className="navigation-title">MockServer</span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ router: state.router })

export default connectApp(mapStateToProps)(Navigation);
