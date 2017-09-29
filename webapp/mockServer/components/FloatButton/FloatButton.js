import React from 'react'
import { connectApp } from '../../lib/index';
import './FloatButton.scss';

class FloatButton extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { children, onClick } = this.props;
    return (
      <div className="float-button" onClick={ onClick } >
        <div className="table-row-group">
          <div className="table-cell">
            { children }
          </div>
        </div>
      </div>
    )
  }
}

export default FloatButton;
