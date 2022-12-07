import * as React from 'react';
import {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import {calcFontSize, calcHeight, calcWidth} from '../../utils/dimensions';
import {black, blue} from '../../utils/constants/colors';

interface ISimpleTextInputProps {
  placeholder: string;
  placeholderTextColor?: string;
  styleContainer?: StyleProp<ViewStyle>;
  styleInput?: StyleProp<TextStyle>;
  value: string;
  onChangeText: (text: string) => void;
  focusedColor?: string;
  password?: boolean;
  onBlur?: (e?: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onSubmitEditing?: () => void;
  withoutTogglePass?: boolean;
}

export const SimpleTextInput = ({
  styleContainer,
  styleInput,
  value,
  onChangeText,
  placeholder,
  placeholderTextColor,
  focusedColor,
  password,
  withoutTogglePass,
  onBlur,
  onSubmitEditing,
  ...rest
}: ISimpleTextInputProps) => {
  const [focused, setFocused] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const handleBlur = () => {
    setFocused(false);
    onBlur && onBlur();
  };
  return (
    <View style={[styles.container, styleContainer]}>
      <View>
        <TextInput
          style={[
            styles.input,
            styleInput,
            focused && {borderColor: focusedColor || '#57ADF8'},
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={placeholderTextColor || '#878691'}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          onSubmitEditing={onSubmitEditing && onSubmitEditing}
          secureTextEntry={password && isShow}
          {...rest}
        />
      </View>
      {password && !withoutTogglePass && (
        <TouchableOpacity
          style={styles.passwordButton}
          onPress={() => setIsShow(!isShow)}
        >
          <Text style={styles.passwordButtonText}>
            {!isShow ? 'Verberg' : 'Toon'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    position: 'relative',
    backgroundColor: '#F5F8F9',
    fontSize: calcFontSize(16),
    marginVertical: calcHeight(7),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    width: '100%',
    padding: calcWidth(10),
    height: calcHeight(48),
    color: black,
  },
  passwordButton: {
    position: 'absolute',
    top: 0,
    right: calcWidth(16),
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordButtonText: {
    color: blue,
    fontWeight: 'bold',
  },
});
