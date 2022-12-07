import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {deviceWidth} from '../../utils/dimensions';
import {white} from '../../utils/constants/colors';

interface IConeShapeProps {
  style?: StyleProp<ViewStyle>;
}

const ConeShape = ({style}: IConeShapeProps) => {
  return <View style={[styles.cone, style]} />;
};

const styles = StyleSheet.create({
  cone: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftWidth: deviceWidth / 2,
    borderRightWidth: deviceWidth / 2,
    borderTopWidth: 999,
    borderTopColor: white,
    borderRadius: 999,
    transform: [{scaleX: 1.85}],
  },
});

export default ConeShape;
