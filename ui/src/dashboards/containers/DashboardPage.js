import React, {PropTypes} from 'react';
import _ from 'lodash';

import LayoutRenderer from 'shared/components/LayoutRenderer';
import DashboardHeader from 'src/dashboards/components/Header';
import timeRanges from 'hson!../../shared/data/timeRanges.hson';

import {getDashboards} from '../apis';
import {getSource} from 'shared/apis';

const DashboardPage = React.createClass({
  propTypes: {
    params: PropTypes.shape({
      sourceID: PropTypes.string.isRequired,
      dashboardID: PropTypes.string.isRequired,
    }).isRequired,
  },

  getInitialState() {
    const fifteenMinutesIndex = 1;

    return {
      dashboards: [],
      timeRange: timeRanges[fifteenMinutesIndex],
      dashboard: null,
    };
  },

  componentDidMount() {
    const {sourceID, dashboardID} = this.props.params;

    getDashboards().then(({data}) => {
      getSource(sourceID).then(({data: source}) => {
        const dashboards = data.dashboards;
        const dashboard = _.find(dashboards, (d) => d.id.toString() === dashboardID);

        this.setState({
          dashboards,
          dashboard,
          source,
        });
      });
    });
  },

  componentDidUpdate(prevProps) {
    const {dashboardID} = this.props.params;
    const {dashboards} = this.state;

    if (prevProps.params.dashboardID === dashboardID) {
      return;
    }

    this.setState({
      dashboard: _.find(dashboards, (d) => d.id.toString() === dashboardID),
    })
  },

  renderDashboard(dashboard) {
    const autoRefreshMs = 15000;
    const {timeRange} = this.state;
    const {source} = this.state;

    const cellWidth = 4;
    const cellHeight = 4;

    const cells = dashboard.cells.map((cell, i) => {
      const dashboardCell = Object.assign(cell, {
        w: cellWidth,
        h: cellHeight,
        queries: cell.queries,
        i: i.toString(),
      });

      dashboardCell.queries.forEach((q) => {
        q.text = q.query;
        q.database = source.telegraf;
      });
      return dashboardCell;
    });

    return (
      <LayoutRenderer
        timeRange={timeRange}
        cells={cells}
        autoRefreshMs={autoRefreshMs}
        source={source.links.proxy}
      />
    );
  },

  handleChooseTimeRange({lower}) {
    const timeRange = timeRanges.find((range) => range.queryValue === lower);
    this.setState({timeRange});
  },

  render() {
    const {params} = this.props;
    const {dashboards, timeRange, dashboard} = this.state;

    return (
      <div className="page">
        <DashboardHeader
          dashboards={dashboards}
          name={dashboard && dashboard.name || ''}
          onChooseTimeRange={this.handleChooseTimeRange}
          timeRange={timeRange}
          sourceID={params.sourceID}
        />
        <div className="page-contents">
          <div className="container-fluid full-width">
            { dashboard ? this.renderDashboard(dashboard) : '' }
          </div>
        </div>
      </div>
    );
  },
});

export default DashboardPage;
