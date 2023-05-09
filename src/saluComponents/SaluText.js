import React from 'react';
import { Text } from 'react-native-paper';
import { Platform } from 'react-native';

var SaluText = props => {
  var { style } = props;
  if (style?.fontWeight === 'bold') {
    style.fontFamily = Platform.OS === 'ios' ? 'Open Sans' : 'OpenSans-Bold';
    style.fontWeight = Platform.OS === 'ios' ? '700' : 'normal';
  } else if (style?.fontWeight === 'bold-italic') {
    style.fontFamily = 'OpenSans-BoldItalic';
    style.fontWeight = 'normal';
  };

  var fontSize = style?.fontSize || 16;
  var lineHeight = style?.lineHeight || fontSize * 1.5;

  const textStyle = {
    fontSize,
    lineHeight,
    color: '#4d4d4d',
  };

  return <Text
    {...props}
    style={[textStyle, style]}>
    {props.children}
  </Text>;
};

export default SaluText;