import React from 'react';
import {VictoryPie} from 'victory-native';
import colors from '../utils/colors';

const SemiCircleProgressBar = ({percentage}) => {
    const data = [
      {x: 'Progress', y: percentage},
      {x: 'Remaining', y: 100 - percentage},
    ];
    return (
      <VictoryPie
        data={data}
        width={400}
        height={400}
        innerRadius={135}
        labels={() => null}
        style={{
          data: {
            fill: ({datum}) =>
              datum.x === 'Progress' ? colors.teal : colors.lightGray,
          },
        }}
        startAngle={-90}
        endAngle={90}
      />
    );
  };
  
  export default SemiCircleProgressBar;