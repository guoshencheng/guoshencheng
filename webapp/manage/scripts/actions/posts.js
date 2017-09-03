import request from '../request.js';
import { keys, methods } from '../apis';
import constants from '../constants.js';

export const createEmpty = () => (dispatch, getState) => {
  request(keys.creatEmpty).then(data => {
    console.log(data)
  })
}

export const all = () => (dispatch, getState) => {
  request(keys.allPosts).then(data => {
    dispatch({
      type: constants.POSTS.ALL,
      data: data
    })
  })
}
