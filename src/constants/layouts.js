import { Dimensions, Platform } from 'react-native';

export const { width: screenWidth } = Dimensions.get('window');

const screenWidthFromDesign = 375;

export const scale = screenWidth / screenWidthFromDesign;

export const headerHeight = scale * (Platform.OS === 'ios' ? 105 : 75);
