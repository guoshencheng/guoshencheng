import React from 'react';
import { connect } from 'react-redux';

class Blog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="blog">
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapActionToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapActionToProps)(Blog);
