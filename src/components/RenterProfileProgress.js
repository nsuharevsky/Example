import React from 'react';
import {
  Text, View, StyleSheet, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import { scale } from '../constants/layouts';
import { sectionItemTitle, regularText } from '../constants/textStyles';
import images from '../constants/images';
import colors from '../constants/colors';
import Progress from './Progress';
import TitleTime from './TitleTime';

const landlordRefBtnText = 'Landlord References';
const viewProfileBtnText = 'View my profile';

const RenterProfileProgress = ({
  title, description, profile_complete, time, titleColor,
}) => (
  <View style={styles.container}>
    <View style={styles.title}>
      <Text style={[styles.titleText, { color: titleColor }]}>{title}</Text>
      <View style={styles.titleRight}>
        <TitleTime time={time} />
      </View>
    </View>

    <Text style={styles.description}>{description}</Text>
    <View style={styles.progress}>
      <Progress active={profile_complete} />
      <Text style={styles.percentage}>
        {profile_complete * 100}
        {' '}
        %
      </Text>
    </View>
    <TouchableOpacity style={styles.landlordRefBtn}>
      <Image
        source={images.landlord_ref_icon}
        style={styles.bagIcon}
        resizeMode="contain"
      />
      <Text style={styles.landlordRefBtnText}>{landlordRefBtnText}</Text>
      <Image
        source={images.landlord_ref_arrow}
        style={styles.arrowIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.viewProfileBtn}
      hitSlop={{
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      }}
    >
      <Text style={styles.viewProfileBtnText}>{viewProfileBtnText}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 287 * scale,
    width: 270 * scale,
    backgroundColor: colors.gray,
    paddingTop: 17 * scale,
    paddingHorizontal: 20 * scale,
    borderRadius: 5 * scale,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  titleText: {
    ...sectionItemTitle,
    color: colors.orange,
    width: 140 * scale,
  },
  titleRight: {
    marginLeft: 50 * scale,
    marginTop: 1 * scale,
  },
  description: {
    ...regularText,
    marginTop: 10 * scale,
    width: 230 * scale,
  },
  progress: {
    flexDirection: 'row',
    marginTop: 19 * scale,
    alignItems: 'center',
  },
  percentage: {
    ...sectionItemTitle,
    color: colors.orange,
    marginLeft: 14 * scale,
  },
  landlordRefBtn: {
    width: 230 * scale,
    height: 70 * scale,
    backgroundColor: colors.white,
    padding: 20 * scale,
    marginTop: 20 * scale,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bagIcon: {
    width: 36 * scale,
    height: 28 * scale,
  },
  landlordRefBtnText: {
    ...sectionItemTitle,
    width: 110 * scale,
    marginLeft: 20 * scale,
  },
  arrowIcon: {
    width: 10 * scale,
    height: 9 * scale,
    marginLeft: 20 * scale,
  },
  viewProfileBtn: {
    marginTop: 20 * scale,
    width: 230 * scale,
  },
  viewProfileBtnText: {
    color: colors.orange,
    fontFamily: 'CarosSoftMedium',
    fontSize: 12 * scale,
  },
});

RenterProfileProgress.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  profile_complete: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  titleColor: PropTypes.string.isRequired,
};

export default RenterProfileProgress;
