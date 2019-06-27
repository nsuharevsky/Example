import moment from 'moment';
import mokedData from '../mokedData.json';

function generateEmptyItem(startOfEmptyPeriod, endOfEmptyPeriod) {
  let period = moment(startOfEmptyPeriod).format('MMMM DD');
  if (endOfEmptyPeriod) {
    period += ` - ${moment(endOfEmptyPeriod).format('MMMM DD')}`;
  }
  return {
    date_time: startOfEmptyPeriod,
    type: 'empty_period',
    period,
  };
}

const getDiffBetweenDates = (prevDate, currentDate) => Math.round(moment(prevDate).diff(currentDate, 'days', true));

function addEmptyDatesToSection(events) {
  return events.reduce(
    (eventListWithEmptyDates, event, index) => {
      if (index === 0) {
        return eventListWithEmptyDates.concat(event);
      }
      const tempArr = [].concat(eventListWithEmptyDates);
      if (index !== 0) {
        const prevDate = events[index - 1].date_time;
        const currentDate = event.date_time;
        const diff = getDiffBetweenDates(prevDate, currentDate);
        if (diff !== 0) {
          if (Math.abs(diff) > 1) {
            tempArr.push(generateEmptyItem(moment(prevDate).add(1, 'days'), moment(currentDate).add(-1, 'days')));
          } else if (Math.abs(diff) === 1) {
            tempArr.push(generateEmptyItem(moment(prevDate).add(1, 'days')));
          }
        }
      }
      return tempArr.concat(event);
    },
    [],
  );
}

const addEmptyPeriodsInMonthToEventList = (events) => {
  const eventsWithEmptyPeriodsInMonth = events.map((item) => {
    const newData = addEmptyDatesToSection(item.data);
    const newItem = {
      ...item,
      data: newData,
    };
    return newItem;
  });

  return eventsWithEmptyPeriodsInMonth;
};

const addEmptyPeriodsBetweenMonthToEventList = (eventsWithEmptyPeriodsInMonth) => {
  const eventsWithEmptyPeriodsBetweenMonths = eventsWithEmptyPeriodsInMonth.map((item, index) => {
    const nextItem = eventsWithEmptyPeriodsInMonth[index + 1];
    if (!nextItem) return item;
    const lastDayInMonthOfCurrentSection = item.data[item.data.length - 1].date_time;
    const firstDayInMonthOfNextSection = nextItem.data[0].date_time;
    const diff = getDiffBetweenDates(lastDayInMonthOfCurrentSection, firstDayInMonthOfNextSection);
    if (Math.abs(diff) > 2) {
      item.data.push(generateEmptyItem(
        moment(lastDayInMonthOfCurrentSection).add(1, 'days'),
        moment(firstDayInMonthOfNextSection).add(-1, 'days'),
      ));
    } else if (Math.abs(diff) === 2) {
      item.data.push(generateEmptyItem(moment(lastDayInMonthOfCurrentSection).add(1, 'days')));
    }
    return item;
  });

  return eventsWithEmptyPeriodsBetweenMonths;
};

function getSectionTitle(date) {
  const now = Date.now();
  if (moment(now).isAfter(moment(date), 'day')) return 'Past events';
  if (moment(now).isSame(moment(date), 'day')) return 'Today';
  if (moment(now).add(1, 'days').isSame(moment(date), 'day')) return 'Tomorrow';
  return moment(date).format(`MMMM${moment().isSame(date, 'year') ? '' : ', YYYY'}`);
}

export function dataProcessing(initialEvents) {
  const events = [];
  initialEvents.forEach((item) => {
    const { length } = events;
    const itemMonth = getSectionTitle(item.date_time);
    if (length === 0) {
      events.push({
        title: itemMonth,
        data: [item],
      });
    } else if (events[length - 1].title === itemMonth) {
      events[length - 1].data.push(item);
    } else {
      events.push({
        title: itemMonth,
        data: [item],
      });
    }
  });

  return addEmptyPeriodsBetweenMonthToEventList(
    addEmptyPeriodsInMonthToEventList(events),
  );
}

export const processedData = dataProcessing(mokedData);
