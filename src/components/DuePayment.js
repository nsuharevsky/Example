import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { scale } from '../constants/layouts';
import colors from '../constants/colors';
import { sectionItemTitle, h2 } from '../constants/textStyles';
import TitleTime from './TitleTime';

const DuePayment = ({
  title, description, price, currency, time, titleColor,
}) => (
  <View style={styles.container}>
    <View style={styles.title}>
      <Text style={[styles.titleText, { color: titleColor }]}>{title}</Text>
      <View style={styles.titleRight}>
        <TitleTime time={time} />
      </View>
    </View>
    <Text style={styles.description}>{description}</Text>
    <Text style={styles.price}>
      {currency}
      {price}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    height: 91 * scale,
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
  price: {
    ...h2,
    marginTop: 5 * scale,
  },
});

DuePayment.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  titleColor: PropTypes.string.isRequired,
};

export default DuePayment;
