import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { scale } from '../constants/layouts';
import colors from '../constants/colors';
import { sectionItemTitle } from '../constants/textStyles';
import TitleTime from './TitleTime';

const Reminder = ({ title, time, titleColor }) => (
  <View style={styles.container}>
    <View style={styles.title}>
      <Text style={[styles.titleText, { color: titleColor }]}>{title}</Text>
      <View style={styles.titleRight}>
        <TitleTime time={time} />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    height: 48 * scale,
    width: 270 * scale,
    borderRadius: 5 * scale,
    paddingTop: 17 * scale,
    paddingHorizontal: 20 * scale,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  titleText: {
    ...sectionItemTitle,
    width: 145 * scale,
  },
  titleRight: {
    marginLeft: 44 * scale,
    marginTop: 1 * scale,
  },
});

Reminder.propTypes = {
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  titleColor: PropTypes.string.isRequired,
};

export default Reminder;
