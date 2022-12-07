import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '../../utils/navigation';

import {ErrorInput} from '../../components/Inputs/ErrorInput';
import {CommonButton} from '../../components/Buttons/CommonButton';
import CommonView from '../../components/Views/CommonView';
import {SimpleTextInput} from '../../components/Inputs/SimpleTextInput';

import {calcFontSize, calcHeight, calcWidth} from '../../utils/dimensions';
import {linearGradient, white} from '../../utils/constants/colors';
import {FONTS} from '../../utils/fonts';
import LogoIcon from '../../../assets/svg/raboom.svg';
import LabelIcon from '../../../assets/svg/label.svg';
import {
  fetchLogin,
  setEmail,
  setPassword,
} from '../../store/actions/signingActions';
import {useDispatch, useSelector} from 'react-redux';
import {IRootReducer} from '../../store/reducers';
import {translate} from '../../services/api/localization';

const LoginScreen = () => {
  const {email, password} = useSelector(
    (state: IRootReducer) => state.signingReducer,
  );
  const dispatch = useDispatch();
  const {navigate, reset} = useNavigation();
  const validatePass = (pass: string): boolean => {
    return pass.length < 6;
  };
  const validateEmail = (e: string): boolean => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(e).toLowerCase());
  };
  const [emailErrors, setEmailErrors] = useState<boolean | null>(
    validateEmail(email) || true,
  );
  const [isValidPass, setValidPass] = useState<boolean | null>(
    validatePass(password) || true,
  );
  useEffect(() => {
    setValidPass(validatePass(password));
    setEmailErrors(validateEmail(email));
  }, []);

  return (
    <LinearGradient
      start={{x: 0.4, y: 1}}
      end={{x: 1, y: 0}}
      locations={linearGradient.main.locations}
      colors={linearGradient.main.colors}
      style={styles.main}
    >
      <CommonView>
        <View style={styles.svgContainer}>
          <LogoIcon
            width={calcHeight(52.08)}
            height={calcHeight(51.88)}
            fill={white}
          />
          <View style={{width: calcHeight(10)}} />
          <LabelIcon
            width={calcHeight(162)}
            height={calcHeight(25)}
            fill={white}
          />
        </View>
        <View style={styles.inputMargin}>
          <SimpleTextInput
            value={email}
            onChangeText={text => {
              dispatch(setEmail(text));
              setEmailErrors(validateEmail(text));
            }}
            placeholder="E-mailadres"
          />
          {emailErrors && (
            <ErrorInput errorText="Vul een correct e-mailadres in" />
          )}
          <SimpleTextInput
            value={password}
            onChangeText={text => {
              dispatch(setPassword(text));
              setValidPass(validatePass(text));
            }}
            placeholder={translate('wachtwoord')}
            password
            withoutTogglePass
          />
          {isValidPass && (
            <ErrorInput
              errorText={translate(
                'wachtwoord moet uit minstens 6 tekens bestaan',
              )}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <CommonButton
            onPress={() => {
              dispatch(
                fetchLogin({
                  grant_type: 'password',
                  password: password,
                  username: email,
                }),
              );
            }}
            text="Inloggen"
            disabled={!(!isValidPass && !emailErrors)}
          />
        </View>
        <TouchableOpacity onPress={() => navigate('ForgotPasswordScreen')}>
          <Text style={[styles.textStyle, {fontSize: calcFontSize(13)}]}>
            {translate('Login')}
          </Text>
        </TouchableOpacity>
      </CommonView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: calcWidth(20),
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: calcHeight(10),
    marginBottom: calcHeight(30),
  },
  inputMargin: {marginTop: calcHeight(50)},
  svgStyle: {
    fontSize: calcFontSize(40),
    textAlign: 'center',
    color: white,
    marginTop: calcHeight(100),
    backgroundColor: '#927792',
  },
  textStyle: {
    fontFamily: FONTS.Poppins.Medium500,
    marginTop: calcHeight(10),
    fontSize: calcFontSize(16),
    color: white,
    textAlign: 'center',
    marginBottom: calcHeight(15),
  },
  svgContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: calcHeight(80),
  },
});

export default LoginScreen;
