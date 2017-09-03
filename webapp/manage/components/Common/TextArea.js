import { Component } from 'react';
import './TextArea.scss';

class TextArea extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: ""
    }
  }

  onChange(e) {
    const { onChange } = this.props;
    const value = e.target.value;
    this.setState({
      value
    })
    onChange && onChange(value);
  }

  render() {
    const { title, extra, value, className } = this.props;
    return (
      <div className={ ["textarea-container", className].join(" ")}>
        <div className="textarea-title">{ title }</div>
        <textarea { ...this.props } className="" onChange={ this.onChange.bind(this) } ></textarea>
        <div className="textarea-extra">{ extra }</div>
      </div>
    )
  }
}

export default TextArea;
