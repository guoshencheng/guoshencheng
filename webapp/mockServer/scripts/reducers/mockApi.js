const defaultState = {
  list: [],
  detail: {}
}

export default {
  reducers: {
    INIT_LIST: (state) => Object.assign({}, state, defaultState.list),
    INIT_DETAIL: (state) => Object.assign({}, state, defaultState.detail),
    FINISH_FETCH_MOCK_API: (state, action) => Object.assign({}, state, { list: action.data } )
  },
  defaultState
}
