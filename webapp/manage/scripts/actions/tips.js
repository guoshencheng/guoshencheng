import constants from '../constants.js';
import request from '../request.js';
import { keys, methods } from '../apis';

export const create = (tipText) => (dispatch, getState) => {
  request(keys.createTip, { tipText }).then(data => {
    dispatch(all());
  })
}

export const all = () => (dispatch, getState) => {
  request(keys.allTips).then(data => {
    dispatch({
      type: constants.TIPS.ALL,
      data
    })
  })
}

export const deleteTip = (id) => (dispatch, getState) => {
  request(keys.deleteTip, { id }).then(data => {
    dispatch(all());
  })
}

export const updateTip = (id, tipText) => (dispatch, getState) => {
  request(keys.updateTip, { id, tipText }).then(data => {
    dispatch(all());
  })
}
