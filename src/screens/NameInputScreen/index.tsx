import React from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '../../utils/navigation';

import RegisterHeader from '../../components/Headers/RegisterHeader';
import CommonView from '../../components/Views/CommonView';
import {CommonButton} from '../../components/Buttons/CommonButton';
import {SimpleTextInput} from '../../components/Inputs/SimpleTextInput';
import StepByStep from '../../components/StepByStep';

import {black, grey, white} from '../../utils/constants/colors';
import {calcFontSize, calcHeight, calcWidth} from '../../utils/dimensions';
import {FONTS} from '../../utils/fonts';
import {stepByStepRegister} from '../../styles/stepByStep';

import {setName} from '../../store/actions/signingActions';
import {IRootReducer} from '../../store/reducers';
import {translate} from '../../services/api/localization';

const NameInput = () => {
  const dispatch = useDispatch();
  const {name} = useSelector((state: IRootReducer) => state.signingReducer);
  const {navigate} = useNavigation();
  return (
    <CommonView style={styles.main}>
      <StatusBar backgroundColor={white} barStyle={'dark-content'} />
      <RegisterHeader />
      <View style={styles.margin}>
        <View style={{flex: 1.45}}>
          <Text style={styles.header}>{translate('Hoe heet je?')}</Text>
          <Text style={styles.text}>{translate('We gebruiken dit')}</Text>
        </View>
        <View style={{flex: 2.5}}>
          <SimpleTextInput
            placeholder={translate('Voornaam')}
            value={name}
            onChangeText={newName => dispatch(setName(newName))}
            styleContainer={{marginTop: calcHeight(40)}}
          />
        </View>
        <View style={{flex: 1}}>
          <CommonButton
            onPress={() => navigate('LanguageChooseScreen')}
            text={translate('Volgende')}
          />
          <StepByStep steps={6} currentStep={0} style={stepByStepRegister} />
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
});

export default NameInput;
