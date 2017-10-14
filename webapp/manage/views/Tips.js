import React from 'react';
import { Input, Row, Col, Button, Table, Modal } from 'antd';
import './Tips.scss';
const { confirm } = Modal;
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as tipActions from '../scripts/actions/tips';
const { TextArea } = Input;

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
          <a href="javascript:void(0)" onClick={ () => clicks.onEdit && clicks.onEdit(record.id, record.tipText) } >修改</a>
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

  onTypeTips(event) {
    const { target } = event;
    const { value } = target;
    this.tip = value;
  }

  onDelete(id) {
    const { actions } = this.props;
    actions.deleteTip(id);
  }


  onEdit(id, value) {
    const { actions } = this.props;
    let tip = value;
    const onChange = (event) => {
      const { target } = event;
      const { value } = target;
      tip = value;
    }
    console.log(id)
    const title = id ? '更新tip' : "新建tip";
    confirm({
      title,
      content: (
        <TextArea className="tip-input" autosize={ false } rows={ 5 } defaultValue={ tip } onChange={ onChange } placeholder={ title } ></TextArea>
      ),
      onOk() {
        if (id) {
          actions.updateTip(id, tip)
        } else {
          actions.create(tip)
        }
      },
      onCancel() {},
    });
  }

  render() {
    const { tips } = this.props;
    return (
      <div className="tips-container">
        <div className="container">
          <Row>
            <Button onClick={ this.onEdit.bind(this, false, "") } type="primary">添加</Button>
          </Row>
          <Table rowKey="id" className="tips-table" columns={buildColumns({
            onDelete: this.onDelete.bind(this),
            onEdit: this.onEdit.bind(this)
           })} dataSource={tips} />
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
