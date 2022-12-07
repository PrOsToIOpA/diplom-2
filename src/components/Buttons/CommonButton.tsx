import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {calcFontSize, calcHeight} from '../../utils/dimensions';
import {white, magenta, linearGradient} from '../../utils/constants/colors';

interface ICommonLinearButtonProps {
  isBorderGradient?: boolean;
  isTransparentBackground?: boolean;
  disabled?: boolean | null;
  textColor?: string;
  styleContainer?: StyleProp<ViewStyle>;
  styleButton?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  text: string;
  onPress: () => void;
}

export const CommonButton = ({
  isBorderGradient,
  isTransparentBackground,
  styleContainer,
  styleButton,
  styleText,
  text,
  onPress,
  textColor,
  disabled,
  ...rest
}: ICommonLinearButtonProps) => {
  const buttonRender = () => (
    <View
      style={[
        styles.button,
        styleButton,
        isBorderGradient && styles.buttonContainerBorderGradient,
      ]}
      {...rest}
    >
      <Text
        style={[
          styles.text,
          styleText,
          !!textColor && {color: textColor},
          isBorderGradient && {color: magenta},
        ]}
      >
        {text}
      </Text>
    </View>
  );

  return (
    <TouchableOpacity
      style={[styles.container, styleContainer]}
      onPress={onPress}
      disabled={disabled}
    >
      {isTransparentBackground ? (
        <View style={styles.transparentBackgroundContainer}>
          {buttonRender()}
        </View>
      ) : (
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
          locations={linearGradient.main.locations}
          colors={linearGradient.main.colors}
          style={styles.backgroundGradient}
        >
          {buttonRender()}
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: calcHeight(48),
  },
  backgroundGradient: {
    alignSelf: 'flex-end',
    borderRadius: 50,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: white,
    fontSize: calcFontSize(17),
    fontWeight: '700',
  },
  transparentBackgroundContainer: {
    borderColor: white,
    borderWidth: 3,
    flex: 1,
    borderRadius: 50,
  },
  buttonContainerBorderGradient: {
    backgroundColor: white,
  },
  button: {
    borderColor: white,
    borderRadius: 50,
    width: '99%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
  },
});
