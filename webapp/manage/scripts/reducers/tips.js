import constants from '../constants.js';

const defaultValue = {
  tips: [],
  loading: false
}

export default (state = defaultValue, action) => {
  switch (action.type) {
    case constants.TIPS.ALL:
      return Object.assign({}, state, {
        tips: action.data
      })
    default:
      return state;
  }
}
