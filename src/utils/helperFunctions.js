import moment from 'moment';

import colors from '../constants/colors';

const timePositionColors = {
  past: colors.pastEvents,
  present: colors.orange,
  future: colors.black,
};

export const getTimePosition = (date) => {
  const now = Date.now();
  if (moment(date).isBefore(now, 'day')) {
    return 'past';
  }
  if (moment(date).isSame(now, 'day')) {
    return 'present';
  }
  return 'future';
};

export const getTitleColor = (date) => {
  const timePosition = getTimePosition(date);
  return timePositionColors[timePosition];
};

export const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

export const getTime = date => moment(date)
  .utcOffset(date)
  .format('H A');
