import React from 'react';
import { Text } from 'react-native-paper';
import { Platform } from 'react-native';

var SaluTitle = props => {
  var fontSize = props.style && props.style.fontSize || 20;
  var lineHeight = props.style && props.style.lineHeight || fontSize * 1.3;
  return <Text
    {...props}
    style={{
      fontSize,
      lineHeight,
      fontFamily: 'Lora-Bold',
      fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
      color: '#4d4d4d',
      ...props.style,
    }}>
    {props.children}
  </Text>;
};

export default SaluTitle;