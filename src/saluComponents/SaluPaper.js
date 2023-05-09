import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';

const SaluPaper = ({ children, ...props }) => <Surface
  style={[styles.surface, props.style]}>
  {children}
</Surface>;

export default SaluPaper;

const styles = StyleSheet.create({
  surface: {
    elevation: 2,
    borderRadius: 5,
  },
});
