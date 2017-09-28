import React from 'react';
import { connectApp } from '../../lib/index';
import './MockProjects.scss'

class MockProjects extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.mockProject.fetchList();
  }

  render() {
    const { mockProject = {} } = this.props;
    const { list = [] } = mockProject
    return (
      <div className="mock-projects">
        {
        list.map(project => {
          return (
            <div className="mock-project-item" key={ project.id }>
              <div className="item-title strong-text font18">{ project.projectName }</div>
              <div className="item-desc online-text font16"> 项目描述: { project.projectDescribe }</div>
              <div className="item-desc font16"> 项目路径: { project.basePath }</div>
            </div>
          )
        })
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ mockProject: state.mockProject})

export default connectApp(mapStateToProps)(MockProjects);
