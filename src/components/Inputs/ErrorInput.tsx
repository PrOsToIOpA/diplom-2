import * as React from 'react';
import {Text, StyleSheet} from 'react-native';
import {errorColor} from '../../utils/constants/colors';
import {stringIsNotEmpty} from '../../utils/stringsHelpers';
interface IErrorInput {
  errorText: string;
  textColor?: string;
}

export const ErrorInput = ({errorText, textColor}: IErrorInput) => {
  return stringIsNotEmpty(errorText) ? (
    <Text style={[styles.errorText, textColor ? {color: textColor} : null]}>
      {errorText}
    </Text>
  ) : null;
};

const styles = StyleSheet.create({
  errorText: {
    color: errorColor,
    textAlign: 'left',
    width: '100%',
  },
});
