import React, {ReactNode} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {darkBlue, white} from '../../utils/constants/colors';

interface ICommonViewProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  lightStyleBar?: boolean;
  hideStatusBar?: boolean; // @todo rewrite sign-in wrapper stack
}

const CommonView = ({
  children,
  style,
  lightStyleBar = false,
  hideStatusBar = true,
}: ICommonViewProps) => {
  return (
    <KeyboardAvoidingView
      style={[
        styles.keyboardAvoider,
        Platform.select({
          ios: {backgroundColor: !lightStyleBar ? darkBlue : white},
        }),
        hideStatusBar && {backgroundColor: 'transparent'},
      ]}
    >
      <SafeAreaView style={[styles.safeArea, style]}>{children}</SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoider: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});

export default CommonView;
