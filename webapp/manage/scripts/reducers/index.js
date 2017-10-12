import { combineReducers } from 'redux';

import posts from './posts.js';
import post from './post.js';
import tips from './tips.js'

export default combineReducers({
  posts, post, tips
})
