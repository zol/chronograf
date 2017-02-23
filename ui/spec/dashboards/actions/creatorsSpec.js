import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

import * as actions from 'src/dashboards/actions'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('Dashboard actions', () => {
  it('should create an action to load dashboards', () => {
    const dashboards = []
    const dashboardID = 1
    const expectedAction = {
      type: 'LOAD_DASHBOARDS',
      payload: {
        dashboards,
        dashboardID,
      },
    }

    expect(actions.loadDashboards(dashboards, dashboardID)).to.deep.equal(expectedAction)
  })
})

describe('Dashboard async actions', () => {

  afterEach(() => {
    nock.cleanAll()
  })

  it('creates LOAD_DASHBOARDS when getting the dashboards', () => {
    const dashboards = [{
      id: 1,
      cells: [],
      name: "db1",
      links: {
        self: "/chronograf/v1/dashboards/1"
      }
    }]

    nock('http://localhost:8888')
      .get('/chronograf/v1/dashboards')
      .reply(200, {data: {dashboards}})

    const expectedActions = [
      {type: 'LOAD_DASHBOARDS', payload: {dashboards, dashboardID: 1}}
    ]

    const store = mockStore({})

    return store.dispatch(actions.getDashboards())
      .then(() => { // return of async actions
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
  })
})
