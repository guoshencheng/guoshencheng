import constants from '../constants.js';
import request from '../request.js';
import { keys, methods } from '../apis';

export const selectPost  = (id) => (dispatch, getState) => {
  request(keys.postById, { id }).then(data => {
    dispatch({
      type: constants.POST.SELECT,
      data
    })
  })
}
