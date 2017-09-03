import { Component } from 'react';
import './InputItem.scss';

class InputItem extends Component {
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
      <div className={["input-item-container", className].join(' ')}>
        <div className="input-item-title">{ title }</div>
        <input { ...this.props } className="" type="text" value={ !!value || value == "" ? value : this.state.value } onChange={ this.onChange.bind(this) } />
        <div className="input-item-extra"> { extra } </div>
      </div>
    )
  }
}

export default InputItem;
