import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Linking} from 'react-native';
import {useNavigation} from '../../utils/navigation';
import {useDispatch, useSelector} from 'react-redux';

import RegisterHeader from '../../components/Headers/RegisterHeader';
import {CommonButton} from '../../components/Buttons/CommonButton';
import CommonView from '../../components/Views/CommonView';
import StepByStep from '../../components/StepByStep';
import ButtonsModal from '../../components/Modals/ButtonsModal';
import {SimpleTextInput} from '../../components/Inputs/SimpleTextInput';

import {black, grey, lightBlue, red} from '../../utils/constants/colors';
import {calcFontSize, calcHeight, calcWidth} from '../../utils/dimensions';
import {FONTS} from '../../utils/fonts';
import {stepByStepRegister} from '../../styles/stepByStep';
import {
  setRaboomID,
  setRaboomIDChecker,
} from '../../store/actions/signingActions';
import {IRootReducer} from '../../store/reducers';

import CheckIcon from '../../../assets/svg/check.svg';
import {translate} from '../../services/api/localization';

const IdInput = () => {
  const {raboomID, raboomIDChecker} = useSelector(
    (state: IRootReducer) => state.signingReducer,
  );
  const dispatch = useDispatch();
  const [activeModal, setActiveModal] = React.useState<boolean>(false);
  const {navigate} = useNavigation();
  return (
    <CommonView style={styles.main}>
      <RegisterHeader />
      <View style={styles.margin}>
        <View style={{flex: 1.5}}>
          <Text style={styles.header}>{translate('Wat is je RABOOM-ID?')}</Text>
          <Text style={styles.text}>
            Vul hier de code in die je hebt ontvangen.
          </Text>
        </View>
        <View style={{flex: 1.85}}>
          <SimpleTextInput
            placeholder="RABOOM-ID"
            value={raboomID}
            onChangeText={newID => dispatch(setRaboomID(newID))}
            styleContainer={{marginTop: calcHeight(40)}}
          />
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://raboom.nl/').catch(e =>
                console.log('error', e),
              );
            }}
          >
            <Text style={styles.forgotPassText}>
              {translate('hoe kom ik aan een RABOOM-ID?')}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.65,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => dispatch(setRaboomIDChecker(!raboomIDChecker))}
            style={styles.checkComponent}
          >
            {raboomIDChecker && (
              <CheckIcon width={calcHeight(11)} height={calcHeight(11)} />
            )}
          </TouchableOpacity>
          <Text style={styles.checkText}>
            {
              'Ik wil op de hoogte gehouden worden van de beste kortingen en winacties!'
            }
          </Text>
        </View>
        <View style={{flex: 1}}>
          <CommonButton
            onPress={() => {
              raboomID !== 'RABOOM785'
                ? setActiveModal(true)
                : navigate('SliderRequestScreen');
            }}
            text={translate('Ik ben Klaar!')}
          />
          <StepByStep steps={5} currentStep={4} style={stepByStepRegister} />
        </View>
      </View>
      <ButtonsModal
        shown={activeModal}
        setShown={setActiveModal}
        title="Let op!"
        text="Wanneer je niet jouw RABOOM-ID invult kun je slechts alle kortingen bekijken in de app maar er geen gebruik van maken."
        buttons={[
          {
            text: 'Annuleren',
            color: lightBlue,
            onPress: () => setActiveModal(false),
          },
          {
            text: 'Ga door',
            color: red,
            onPress: () => {
              setActiveModal(false);
              navigate('SliderRequestScreen');
            },
          },
        ]}
      />
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
    width: '80%',
    alignSelf: 'center',
    marginTop: calcHeight(55),
  },
  text: {
    color: grey,
    fontSize: calcFontSize(15),
    fontFamily: FONTS.Poppins.Regular400,
    textAlign: 'center',
    marginTop: calcHeight(15),
  },
  checkText: {
    width: '80%',
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
    marginBottom: calcHeight(20),
  },
  checkInside: {
    width: 13,
    height: 13,
    borderRadius: 1000,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  forgotPassText: {
    color: lightBlue,
    fontSize: calcFontSize(15),
    fontFamily: FONTS.Poppins.Regular400,
    letterSpacing: -0.25,
  },
});

export default IdInput;
