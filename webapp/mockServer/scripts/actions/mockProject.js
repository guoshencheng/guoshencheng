export const fetchList = () => ({ apis, actions }) => {
  apis.allMockProjects().then(data => {
    actions.reducerActions.mockProject.FINISH_FETCH_MOCK_PROJECT({ data });
  }).catch(err => {
    console.log(err)
  })
}

export const create = (params) => ({ apis, actions }) => {
  apis.createMockProject(params).then(data => {
    actions.router.push('/mockServer');
  }).catch(err => {
    console.log(err)
  })
}
