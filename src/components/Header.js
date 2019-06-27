import React from 'react';
import {
  Text, View, StyleSheet, Image, TouchableOpacity, Platform,
} from 'react-native';
import PropTypes from 'prop-types';

import { h1, monthSwitcher } from '../constants/textStyles';
import images from '../constants/images';
import colors from '../constants/colors';
import { scale, headerHeight } from '../constants/layouts';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      section: 0,
    };
  }

  onPressPrev = () => {
    const { switchMonth } = this.props;
    this.setState(prevState => ({
      section: prevState.section > 0 ? prevState.section - 1 : 0,
    }),
    () => {
      const { section } = this.state;
      switchMonth({ sectionIndex: section });
    });
  };

  onPressNext = () => {
    const { sections, switchMonth } = this.props;
    this.setState(prevState => ({
      section: (prevState.section < sections.length - 2)
        ? prevState.section + 1
        : sections.length - 1,
    }),
    () => {
      const { section } = this.state;
      switchMonth({ sectionIndex: section });
    });
  };

  render() {
    const {
      headerText, sections,
    } = this.props;
    const { section } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>{headerText}</Text>
        <View style={styles.monthSwitcher}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={this.onPressPrev}
          >
            <Image
              source={images.arrow_left}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
          <View style={styles.switchTextContainer}>
            <Text
              numberOfLines={2}
              style={styles.monthSwitcherText}
            >
              {sections[section]}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={this.onPressNext}
          >
            <Image
              source={images.arrow_right}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingBottom: 20 * scale,
    paddingLeft: 30 * scale,
    ...Platform.select({
      ios: {
        paddingTop: 54 * scale,
        shadowColor: colors.black,
        shadowOpacity: 0.05,
        shadowRadius: 15,
        shadowOffset: {
          height: 3,
        },
      },
      android: {
        paddingTop: 24 * scale,
        elevation: 5,
      },
    }),
  },
  headerText: {
    ...h1,
  },
  monthSwitcher: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthSwitcherText: {
    ...monthSwitcher,
    textAlign: 'center',
    width: 90 * scale,
  },
  switchTextContainer: {
    width: 90 * scale,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    width: 8 * scale,
    height: 8 * scale,
  },
  arrowButton: {
    width: 40 * scale,
    height: 40 * scale,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Header.propTypes = {
  headerText: PropTypes.string.isRequired,
  switchMonth: PropTypes.func.isRequired,
  sections: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Header;
