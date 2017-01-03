import React, {PropTypes} from 'react';
import selectStatement from 'src/chronograf/utils/influxql/select';
import AutoRefresh from 'shared/components/AutoRefresh';
import LineGraph from 'shared/components/LineGraph';
const RefreshingLineGraph = AutoRefresh(LineGraph);
import {proxy} from 'utils/queryUrlGenerator';
import _ from 'lodash';

export const RuleGraph = React.createClass({
  propTypes: {
    source: PropTypes.shape({
      links: PropTypes.shape({
        proxy: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    query: PropTypes.shape({}).isRequired,
    rule: PropTypes.shape({}).isRequired,
    timeRange: PropTypes.shape({}).isRequired,
  },

  render() {
    return (
      <div className="rule-builder--graph">
        {this.renderGraph()}
      </div>
    );
  },

  renderGraph() {
    const {query, source, timeRange} = this.props;
    const autoRefreshMs = 30000;
    const queryText = selectStatement({lower: timeRange.queryValue}, query);
    const queries = [{host: source.links.proxy, text: queryText}];
    const kapacitorLineColors = ["#4ED8A0"];

    if (!queryText) {
      return (
        <div className="rule-preview--graph-empty">
          <p>Select a <strong>Metric</strong> to preview on a graph</p>
        </div>
      );
    }

    return (
      <RefreshingLineGraph
        queries={queries}
        autoRefresh={autoRefreshMs}
        underlayCallback={this.createUnderlayCallback()}
        isGraphFilled={false}
        overrideLineColors={kapacitorLineColors}
      />
    );
  },

  createUnderlayCallback() {
    const {rule, source} = this.props;

    return (data) => async (canvas, area, dygraph) => {
      if (rule.trigger === 'deadman' || rule.values.value === '') {
        return;
      }

      let series;

      if (rule.trigger === 'relative') {
        try {
          const result = await proxy({
            source: source.links.proxy,
            query: `SELECT mean("usage_idle") AS "mean_usage_idle" FROM "telegraf"."autogen"."cpu" WHERE time > ${dygraph.getValue(0, 0)} - ${rule.values.shift}`,
            db: "chronograf",
          });
          series = _.get(result, ['data', 'results', '0', 'series'], []);
          console.log(result);
        }
        catch (error) {
          console.error(error);
        }
      }

      console.log(series)

      console.log(area)
      console.log(dygraph.getValue(0, 0))
      const bleghdata = data[0].response.results[0].series[0]
      console.log(rule.values.shift)
      // const interval = moment.duration(rule.values.shift)
      const range = dygraph.xAxisRange()
      // console.log(interval.as('seconds'))
      console.log(range[1] - range[0])
      console.log('range', range)

      const theOnePercent = 0.01;
      let highlightStart = 0;
      let highlightEnd = 0;

      switch (rule.values.operator) {
        case 'equal to or greater':
        case 'greater than': {
          highlightStart = rule.values.value;
          highlightEnd = dygraph.yAxisRange()[1];
          break;
        }

        case 'equal to or less than':
        case 'less than': {
          highlightStart = dygraph.yAxisRange()[0];
          highlightEnd = rule.values.value;
          break;
        }

        case 'not equal to':
        case 'equal to': {
          const width = (theOnePercent) * (dygraph.yAxisRange()[1] - dygraph.yAxisRange()[0]);
          highlightStart = +rule.values.value - width;
          highlightEnd = +rule.values.value + width;
          break;
        }
      }

      const bottom = dygraph.toDomYCoord(highlightStart);
      const top = dygraph.toDomYCoord(highlightEnd);

      canvas.fillStyle = 'rgba(78,216,160,0.3)';
      canvas.fillRect(area.x, top, area.w, bottom - top);
    };
  },
});

export default RuleGraph;
