import { Component } from 'react';
import './PostList.scss';
import PostsListItem from './PostsListItem.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { all, createEmpty } from '../../scripts/actions/posts.js';
import { selectPost } from '../../scripts/actions/post.js';

class PostList extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.actions.all()
  }

  onCreatePost() {
    this.props.actions.createEmpty();
  }

  onEditPost(id) {
    const { actions } = this.props;
    actions.selectPost(id)
  }

  render() {
    const { posts = {} } = this.props;
    const data = posts.posts || [];
    return (
      <div className="post-list">
        {
          data.map(item => {
            return (
              <PostsListItem post={ item } key={ item.id } onEditPost={ this.onEditPost.bind(this, item.id) } ></PostsListItem>
            )
          })
        }
        <PostsListItem isPlus onCreate={this.onCreatePost.bind(this) }></PostsListItem>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts
})

const mapActionToProps = (dispatch) => ({
  actions: bindActionCreators({ all, createEmpty, selectPost }, dispatch)
})

export default connect(mapStateToProps, mapActionToProps)(PostList);
