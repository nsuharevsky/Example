import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { scale } from '../constants/layouts';
import colors from '../constants/colors';

const { orange, white, gray } = colors;

const Progress = ({ active }) => (
  <View style={styles.container}>
    <View style={[styles.bar, active > 0 && styles.active]} />
    <View
      style={[styles.bar, styles.barWithMargin, active > 0.25 && styles.active]}
    />
    <View style={[styles.bar, styles.barWithMargin, active > 0.5 && styles.active]} />
    <View
      style={[styles.bar, styles.barWithMargin, active > 0.75 && styles.active]}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 190 * scale,
    height: 10 * scale,
    borderRadius: 5 * scale,
    backgroundColor: gray,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  bar: {
    width: 47 * scale,
    backgroundColor: white,
  },
  barWithMargin: {
    marginLeft: 1 * scale,
  },
  active: {
    backgroundColor: orange,
  },
});

Progress.propTypes = {
  active: PropTypes.number.isRequired,
};

export default Progress;
