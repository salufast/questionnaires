import React from 'react';
import {View, StyleSheet} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import colors from '../utils/colors';

/**
 * Props for the loader
 * @param show
 */

export const Loader = ({show}) => {
  if (!show) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.greenCorrect} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
