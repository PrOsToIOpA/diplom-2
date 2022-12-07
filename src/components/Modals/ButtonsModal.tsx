import React, {ReactChildren} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modal';
import {calcFontSize, calcHeight, calcWidth} from '../../utils/dimensions';
import {FONTS} from '../../utils/fonts';
import {white} from '../../utils/constants/colors';

interface IButtonObject {
  text: string;
  color?: string;
  onPress: () => void;
}

interface IButtonsModal {
  children?: ReactChildren;
  style?: StyleProp<ViewStyle>;
  textContainerStyle?: StyleProp<ViewStyle>;
  buttonsContainerStyle?: StyleProp<ViewStyle>;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  buttons?: Array<IButtonObject>;
  buttonsTextStyle?: StyleProp<TextStyle>;
  shown: boolean;
  setShown: (shown: boolean) => void;
}

const ButtonsModal = ({
  children,
  style,
  textContainerStyle,
  buttonsContainerStyle,
  title,
  titleStyle,
  text,
  textStyle,
  buttons,
  shown,
  setShown,
  buttonsTextStyle,
}: IButtonsModal) => {
  const toggleModal = () => setShown(!shown);
  return (
    <Modal
      statusBarTranslucent
      style={styles.modalStyle}
      isVisible={shown}
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}
    >
      <View style={[styles.main, style]}>
        <View style={[styles.textContainer, textContainerStyle]}>
          {children ? (
            children
          ) : (
            <>
              <Text style={[styles.title, titleStyle]}>{title}</Text>
              <Text style={[styles.text, textStyle]}>{text}</Text>
            </>
          )}
        </View>
        <View style={[styles.buttonsContainer, buttonsContainerStyle]}>
          {buttons &&
            buttons.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.singleButtonContainer,
                  index === 0 && styles.leftButtonContainer,
                  index === buttons.length - 1 && styles.rightButtonContainer,
                  buttons.length === 1 && styles.onlyButton,
                ]}
              >
                <TouchableOpacity
                  onPress={item.onPress}
                  style={{flex: 1, width: '100%', justifyContent: 'center'}}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      {color: item.color},
                      buttonsTextStyle,
                    ]}
                  >
                    {item.text}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    margin: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 0,
    backgroundColor: white,
    borderRadius: 10,
    margin: calcWidth(40),
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  buttonsContainer: {
    height: calcHeight(42),
    flexDirection: 'row',
  },
  title: {
    fontSize: calcFontSize(16),
    fontFamily: FONTS.Poppins.SemiBold600,
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: calcFontSize(13),
    fontFamily: FONTS.Poppins.Regular400,
    textAlign: 'center',
    color: '#A8B3BA',
  },
  singleButtonContainer: {
    flex: 1,
    borderTopWidth: 2,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(199,206,211,0.4)',
  },
  onlyButton: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  leftButtonContainer: {
    borderBottomLeftRadius: 10,
    borderLeftWidth: 0,
  },
  rightButtonContainer: {
    borderBottomRightRadius: 10,
    borderRightWidth: 0,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: calcFontSize(16),
    fontFamily: FONTS.Poppins.Medium500,
  },
});

export default ButtonsModal;
