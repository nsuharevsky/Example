import React from 'react';
import {
  Text, View, StyleSheet, Image, TouchableOpacity, Platform,
} from 'react-native';
import Swiper from 'react-native-swiper';
import PropTypes from 'prop-types';

import { scale } from '../constants/layouts';
import { sectionItemTitle, regularText } from '../constants/textStyles';
import images from '../constants/images';
import colors from '../constants/colors';
import TitleTime from './TitleTime';

const {
  apartment_photo, landlord, tenant1, tenant2,
} = images;

const pics = [
  {
    index: 1,
    image: apartment_photo,
  },
  {
    index: 2,
    image: apartment_photo,
  },
  {
    index: 3,
    image: apartment_photo,
  },
];

const landlordIcon = landlord;
const tenantIcons = [tenant1, tenant2];
const rearrangeBtnText = 'Rearrange';
const messageLandlordBtnText = 'Message Landlord';

const RentItem = ({
  title,
  time,
  isPast,
  address,
  options,
  price,
  description,
  price_description,
  category,
  titleColor,
}) => (
  <View
    style={[
      styles.container,
      category === 'check-in' && styles.checkInContainer,
      category === 'check-out' && styles.checkOutContainer,
    ]}
  >
    <View style={styles.title}>
      <View style={styles.titleLeft}>
        <Text style={[styles.titleText, { color: titleColor }]}>{title}</Text>
        {isPast && (
          <Image
            source={images.check_mark_blue}
            resizeMode="contain"
            style={styles.checkIcon}
          />
        )}
      </View>
      <View style={styles.titleRight}>
        <TitleTime time={time} />
      </View>
    </View>

    <View style={styles.photos}>
      <Swiper
        dotColor={colors.dotColor}
        activeDotColor={colors.white}
        containerStyle={styles.wrapper}
      >
        {pics.map(item => (
          <Image
            key={item.index}
            resizeMode="contain"
            source={item.image}
            style={styles.photo}
          />
        ))}
      </Swiper>
    </View>
    <View style={styles.description}>
      <Text style={styles.descriptionText}>{description}</Text>
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.descriptionText}>{price_description}</Text>
    </View>
    <Text style={styles.address}>{address}</Text>
    <View style={styles.options}>
      {options.map((item, index) => (
        <View
          style={styles.option}
          key={item}
        >
          <Text style={styles.optionsText}>{item}</Text>
          {index !== options.length - 1 && <Text style={styles.optionsDot}>{' \u2022 '}</Text>}
        </View>
      ))}
    </View>
    {category !== 'check-out' && (
      <View style={styles.avatars}>
        <Image
          source={landlordIcon}
          style={[styles.avatar, styles.landlord]}
          resizeMode="contain"
        />
        {tenantIcons.map(avatar => (
          <Image
            key={avatar}
            source={avatar}
            style={[styles.avatar, styles.tenants]}
            resizeMode="contain"
          />
        ))}
      </View>
    )}
    {category === 'check-in' && (
      <TouchableOpacity style={styles.rearrangeBtn}>
        <Text style={styles.rearrangeBtnText}>{rearrangeBtnText}</Text>
      </TouchableOpacity>
    )}
    {category === 'check-out' && (
      <TouchableOpacity style={styles.messageLandlordBtn}>
        <Text style={styles.messageLandlordBtnText}>{messageLandlordBtnText}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 303 * scale,
    width: 270 * scale,
    backgroundColor: colors.gray,
    paddingTop: 17 * scale,
    paddingHorizontal: 20 * scale,
    borderRadius: 5 * scale,
  },
  checkInContainer: {
    height: 356 * scale,
  },
  checkOutContainer: {
    height: 320 * scale,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  titleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100 * scale,
  },
  titleText: {
    ...sectionItemTitle,
    color: colors.black,
  },
  checkIcon: {
    width: 10 * scale,
    height: 10 * scale,
    marginLeft: 8 * scale,
  },
  titleRight: {
    marginTop: 1 * scale,
  },
  past: {
    color: colors.pastEvents,
  },
  photos: {
    width: 230 * scale,
    height: 140 * scale,
    marginTop: 10 * scale,
  },
  photo: {
    width: 230 * scale,
    height: 140 * scale,
  },
  dotStyle: {
    marginTop: 120 * scale,
  },
  description: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6 * scale,
  },
  descriptionText: {
    ...regularText,
  },
  price: {
    color: colors.blackLight,
    fontFamily: 'CarosSoftBold',
    fontSize: 10 * scale,
  },
  address: {
    color: colors.blackLight,
    fontFamily: 'CarosSoftBold',
    fontSize: 14 * scale,
    marginTop: 3,
    height: 24 * scale,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200 * scale,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsText: {
    ...regularText,
  },
  optionsDot: {
    color: colors.grayBorder,
  },
  wrapper: {
    width: 230 * scale,
    height: 140 * scale,
    overflow: 'hidden',
  },
  avatars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  avatar: {
    borderRadius: Platform.OS === 'ios' ? 5 * scale : 25 * scale,
    width: 26 * scale,
    height: 26 * scale,
  },
  landlord: {
    marginRight: 28 * scale,
  },
  tenants: {
    marginRight: -45 * scale,
  },
  rearrangeBtn: {
    width: 132 * scale,
    height: 38 * scale,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15 * scale,
    backgroundColor: colors.orange,
    borderRadius: 5 * scale,
  },
  rearrangeBtnText: {
    color: colors.white,
    fontFamily: 'CarosSoftMedium',
    fontSize: 12 * scale,
  },
  messageLandlordBtn: {
    width: 160 * scale,
    height: 38 * scale,
    borderRadius: 5 * scale,
    borderColor: colors.grayBorder,
    borderWidth: 1 * scale,
    backgroundColor: colors.white,
    marginTop: 20 * scale,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageLandlordBtnText: {
    color: colors.orange,
    fontFamily: 'CarosSoftMedium',
    fontSize: 12 * scale,
  },
});

RentItem.propTypes = {
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  isPast: PropTypes.bool.isRequired,
  address: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price_description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  titleColor: PropTypes.string.isRequired,
};

export default RentItem;
