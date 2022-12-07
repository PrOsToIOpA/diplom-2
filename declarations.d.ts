declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  import {StyleProp, ViewStyle} from 'react-native';
  const content: React.FC<SvgProps | StyleProp<ViewStyle>>;
  export default content;
}
