import constants from '../constants.js';
import request from '../request.js';
import { all } from './posts';
import { keys, methods } from '../apis';

export const selectPost = (id) => (dispatch, getState) => {
  request(keys.postById, { id }).then(data => {
    dispatch({
      type: constants.POST.SELECT,
      data
    })
  })
}

export const updateValue = (key, value) => ({
  type: constants.POST.UPDATE_VALUE,
  key, value
})

export const savePost = (data) => (dispatch, getState) => {
  request(keys.savePost, data).then(data => {
    dispatch(all());
    dispatch({
      type: constants.POST.FINISH_SAVE_POST,
      data
    })
  })
}
