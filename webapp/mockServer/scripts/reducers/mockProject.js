
export default {
  reducers: {
    FINISH_FETCH_MOCK_PROJECT: (state, action) => Object.assign({}, state, { list: action.data }),
    FINISH_FETCH_DETAIL: (state, action) => Object.assign({}, state, { detail: action.data })
  },
  defaultState: {
    list: [],
    detail: {}
  }
}
