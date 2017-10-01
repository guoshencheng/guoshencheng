import React from 'react';
import { connectApp } from '../../lib/index';
import pathToRegExp from 'path-to-regexp';
import MockApis from '../../components/MockApis/MockApis';
import './Project.scss'
import { Button, Row } from 'antd';
import CreateApi from '../../components/CreateApi/CreateApi';


class Project extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { actions, router } = this.props;
    const { location = {} } = router;
    const { pathname } = location;
    const test = pathToRegExp('/mockProject/:id');
    if (test.test(pathname)) {
      actions.reducerActions.mockApi.INIT_LIST();
      const projectId = test.exec(pathname)[1];
      actions.mockProject.detail(projectId);
      actions.mockApi.fetchList(projectId, )
    }
  }

  render() {
    const { project, apis } = this.props;
    return (
      <div className="project-detail">
        <Row>
          <Button type="primary">+ 创建接口</Button>
        </Row>
        <MockApis></MockApis>
        <CreateApi></CreateApi>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ router: state.router, project: state.mockProject.detail, apis: state.mockApi.list  })

export default connectApp(mapStateToProps)(Project);
