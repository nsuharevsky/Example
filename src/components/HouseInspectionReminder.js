import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import { scale } from '../constants/layouts';
import colors from '../constants/colors';
import { sectionItemTitle } from '../constants/textStyles';
import TitleTime from './TitleTime';

const btnText = 'Message Landlord';

const HouseInspectionReminder = ({
  title, address, time, titleColor,
}) => (
  <View style={styles.container}>
    <View style={styles.title}>
      <Text style={[styles.titleText, { color: titleColor }]}>{title}</Text>
      <View style={styles.titleRight}>
        <TitleTime time={time} />
      </View>
    </View>
    <Text style={styles.description}>{address}</Text>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.btnText}>{btnText}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    height: 120 * scale,
    width: 270 * scale,
    paddingTop: 17 * scale,
    paddingHorizontal: 20 * scale,
    paddingBottom: 16 * scale,
    borderRadius: 5 * scale,
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
  description: {
    color: colors.grayDark,
    fontFamily: 'CarosSoftMedium',
    fontSize: 10 * scale,
    marginTop: 10 * scale,
  },
  button: {
    width: 160 * scale,
    height: 38 * scale,
    borderRadius: 5 * scale,
    borderColor: colors.grayBorder,
    borderWidth: 1 * scale,
    backgroundColor: colors.white,
    marginTop: 12 * scale,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: colors.orange,
    fontFamily: 'CarosSoftMedium',
    fontSize: 12 * scale,
  },
});

HouseInspectionReminder.propTypes = {
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  titleColor: PropTypes.string.isRequired,
};

export default HouseInspectionReminder;
