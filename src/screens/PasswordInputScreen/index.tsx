import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
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

import {useDispatch, useSelector} from 'react-redux';
import {IRootReducer} from '../../store/reducers';
import {fetchRegister, setPassword} from '../../store/actions/signingActions';
import {translate} from '../../services/api/localization';

const PassInput = () => {
  const dispatch = useDispatch();
  const {password, email, raboomID, name, userBirth} = useSelector(
    (state: IRootReducer) => state.signingReducer,
  );
  useEffect(() => {
    setPassErrors(password.length < 6);
  }, []);
  const [passErrors, setPassErrors] = useState<boolean | null>(true);
  return (
    <CommonView style={styles.main}>
      <RegisterHeader />
      <View style={styles.margin}>
        <View style={{flex: 1.5}}>
          <Text style={styles.header}>{translate('Verzin je wachtwoord')}</Text>
          <Text style={styles.text}>{translate('minimaal 6 karakters')}</Text>
        </View>
        <View style={{flex: 2.5}}>
          <SimpleTextInput
            placeholder={translate('wachtwoord')}
            value={password}
            onChangeText={newPass => {
              dispatch(setPassword(newPass));
              setPassErrors(newPass.length < 6);
            }}
            styleContainer={{marginTop: calcHeight(40)}}
            password
          />
          {passErrors && (
            <Text style={styles.errorText}>
              Wachtwoord moet uit minstens 6 tekens bestaan
            </Text>
          )}
        </View>
        <View style={{flex: 1}}>
          <CommonButton
            onPress={() => {
              dispatch(
                fetchRegister({
                  email: email,
                  password: password,
                  verification: raboomID,
                  first_name: name,
                  birthdate: userBirth,
                }),
              );
            }}
            text={translate('Volgende')}
            disabled={passErrors}
          />
          <StepByStep steps={6} currentStep={4} style={stepByStepRegister} />
        </View>
      </View>
    </CommonView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
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
    marginTop: calcHeight(55),
  },
  text: {
    color: grey,
    fontSize: calcFontSize(15),
    fontFamily: FONTS.Poppins.Regular400,
    textAlign: 'center',
    marginTop: calcHeight(15),
  },
  errorText: {
    color: '#5DBAFA',
    fontFamily: FONTS.Poppins.Regular400,
    fontSize: calcFontSize(12),
    letterSpacing: -0.25,
    marginHorizontal: calcWidth(7.5),
  },
});

export default PassInput;
