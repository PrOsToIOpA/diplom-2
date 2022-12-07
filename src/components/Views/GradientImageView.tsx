import React, {ReactNode} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
  ImageSourcePropType,
  ImageBackground,
} from 'react-native';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';

interface ICommonViewProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  imageSource: ImageSourcePropType;
  gradientProps: LinearGradientProps;
}

const GradientImageView = ({
  children,
  style,
  imageSource,
  gradientProps,
}: ICommonViewProps) => {
  return (
    <KeyboardAvoidingView style={styles.flex}>
      <ImageBackground /*ok*/ source={imageSource} style={styles.flex}>
        <LinearGradient style={styles.flex} {...gradientProps}>
          <SafeAreaView style={[styles.flex, style]}>{children}</SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default GradientImageView;
