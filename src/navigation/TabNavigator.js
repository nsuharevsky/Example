import React from 'react';
import { Image, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import DashboardScreen from '../screens/DashboardScreen';
import FindScreen from '../screens/FindScreen';
import ActivityScreen from '../screens/ActivityScreen';
import MessageScreen from '../screens/MessageScreen';
import ProfileScreen from '../screens/ProfileScreen';
import images from '../constants/images';
import { scale } from '../constants/layouts';
import { tab } from '../constants/textStyles';
import colors from '../constants/colors';

export default createBottomTabNavigator(
  {
    Dashboard: DashboardScreen,
    Find: FindScreen,
    Activity: ActivityScreen,
    Message: MessageScreen,
    Profile: ProfileScreen,
  },
  {
    initialRouteName: 'Activity',
    tabBarOptions: {
      style: {
        height: 65 * scale,
        paddingBottom: 14 * scale,
        paddingTop: 18 * scale,
        borderWidth: 0,
        borderTopColor: colors.transparent,
        ...Platform.select({
          ios: {
            shadowColor: colors.black,
            shadowOpacity: 0.1,
            shadowRadius: 5,
            shadowOffset: {
              height: 3,
            },
          },
          android: {
            elevation: 5,
          },
        }),
      },

      labelStyle: {
        ...tab,
      },
      tabStyle: {},
    },
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Dashboard':
            iconName = images.dashboard_icon;
            break;
          case 'Find':
            iconName = images.find_icon;
            break;
          case 'Activity':
            iconName = images.activity_icon;
            break;
          case 'Message':
            iconName = images.message_icon;
            break;
          case 'Profile':
            iconName = images.profile_icon;
            break;
          default:
            iconName = images.activity_icon;
        }

        return (
          <Image
            source={iconName}
            style={styles.image}
            resizeMode="contain"
          />
        );
      },
    }),
  },
);

const styles = StyleSheet.create({
  image: {
    width: 15 * scale,
    height: 15 * scale,
  },
});
