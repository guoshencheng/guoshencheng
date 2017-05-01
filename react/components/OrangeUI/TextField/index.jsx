import { Component } from 'react';
import './style.scss';

class TextField extends Component {
  constructor(props, context) {
    super(props, context)
  }
  render() {
    let { className, placeholder} = this.props;
    return (
      <div className={`${className} orange-textfield-container`}>
        <input placeholder={placeholder} className="orange-textfield" type="text" />
        <div className="animate-label"></div>
      </div>
    ) 
  }
}
  
export default TextField;

