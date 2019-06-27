import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../constants/colors';
import { scale } from '../constants/layouts';

const EmptyPeriod = ({ period }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{period}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 10 * scale,
  },
  text: {
    fontFamily: 'CarosSoftMedium',
    fontSize: 12 * scale,
    color: colors.grayDate,
    opacity: 0.5,
  },
});

EmptyPeriod.propTypes = {
  period: PropTypes.string.isRequired,
};

export default EmptyPeriod;
