import React from 'react';
import { connect } from 'react-redux';
import TextField from '../../components/OrangeUI/TextField/index.jsx';

import './style.scss'

class Create extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="create">
        <div className="center-container">
          <TextField className="custom-textfield" placeholder="Enter Blog Title"></TextField>         
          <TextField className="custom-textfield" placeholder="Enter Blog Description"></TextField>         
          <TextField className="custom-textfield" placeholder="Enter Blog Description"></TextField>         
        </div>
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

export default connect(mapStateToProps, mapActionToProps)(Create);

