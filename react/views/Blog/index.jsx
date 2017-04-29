import React from 'react';
import { connect } from 'react-redux';
import pathToRegexp from 'path-to-regexp';


class Blog extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { location } = this.props;
    let params = pathToRegexp('/blog/:id').exec(location.pathname);
    console.log(params[1]);
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
