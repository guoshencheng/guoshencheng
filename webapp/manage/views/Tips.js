import React from 'react';
import { Input, Row, Col, Button, Table, Modal } from 'antd';
import './Tips.scss';
const { confirm } = Modal;
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as tipActions from '../scripts/actions/tips';

const buildColumns = (clicks) => {
  return [{
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: '内容',
    dataIndex: 'tipText',
    key: 'tipText',
  }, {
    title: '操作',
    key: 'action',
    render: (record) => {
      return (
        <span>
          <a href="javascript:void(0)" onClick={ () => clicks.onEdit && clicks.onEdit(record.id) } >修改</a>
          <span className="ant-divider" />
          <a href="javascript:void(0)" onClick={ () => clicks.onDelete && clicks.onDelete(record.id) } >删除</a>
        </span>
      )
    }
  }];
}

class Tips extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    const { actions } = this.props;
    actions.all();
  }

  onCreate() {
    if (this.tip) {
      const { actions } = this.props;
      actions.create(this.tip);
    }
  }
  onTypeTips(event) {
    const { target } = event;
    const { value } = target;
    this.tip = value;
  }

  render() {
    const { tips } = this.props;
    return (
      <div className="tips-container">
        <div className="container">
          <Row>
            <Col span={ 12 }>
              <Input ref="tip-input" onChange={ this.onTypeTips.bind(this) } placeholder="添加Tips" />
            </Col>
            <Col offset={ 2 } span={ 4 }>
              <Button onClick={ this.onCreate.bind(this) } type="primary">添加</Button>
            </Col>
          </Row>
          <Table rowKey="id" className="tips-table" columns={buildColumns()} dataSource={tips} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tips: state.tips.tips
  }
}

const mapActionToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Object.assign({}, tipActions), dispatch)
  }
}

export default connect(mapStateToProps, mapActionToProps)(Tips);
