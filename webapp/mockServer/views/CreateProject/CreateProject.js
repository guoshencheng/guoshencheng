import React from 'react';
import { connectApp } from '../../lib/index';
import './CreateProject.scss';

class CreateProject extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.form = {}
  }

  onClickCreate() {
    const params = this.form;
    const { actions } = this.props;
    actions.mockProject.create(params)
  }

  onChange(key, e) {
    var input = e.target;
    this.form[key] = input.value;
  }

  render() {
    return (
      <div className="create-project">
        <div className="inner-container">
        <form className="gsc-form">
          <label className="gsc-form-label strong-text">项目名称</label>
          <div className="gsc-form-section">
            <input onChange={this.onChange.bind(this, 'projectName')} type="text" name="projectName" className="project-name"/>
          </div>
          <label className="gsc-form-label strong-text">项目基础URL</label>
          <div className="gsc-form-section">
            <input onChange={ this.onChange.bind(this, 'basePath') } type="text" name="baseUrl" className="project-name"/>
          </div>
          <label className="gsc-form-label strong-text">项目描述</label>
          <div className="gsc-form-section">
            <input onChange={ this.onChange.bind(this, 'projectDescribe') } type="text" name="projectDescribe" className="project-name"/>
          </div>
          <div className="gsc-form-section">
            <div onClick={ this.onClickCreate.bind(this) } className="gsc-form-button green">创建</div>
          </div>
        </form>
        </div>
      </div>
    )
  }
}

export default connectApp()(CreateProject);
