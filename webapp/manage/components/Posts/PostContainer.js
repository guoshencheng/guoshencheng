import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InputItem from '../Common/InputItem.js';
import TextArea from '../Common/TextArea.js';
import { updateValue, savePost, changeStatus } from '../../scripts/actions/post.js';
import './PostContainer.scss'

class PostContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  onSave() {
    const { actions } = this.props;
    const { post } = this.props.post;
    if (!!post.id) {
      actions.savePost(post)
    }
  }

  onChangeValue(key, value) {
    const { actions } = this.props;
    actions.updateValue(key, value);
  }

  changePostStatus() {
    const { post, actions } = this.props;
    const data = post.post;
    const status = data.status == 0 ? 1 : 0;
    actions.changeStatus(data.id, status);
  }

  render() {
    const { post } = this.props;
    const data = post.post;
    return (
      <div className="post-container">
        <div className="tool-bar">
          <div className="tool-bar-icon-container">
            <div onClick={ this.onSave.bind(this) } className="contain-icon save-icon post-container-icon"></div>
            {
              !!data.id &&
              <div onClick={ this.changePostStatus.bind(this) } className="post-status"> { data.status == 0 ? "上线" : "下线" } </div>
            }
          </div>
        </div>
        {
          !!data.id ?
          <div>
            <InputItem value={ data.title } onChange={ this.onChangeValue.bind(this, 'title') } className="custom-input-item" title="博客标题" ></InputItem>
            <InputItem value={ data.short } className="custom-input-item" onChange={ this.onChangeValue.bind(this, 'short') } title="摘要" ></InputItem>
            <TextArea value={ data.markdown } className="custom-input-item" onChange={ this.onChangeValue.bind(this, 'markdown') } title="博客内容" rows={ 40 } ></TextArea>
          </div>:
          <div>
            请选择文章
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  post: state.post
})

const mapActionToProps = (dispatch) => ({
  actions: bindActionCreators({
    updateValue, savePost, changeStatus
  }, dispatch)
})

export default connect(mapStateToProps, mapActionToProps)(PostContainer);
