export default {
  reducers: {
    FINISH_FETCH_MOCK_API: (state, action) => Object.assign({}, state, { list: action.data } )
  },
  defaultState: {
    list: []
  }
}
