import * as React from 'react';
import {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Animated,
  Keyboard,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {calcFontSize, calcHeight, calcWidth} from '../../utils/dimensions';
import {FONTS} from '../../utils/fonts';

interface IFloatingTextInputProps {
  label: string;
  labelColor?: string;
  styleContainer?: StyleProp<ViewStyle>;
  styleInput?: StyleProp<TextStyle>;
  value: string;
  onChangeText: (text: string) => void;
  dontChangeOutline?: boolean;
  focusedColor?: string;
  password?: boolean;
}

export const FloatingTextInput = ({
  label,
  labelColor,
  styleContainer,
  styleInput,
  value,
  onChangeText,
  dontChangeOutline,
  focusedColor,
  password,
  ...rest
}: IFloatingTextInputProps) => {
  const animatedIsFocused = useRef(new Animated.Value(0)).current;
  const [focused, setFocused] = useState(false);
  const labelStyle: object = {
    position: 'absolute',
    left: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [calcHeight(0), 2],
    }),
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [calcHeight(21), 4],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [calcHeight(14), calcHeight(10)],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [labelColor || '#000', labelColor || '#000'],
    }),
  };

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: focused || value !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  });
  return (
    <View style={[styles.container, styleContainer]}>
      <Animated.Text
        style={[labelStyle, !!labelColor && focused && {color: labelColor}]}
      >
        {label}
      </Animated.Text>
      <TextInput
        onSubmitEditing={Keyboard.dismiss}
        secureTextEntry={password}
        style={[
          styles.input,
          styleInput,
          !dontChangeOutline && focused && {borderBottomColor: focusedColor},
        ]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
        }}
        blurOnSubmit
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    fontSize: calcFontSize(16),
    marginVertical: calcHeight(10),
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
    paddingVertical: calcWidth(15),
    maxHeight: calcHeight(50),
    fontFamily: FONTS.Poppins.Regular400,
  },
});
