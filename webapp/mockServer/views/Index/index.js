import { Component } from 'react';
import { connectApp } from '../../lib/index';
import MockProjects from '../../components/MockProjects/MockProjects'
import './index.scss';

class Index extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <div className="index-page">
        <MockProjects></MockProjects>
      </div>
    )
  }
}

export default Index;
