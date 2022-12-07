import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useNavigation} from '../../utils/navigation';

import {CommonButton} from '../../components/Buttons/CommonButton';
import RegisterHeader from '../../components/Headers/RegisterHeader';
import CommonView from '../../components/Views/CommonView';
import {SimpleTextInput} from '../../components/Inputs/SimpleTextInput';
import {ErrorInput} from '../../components/Inputs/ErrorInput';

import {calcFontSize, calcHeight, calcWidth} from '../../utils/dimensions';
import {black, lightBlue, white} from '../../utils/constants/colors';
import {FONTS} from '../../utils/fonts';
import {
  fetchForgotPassword,
  setEmail,
} from '../../store/actions/signingActions';
import {useDispatch, useSelector} from 'react-redux';
import {IRootReducer} from '../../store/reducers';

const ForgotPassword = () => {
  const {email} = useSelector((state: IRootReducer) => state.signingReducer);
  const dispatch = useDispatch();
  const [emailErrors, setEmailErrors] = useState<boolean | null>(true); // Array<string> | null
  const {goBack} = useNavigation();

  const validateEmail = (e: string): boolean => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(e).toLowerCase());
  };

  return (
    <CommonView style={styles.whiteBg}>
      <RegisterHeader />
      <View style={styles.main}>
        <View>
          <Text style={styles.title}>Wijzig je wachtwoord</Text>
          <Text style={styles.subTitle}>
            Voer je e-mailadres hieronder in en druk op de link die je per
            e-mail ontvangt om je wachtwoord te wijzigen
          </Text>
        </View>
        <View style={styles.inputMargin}>
          <SimpleTextInput
            value={email}
            placeholder={'E-mail'}
            onChangeText={newEmail => {
              dispatch(setEmail(newEmail));
              setEmailErrors(validateEmail(newEmail));
            }}
          />
          {emailErrors && (
            <ErrorInput
              errorText="Vul een correct e-mailadres in"
              textColor={lightBlue}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <CommonButton
            onPress={() => dispatch(fetchForgotPassword({email: email}))}
            text="Wijzig"
            disabled={emailErrors}
          />
        </View>
      </View>
    </CommonView>
  );
};

const styles = StyleSheet.create({
  whiteBg: {
    backgroundColor: white,
  },
  main: {
    flex: 1,
    paddingHorizontal: calcWidth(15),
  },
  inputMargin: {
    marginTop: calcHeight(26),
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: calcHeight(10),
    marginBottom: calcHeight(30),
  },
  title: {
    fontFamily: FONTS.Poppins.Bold700,
    fontSize: calcFontSize(24),
    textAlign: 'center',
    color: black,
    marginTop: calcHeight(70),
  },
  subTitle: {
    fontFamily: FONTS.Poppins.Regular400,
    marginTop: calcHeight(10),
    fontSize: calcFontSize(14),
    color: black,
    textAlign: 'center',
  },
});

export default ForgotPassword;
