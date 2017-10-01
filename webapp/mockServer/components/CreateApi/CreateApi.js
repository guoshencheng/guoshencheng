import React from 'react';
import './CreateApi.scss'

import { connectApp } from '../../lib/index';
import { Row, Col, Form, Select, Input } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

class CreateApi extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { editor } = this;
    console.log(editor)
    window.require.config({ paths: { 'vs': 'javascripts/vs' }});
	  window.require(['vs/editor/editor.main'], function() {
		monaco.editor.create(editor, {
      value: JSON.stringify({
        name: 'guoshencheng',
        a: '12',
        rank: '1000'
      }, null, 2),
			language: 'json',
      theme: "vs-dark",
		});
	});
    // var editor = monaco.editor.create(this.editor, {
		// 	value: [
		// 		'function x() {',
		// 		'\tconsole.log("Hello world!");',
		// 		'}'
		// 	].join('\n'),
		// 	language: 'javascript'
		// });
  }

  render() {
    return (
      <div className="create-api">
        <Row className="container">
          <Col span={ 16 } className="mockjs-template" >
            <div className="editor" ref={ node => this.editor = node }>

            </div>
          </Col>
          <Col span={ 8 } className="create-api-form" >
            <Form className="form">
              <Form.Item>
                <span className="strong-text" > method </span>
                <Select defaultValue={ 'GET' }>
                  <Option value="0">GET</Option>
                  <Option value="1">POST</Option>
                  <Option value="2">PUT</Option>
                  <Option value="3">DELETE</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <span className="strong-text" > URL </span>
                <Input></Input>
              </Form.Item>
              <Form.Item>
                <span className="strong-text" > 描述 </span>
                <TextArea rows={4}></TextArea>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connectApp()(Form.create()(CreateApi));
