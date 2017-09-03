import { combineReducers } from 'redux';

import posts from './posts.js';
import post from './post.js';

export default combineReducers({
  posts, post
})
