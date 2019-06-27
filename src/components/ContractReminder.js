import React from 'react';
import {
  Text, ImageBackground, TouchableOpacity, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import { scale } from '../constants/layouts';
import colors from '../constants/colors';
import images from '../constants/images';
import { h2 } from '../constants/textStyles';

const renewBtnText = 'Renew';

const ContractReminder = ({ title }) => (
  <ImageBackground
    source={images.contract_reminder}
    resizeMode="contain"
    style={styles.container}
  >
    <Text style={styles.title}>{title}</Text>
    <TouchableOpacity style={styles.renewBtn}>
      <Text style={styles.renewBtnText}>{renewBtnText}</Text>
    </TouchableOpacity>
  </ImageBackground>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    height: 160 * scale,
    width: 270 * scale,
    borderRadius: 5 * scale,
    paddingLeft: 30,
    paddingBottom: 30,
  },
  title: {
    ...h2,
    width: 164 * scale,
    color: colors.white,
    marginTop: 32 * scale,
  },
  renewBtn: {
    width: 90 * scale,
    height: 38 * scale,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20 * scale,
    backgroundColor: colors.orange,
    borderRadius: 5 * scale,
  },
  renewBtnText: {
    color: colors.white,
    fontFamily: 'CarosSoftMedium',
    fontSize: 12 * scale,
  },
});

ContractReminder.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ContractReminder;
