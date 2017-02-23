import AJAX from 'utils/ajax'
import fetch from 'isomorphic-fetch'

// export function getDashboards() {
//   return AJAX({
//     method: 'GET',
//     url: `/chronograf/v1/dashboards`,
//   })
// }
//

export function getDashboards() {
  console.log('basepath: ', window.basepath);
  return fetch(`http://localhost:8888/chronograf/v1/dashboards`)
    .then(resp => resp.json())
}

export function updateDashboard(dashboard) {
  return AJAX({
    method: 'PUT',
    url: dashboard.links.self,
    data: dashboard,
  })
}
