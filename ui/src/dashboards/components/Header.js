import React, {PropTypes} from 'react';
import ReactTooltip from 'react-tooltip';
import {Link} from 'react-router';
import TimeRangeDropdown from '../../shared/components/TimeRangeDropdown';

const {
  arrayOf,
  func,
  number,
  shape,
  string,
} = PropTypes;

const graphTips = '<p><code>Click + Drag</code> Zoom in (X or Y)</p><p><code>Shift + Click</code> Pan Graph Window</p><p><code>Double Click</code> Reset Graph Window</p>';

const DashboardHeader = ({
  dashboards,
  name,
  onChooseTimeRange,
  timeRange,
  sourceID,
}) => (
  <div className="page-header full-width">
    <div className="page-header__container">
      <div className="page-header__left">
        <div className="dropdown page-header-dropdown">
          <button className="dropdown-toggle" type="button" data-toggle="dropdown">
            <span className="button-text">{name}</span>
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            {(dashboards).map((d, i) => {
              return (
                <li key={i}>
                  <Link to={`/sources/${sourceID}/dashboards/${d.id}`} className="role-option">
                    {d.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="page-header__right">
        <div className="btn btn-info btn-sm" data-for="graph-tips-tooltip" data-tip={graphTips}>
          <span className="icon heart"></span>
          Graph Tips
        </div>
        <ReactTooltip id="graph-tips-tooltip" effect="solid" html={true} offset={{top: 2}} place="bottom" class="influx-tooltip place-bottom" />
        <TimeRangeDropdown onChooseTimeRange={onChooseTimeRange} selected={timeRange.inputValue} />
      </div>
    </div>
  </div>
);

DashboardHeader.propTypes = {
  dashboards: arrayOf(shape({
    id: number,
  })).isRequired,
  name: string.isRequired,
  onChooseTimeRange: func.isRequired,
  timeRange: shape({
    inputValue: string,
  }),
  sourceID: string,
};

export default DashboardHeader;
