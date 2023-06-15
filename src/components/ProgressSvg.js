import React from 'react';
import {VictoryPie, VictoryTooltip} from 'victory-native';
import colors from '../utils/colors';
import {View} from 'react-native';

const SemiCircleProgressBar = ({percentage}) => {
  const data = [
    {x: 'Progress', y: percentage},
    {x: 'Remaining', y: 100 - percentage},
  ];
  return (
    <View>
      <VictoryPie
        data={data}
        width={400}
        height={400}
        innerRadius={135}
        labels={({datum}) => datum.y}
        style={{
          data: {
            fill: ({datum}) =>
              datum.x === 'Progress' ? colors.teal : colors.lightGray,
          },
        }}
        startAngle={-90}
        endAngle={90}
        labelComponent={<></>}
        />
    </View>
  );
};

export default SemiCircleProgressBar;
