import React from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';

import {spyActions} from './shared'

// Stubs
import kapacitor from './stubs/kapacitor';
import source from './stubs/source';
import rule from './stubs/rule';
import query from './stubs/query';
import queryConfigs from './stubs/queryConfigs';

// Actions for Spies
import * as kapacitorActions from 'src/kapacitor/actions/view'
import * as queryActions from 'src/chronograf/actions/view';

// ValuesSection
import ValuesSection from 'src/kapacitor/components/ValuesSection';

const valuesSection = (trigger, values) => (
  <div className="rule-builder">
    <ValuesSection
      rule={rule({
        trigger,
        values,
      })}
      query={query()}
      onChooseTrigger={action('chooseTrigger')}
      onUpdateValues={action('updateRuleValues')}
    />
  </div>
);

storiesOf('ValuesSection', module)
  .add('Threshold', () => (
    valuesSection('threshold', {
      operator: 'less than',
      rangeOperator: 'greater than',
      value: '10',
      rangeValue: '20',
    })
  ))
  .add('Threshold within Range', () => (
    valuesSection('threshold', {
      operator: 'within range',
      rangeOperator: 'greater than',
      value: '10',
      rangeValue: '20',
    })
  ))
  .add('Relative', () => (
    valuesSection('relative', {
      change: 'change',
      operator: 'greater than',
      shift: '1m',
      value: '10',
    })
  ))
  .add('Deadman', () => (
    valuesSection('deadman', {
      period: '10m',
    })
  ));

// RuleGraph
import RuleGraph from 'src/kapacitor/components/RuleGraph';

const timeRange = {
  defaultGroupBy: '1m',
  seconds: 900,
  inputValue: 'Past 15 minutes',
  queryValue: 'now() - 15m',
  menuOption: 'Past 15 minute',
}

// Requires a fixed width to render
const ruleGraph = (trigger, values) => (
  <div style={{width: '800px'}}>
    <RuleGraph timeRange={timeRange} source={source()} query={query()} rule={rule({
      trigger,
      values,
    })} />
  </div>
)

storiesOf('RuleGraph', module)
  .add('Threshold', () => (
    ruleGraph('threshold', {
      operator: 'less than',
      rangeOperator: 'greater than',
      value: '98',
      rangeValue: '97.5',
    })
  ))
  .add('Threshold within Range', () => (
    ruleGraph('threshold', {
      operator: 'within range',
      rangeOperator: 'greater than',
      value: '98',
      rangeValue: '97.5',
    })
  ))
  .add('Relative', () => (
    ruleGraph('relative', {
      change: 'change',
      operator: 'greater than',
      shift: '1m',
      value: '0.5',
    })
  ))
  .add('Deadman', () => (
    ruleGraph('deadman', {
      period: '10m',
    })
  ));

// KapacitorRule
import KapacitorRule from 'src/kapacitor/components/KapacitorRule';

storiesOf('KapacitorRule', module)
  .add('Threshold', () => (
    <div className="chronograf-root">
      <KapacitorRule
        source={source()}
        rule={rule({
          trigger: 'threshold',
        })}
        query={query()}
        queryConfigs={queryConfigs()}
        kapacitor={kapacitor()}
        queryActions={spyActions(queryActions)}
        kapacitorActions={spyActions(kapacitorActions)}
        addFlashMessage={action('addFlashMessage')}
        enabledAlerts={['slack']}
        isEditing={true}
        router={{
          push: action('route'),
        }}
      />
    </div>
  ));
