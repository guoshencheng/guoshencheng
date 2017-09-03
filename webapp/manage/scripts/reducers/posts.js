import constants from '../constants.js';

const defaultValue = {
  posts: [],
  loading: false
}

export default (state = defaultValue, action) => {
  switch (action.type) {
    case constants.POSTS.ALL:
      return Object.assign({}, state, {
        posts: action.data
      })
    default:
      return state;
  }
}
