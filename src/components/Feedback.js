import React from 'react';
import {
  Text, View, StyleSheet, Image, Platform,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import PropTypes from 'prop-types';

import { scale } from '../constants/layouts';
import { sectionItemTitle, regularText } from '../constants/textStyles';
import images from '../constants/images';
import colors from '../constants/colors';
import TitleTime from './TitleTime';

const ratingBlockTitle = 'Rate your experience';
const ratingBlockText = 'We value all feedback. Help us improve our services by rating your experience.';

const Feedback = ({
  name, position, description, rating, time, isPast, titleColor,
}) => (
  <View style={styles.container}>
    <View style={styles.issueInfoBlock}>
      <View style={styles.title}>
        <Image
          source={images.plumber_avatar}
          resizeMode="contain"
          style={styles.avatar}
        />
        <View style={styles.contractorInfo}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.position}>
            <Text style={styles.positionText}>{position}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TitleTime time={time} />
        </View>
      </View>
      <View style={styles.description}>
        <Text style={[styles.descriptionText, { color: titleColor }]}>{description}</Text>
        {isPast && (
          <Image
            source={images.check_mark_blue}
            resizeMode="contain"
            style={styles.checkIcon}
          />
        )}
      </View>
    </View>

    <View style={styles.ratingBlock}>
      <Text style={styles.ratingBlockTitle}>{ratingBlockTitle}</Text>
      <Text style={styles.ratingBlockText}>{ratingBlockText}</Text>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={rating}
        starSize={18}
        containerStyle={styles.starRating}
        fullStarColor={colors.orange}
        emptyStarColor={colors.emptyStar}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    height: 236 * scale,
    width: 270 * scale,
  },
  issueInfoBlock: {
    backgroundColor: colors.gray,
    height: 100 * scale,
    paddingTop: 17 * scale,
    paddingHorizontal: 20 * scale,
    alignItems: 'flex-start',
    borderTopLeftRadius: 5 * scale,
    borderTopRightRadius: 5 * scale,
  },
  title: {
    flexDirection: 'row',
  },
  avatar: {
    borderRadius: Platform.OS === 'ios' ? 20 * scale : 35 * scale,
    width: 40 * scale,
    height: 40 * scale,
  },
  contractorInfo: {
    marginLeft: 16 * scale,
  },
  name: {
    ...sectionItemTitle,
    color: colors.black,
  },
  position: {
    width: 52 * scale,
    height: 20 * scale,
    borderRadius: 5 * scale,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2 * scale,
  },
  positionText: {
    color: colors.blue,
    fontFamily: 'CarosSoftBold',
    fontSize: 10 * scale,
  },
  headerRight: {
    marginLeft: 66 * scale,
  },
  description: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 230 * scale,
    marginTop: 16 * scale,
  },
  descriptionText: {
    ...sectionItemTitle,
    color: colors.black,
  },
  checkIcon: {
    width: 10 * scale,
    height: 10 * scale,
    marginLeft: 8 * scale,
  },
  ratingBlock: {
    backgroundColor: colors.white,
    height: 136 * scale,
    padding: 20 * scale,
    borderBottomLeftRadius: 5 * scale,
    borderBottomRightRadius: 5 * scale,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOpacity: 0.04,
        shadowRadius: 7,
        shadowOffset: {
          height: 5,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  ratingBlockTitle: {
    width: 230 * scale,
    color: colors.black,
    fontFamily: 'CarosSoftBold',
    fontSize: 14 * scale,
  },
  ratingBlockText: {
    ...regularText,
    marginTop: 8 * scale,
    width: 230 * scale,
    lineHeight: 17 * scale,
  },
  starRating: {
    width: 125 * scale,
    marginTop: 20 * scale,
  },
  past: {
    color: colors.pastEvents,
  },
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  isPast: PropTypes.bool.isRequired,
  titleColor: PropTypes.string.isRequired,
};

export default Feedback;
