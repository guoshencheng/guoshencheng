import { methods } from '../lib';

export default  {
  createMockProject: {
    path: '/mockServer/api/v1/mockProjects',
    method: methods.post
  },
  updatMockProject: {
    path: params => `/mockServer/api/v1/mockProjects/${params.id}`,
    method: methods.put
  },
  allMockProjects: {
    path: '/mockServer/api/v1/mockProjects',
    method: methods.get
  },
  getMockProject: {
    path: params => `/mockServer/api/v1/mockProjects/${params.id}`,
    method: methods.get
  },
  createMockApi: {
    path: params => `/mockServer/api/v1/mockProjects/${params.projectId}/mockApis`,
    method: methods.post
  },
  updateMockApi: {
    path: params => `/mockServer/api/v1/mockProjects/${params.projectId}/mockApis/${params.id}`,
    method: methods.put
  },
  allMockApis: {
    path: params => `/mockServer/api/v1/mockProjects/${params.projectId}/mockApis`,
    method: methods.get
  },
  getMockApi: {
    path: params => `/mockServer/api/v1/mockProjects/${params.projectId}/mockApis/${params.id}`,
    method: methods.get
  },
}
