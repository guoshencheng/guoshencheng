import React from 'react';
import { connect } from 'react-redux';

class blogs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="blogs">
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

export default connect(mapStateToProps, mapActionToProps)(blogs);
