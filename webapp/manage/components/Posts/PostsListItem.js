import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createEmpty } from '../../scripts/actions/posts.js';
import classnames from 'classnames';
import './PostsListItem.scss';

class PostsListItem extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { isPlus, onCreate, post, onEditPost } = this.props;
    return (
      <div className={ classnames("posts-list-item", {'plus-item': isPlus })} onClick={ onCreate }>
        {
          isPlus ? '添加博客':
          <div className="post-item-content">
            <div className="post-item-title">{ post.title || "没有标题" }</div>
            <div className="post-item-short">{ post.short || "没有摘要" }</div>
            <div className="tool-bar">
              <div onClick={ onEditPost } className="contain-icon post-item-tool edit-icon"></div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default connect()(PostsListItem);
