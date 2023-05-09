import React from 'react';
import { Button } from 'react-native-paper';

var SaluButton = props => <Button
  mode="contained"
  {...props}
  onPress={!props.loading && props.onPress}
  uppercase
  style={{
    elevation: 0,
    borderRadius: 10,
    borderColor: 'gray',
    backgroundColor: '#008888',
    ...props.style,
  }}
/>;

export default React.memo(SaluButton);
