import { Component } from 'react';
import { connectApp } from '../../lib/index';
import MockProjects from '../../components/MockProjects/MockProjects'
import FloatButton from '../../components/FloatButton/FloatButton'
import './index.scss';

class Index extends Component {
  constructor(props, context) {
    super(props, context);
  }

  onClickFloatButton() {
    const { actions } = this.props;
    actions.router.push('/mockProject/create');
  }

  render() {
    return (
      <div className="index-page">
        <MockProjects></MockProjects>
        <FloatButton>
          <div className="add-icon" onClick={ this.onClickFloatButton.bind(this) } ></div>
        </FloatButton>
      </div>
    )
  }
}

export default connectApp()(Index);
