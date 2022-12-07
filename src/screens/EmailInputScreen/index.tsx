import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '../../utils/navigation';

import RegisterHeader from '../../components/Headers/RegisterHeader';
import CommonView from '../../components/Views/CommonView';
import {CommonButton} from '../../components/Buttons/CommonButton';
import StepByStep from '../../components/StepByStep';
import {SimpleTextInput} from '../../components/Inputs/SimpleTextInput';

import {black, grey} from '../../utils/constants/colors';
import {calcFontSize, calcHeight, calcWidth} from '../../utils/dimensions';
import {FONTS} from '../../utils/fonts';
import {stepByStepRegister} from '../../styles/stepByStep';
import {setEmail, setEmailChecker} from '../../store/actions/signingActions';
import {useDispatch, useSelector} from 'react-redux';
import {IRootReducer} from '../../store/reducers';

import CheckIcon from '../../../assets/svg/check.svg';
import {translate} from '../../services/api/localization';

const EmailInput = () => {
  const {email, emailChecker, name} = useSelector(
    (state: IRootReducer) => state.signingReducer,
  );
  const dispatch = useDispatch();
  const [emailErrors, setEmailErrors] = useState<boolean | null>(true); // Array<string> | null

  const validateEmail = (e: string): boolean => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(e).toLowerCase());
  };
  useEffect(() => {
    setEmailErrors(validateEmail(email));
  }, []);

  const {navigate} = useNavigation();
  return (
    <CommonView style={styles.main}>
      <RegisterHeader />
      <View style={styles.margin}>
        <View style={{flex: 2}}>
          <Text style={styles.header}>{`Leuk je te\nontmoeten ${name}`}</Text>
          <Text style={styles.text}>Wat is je e-mailadres?</Text>
        </View>
        <View style={{flex: 2.5}}>
          <SimpleTextInput
            placeholder="E-mail"
            value={email}
            onChangeText={text => {
              dispatch(setEmail(text));
              setEmailErrors(validateEmail(text));
            }}
            styleContainer={{marginTop: calcHeight(40)}}
          />
          {emailErrors && (
            <Text style={styles.errorText}>Vul een correct e-mailadres in</Text>
          )}
        </View>
        <View
          style={{
            flex: 0.5,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => dispatch(setEmailChecker(!emailChecker))}
            style={styles.checkComponent}
          >
            {emailChecker && (
              <CheckIcon width={calcHeight(11)} height={calcHeight(11)} />
            )}
          </TouchableOpacity>
          <Text style={styles.checkText}>
            {translate('Ik geef toestemming om mijn gegevens te verwerken')}
          </Text>
        </View>
        <View style={{flex: 0.8}}>
          <CommonButton
            disabled={!(!emailErrors && emailChecker)}
            onPress={() => {
              navigate('PasswordInputScreen');
            }}
            text={translate('Volgende')}
          />
          <View style={{marginTop: calcHeight(25)}}>
            <StepByStep steps={6} currentStep={3} style={stepByStepRegister} />
          </View>
        </View>
      </View>
    </CommonView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginBottom: calcHeight(40),
  },
  margin: {
    marginHorizontal: calcWidth(20),
    flex: 1,
  },
  header: {
    color: black,
    fontSize: calcFontSize(30),
    fontFamily: FONTS.Poppins.Bold700,
    textAlign: 'center',
    marginTop: calcHeight(25),
  },
  text: {
    color: grey,
    fontSize: calcFontSize(15),
    fontFamily: FONTS.Poppins.Regular400,
    textAlign: 'center',
    marginTop: calcHeight(15),
  },
  checkText: {
    width: '65%',
    marginLeft: calcWidth(10),
    fontFamily: FONTS.Poppins.Regular400,
    fontSize: calcFontSize(14),
    color: '#7E7D89',
  },
  checkComponent: {
    width: calcHeight(22),
    height: calcHeight(22),
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#5DBAFA',
    fontFamily: FONTS.Poppins.Regular400,
    fontSize: calcFontSize(12),
    letterSpacing: -0.25,
    marginHorizontal: calcWidth(7.5),
  },
});

export default EmailInput;
