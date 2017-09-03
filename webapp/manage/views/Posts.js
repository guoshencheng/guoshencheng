import { Component } from 'react';
import PostList from '../components/Posts/PostList.js';
import PostContainer from '../components/Posts/PostContainer.js'
import './Posts.scss';

class Posts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="posts">
        <PostList></PostList>
        <PostContainer></PostContainer>
      </div>
    )
  }
}

export default Posts;
