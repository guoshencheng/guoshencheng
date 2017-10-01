import React from 'react';
import './MockApis.scss'
import { connectApp } from '../../lib/index';
import { Table, Icon } from 'antd';

const columns = (props = {}) => {
  const { onEdit, onDelete } = props;
  return [{
    title: 'id',
    dataIndex: "id",
    key: "id",
  }, {
    title: 'Method',
    dataIndex: "apiMethod",
    key: "apiMethod",
    render: (value) => {
      const methods = ['GET', 'POST', 'PUT', 'DELETE'];
      return methods[value] || 'UNKNOW';
    }
  }, {
    title: 'URL',
    dataIndex: "apiPath",
    key: "apiPath",
  }, {
    title: '描述',
    dataIndex: "apiDescribe",
    key: "apiDescribe",
  }, {
    title: '操作',
    key: "operation",
    render: (text, record) => {
      return (
        <span>
          <Icon type="edit"></Icon>
          <span className="ant-divider" ></span>
          <Icon type="delete"></Icon>
        </span>
      )
    }
  }]
}

class MockApis extends React.Component {
  constructor(props, context) {
    super(props, context)
  }
  render() {
    const { apis } = this.props;
    return (
      <div className="mock-apis">
        <Table className="gsc" rowKey='id' columns={ columns() } dataSource={apis} ></Table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  apis: state.mockApi.list
})

export default connectApp(mapStateToProps)(MockApis);
