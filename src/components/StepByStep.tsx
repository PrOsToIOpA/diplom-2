import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {calcWidth} from '../utils/dimensions';

interface IStepByStepProps {
  steps: number;
  currentStep: number;
  style?: StyleProp<ViewStyle>;
  elementContainerStyle?: StyleProp<ViewStyle>;
}

const StepByStep = ({
  steps,
  currentStep,
  style,
  elementContainerStyle,
}: IStepByStepProps) => {
  const counter = Array.apply(null, {length: steps} as any);
  return (
    <View style={[styles.main, style]}>
      {counter.map((e, i) => (
        <View
          style={[styles.elementContainerStyle, elementContainerStyle]}
          key={i}
        >
          {i !== currentStep ? (
            <View style={styles.element} />
          ) : (
            <LinearGradient
              colors={['#7F30B5', '#D8519D']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.activeElement}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
  },
  elementContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeElement: {
    width: calcWidth(9),
    height: calcWidth(9),
    borderRadius: 100,
  },
  element: {
    backgroundColor: 'rgba(189,70,137,0.2)',
    width: calcWidth(9),
    height: calcWidth(9),
    borderRadius: 100,
  },
});

export default StepByStep;
