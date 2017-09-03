import { Component } from 'react';
import './TextArea.scss';

class TextArea extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const { title, extra, value } = this.props;
    return (
      <div className="textarea-container">
        <div className="textarea-title">{ title }</div>
        <textarea { ...this.props } ></textarea>
        <div className="textarea-extra">{ extra }</div>
      </div>
    )
  }
}

export default TextArea;
