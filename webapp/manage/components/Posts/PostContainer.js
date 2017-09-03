import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InputItem from '../Common/InputItem.js';
import TextArea from '../Common/TextArea.js';
import './PostContainer.scss'

class PostContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  onSave() {

  }

  render() {
    const { post } = this.props;
    const data = post.post;
    return (
      <div className="post-container">
        <div className="tool-bar">
          <div className="tool-bar-icon-container">
            <div className="contain-icon save-icon post-container-icon"></div>
          </div>
        </div>
        <InputItem className="custom-input-item" title="博客标题" ></InputItem>
        <InputItem className="custom-input-item" title="摘要" ></InputItem>
        <TextArea className="custom-input-item" title="博客内容" rows={ 40 } ></TextArea>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  post: state.post
})

export default connect(mapStateToProps)(PostContainer);
