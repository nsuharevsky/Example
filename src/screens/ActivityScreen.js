import React, { Component } from 'react';
import {
  Text, View, StyleSheet, SectionList,
} from 'react-native';
import moment from 'moment';

import { h2 } from '../constants/textStyles';
import Header from '../components/Header';
import { scale, screenWidth, headerHeight } from '../constants/layouts';
import colors from '../constants/colors';
import RenterProfileProgress from '../components/RenterProfileProgress';
import DuePayment from '../components/DuePayment';
import ContractReminder from '../components/ContractReminder';
import HouseInspectionReminder from '../components/HouseInspectionReminder';
import Reminder from '../components/Reminder';
import Feedback from '../components/Feedback';
import RentItem from '../components/RentItem';
import EmptyPeriod from '../components/EmptyPeriod';

import { processedData } from '../utils/dataProcessing';
import {
  getTitleColor, getTimePosition, capitalize, getTime,
} from '../utils/helperFunctions';

const HEADER_TEXT = 'Your activity';

export default class ActivityScreen extends Component {
  state = {
    events: null,
  };

  componentDidMount() {
    this.setState({ events: processedData });
  }

  isPastEvent = (date) => {
    const now = Date.now();
    return !!moment(date).isBefore(now, 'day');
  };

  renderSectionItem = (item) => {
    const { type, date_time, content_object } = item;
    const time = getTime(date_time);
    const isPast = this.isPastEvent(date_time);
    const titleColor = getTitleColor(date_time);

    if (type === 'profile') {
      const { title, description, profile_complete } = content_object;
      return (
        <RenterProfileProgress
          title={title}
          description={description}
          profile_complete={profile_complete}
          time={time}
          titleColor={titleColor}
        />
      );
    }
    if (type === 'payment') {
      const {
        title, content, price, price_currency,
      } = content_object;
      return (
        <DuePayment
          title={title}
          description={content}
          price={price}
          currency={price_currency}
          time={time}
          titleColor={titleColor}
        />
      );
    }
    if (type === 'reminder') {
      const { title } = content_object;
      return <ContractReminder title={title} />;
    }
    if (type === 'house_inspection') {
      const {
        title,
        content,
        landlord: { id },
      } = content_object;
      return (
        <HouseInspectionReminder
          title={title}
          address={content}
          landlord={id}
          time={time}
          titleColor={titleColor}
        />
      );
    }
    if (type === 'manager_catch_up') {
      const { title } = content_object;
      return (
        <Reminder
          title={title}
          time={time}
          titleColor={titleColor}
        />
      );
    }
    if (type === 'feedback') {
      const {
        user: { avatar, position },
        issue: { text },
      } = content_object;
      return (
        <Feedback
          avatar={avatar}
          position={position}
          name="Paul Smith"
          description={text}
          rating={4}
          time={time}
          isPast={isPast}
          titleColor={titleColor}
        />
      );
    }
    if (type === 'rent_item') {
      const {
        category,
        apartment: {
          images,
          address,
          appartment_options,
          apartment_description,
          price,
          price_description,
          price_currency,
          landlord,
          customers,
        },
      } = content_object;
      return (
        <RentItem
          title={capitalize(category)}
          category={category}
          time={time}
          photos={images}
          isPast={isPast}
          titleColor={titleColor}
          address={address}
          options={appartment_options}
          description={`${apartment_description}: `}
          price={`${price_currency}${price} `}
          price_description={price_description}
          landlordAvatar={landlord.avatar}
          customersAvatars={customers.map(customer => customer.avatar)}
        />
      );
    }
    if (type === 'empty_period') {
      return <EmptyPeriod period={item.period} />;
    }
    return null;
  };

  switchMonth = ({ sectionIndex }) => {
    if (this.sectionList) {
      this.sectionList.scrollToLocation({ itemIndex: 0, sectionIndex, animated: true });
    }
  };

  renderItem = ({ item, index, section }) => {
    const timePosition = getTimePosition(item.date_time);
    const timeStyle = timePositionStyle[timePosition];

    const prevItem = index && section.data[index - 1];
    const hideDate = item.type === 'empty_period'
      || (index !== 0 && moment(prevItem?.date_time).isSame(moment(item.date_time), 'day'));
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemDateContainer}>
          {!hideDate && (
            <View>
              <Text
                style={[styles.itemDate, timeStyle]}
                key={index}
              >
                {`${moment(item.date_time).format('D')}`}
              </Text>
              <Text style={[styles.itemWeekDay, timeStyle]}>
                {`${moment(item.date_time).format('ddd')}`}
              </Text>
            </View>
          )}
        </View>
        {this.renderSectionItem(item)}
      </View>
    );
  };

  render() {
    const { events } = this.state;

    const sectionTitles = events?.map(event => event.title) || [];
    return (
      <View style={styles.container}>
        {events && (
          <SectionList
            ref={(sectionList) => {
              this.sectionList = sectionList;
            }}
            renderItem={this.renderItem}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.month}>{title}</Text>
            )}
            sections={events}
            keyExtractor={(item, index) => item + index}
            stickySectionHeadersEnabled={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
        <View style={styles.headerContainer}>
          <Header
            headerText={HEADER_TEXT}
            switchMonth={this.switchMonth}
            sections={sectionTitles}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  listContainer: {
    paddingLeft: 30 * scale,
    paddingBottom: 150 * scale,
    backgroundColor: colors.white,
    marginTop: headerHeight,
  },
  month: {
    ...h2,
    marginBottom: 20 * scale,
    marginTop: 20 * scale,
  },
  itemContainer: {
    flexDirection: 'row',
    width: screenWidth,
    marginBottom: 10 * scale,
    alignItems: 'flex-start',
  },
  itemDateContainer: {
    alignItems: 'flex-start',
    marginRight: 20 * scale,
    height: 33 * scale,
    width: 25 * scale,
  },
  itemDate: {
    ...h2,
  },
  itemWeekDay: {
    fontSize: 10 * scale,
    fontFamily: 'CarosSoftMedium',
  },
  todayDate: {
    color: colors.orange,
  },
  pastDate: {
    color: colors.grayDate,
    opacity: 0.7,
  },
  futureDate: {
    color: colors.black,
  },
});

const timePositionStyle = {
  past: styles.pastDate,
  present: styles.todayDate,
  future: styles.futureDate,
};
