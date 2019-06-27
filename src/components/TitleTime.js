import React from 'react';
import {
  View, Image, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import { scale } from '../constants/layouts';
import images from '../constants/images';
import { titleTime } from '../constants/textStyles';

const TitleTime = ({ time }) => (
  <View style={styles.container}>
    <Image
      source={images.clock_icon}
      style={styles.clockIcon}
      resizeMode="contain"
    />
    <Text style={styles.time}>{time}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    width: 10 * scale,
    height: 10 * scale,
  },
  time: {
    ...titleTime,
    marginLeft: 5 * scale,
  },
});

TitleTime.propTypes = {
  time: PropTypes.string.isRequired,
};

export default TitleTime;
