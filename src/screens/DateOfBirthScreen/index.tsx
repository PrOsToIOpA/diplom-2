import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import {calcFontSize, calcHeight, calcWidth} from '../../utils/dimensions';
import {black, grey} from '../../utils/constants/colors';
import CommonView from '../../components/Views/CommonView';
import {CommonButton} from '../../components/Buttons/CommonButton';
import StepByStep from '../../components/StepByStep';
import {stepByStepRegister} from '../../styles/stepByStep';
import {useNavigation} from '../../utils/navigation';
import ArrowUpIcon from '../../../assets/svg/arrow-up.svg';
import RegisterHeader from '../../components/Headers/RegisterHeader';
import {useDispatch} from 'react-redux';
import {setUserBirth} from '../../store/actions/signingActions';
import {translate} from '../../services/api/localization';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const BirthDate = () => {
  const {navigate} = useNavigation();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();

  let maximumDate = new Date();
  maximumDate.setFullYear(maximumDate.getFullYear() - 3);
  let minimumDate = new Date();
  minimumDate.setFullYear(minimumDate.getFullYear() - 60);
  return (
    <CommonView style={[styles.main, Platform.OS === 'ios' && {marginTop: 75}]}>
      <RegisterHeader />
      <View style={{flex: 4}}>
        <View style={styles.marginContainer}>
          <View>
            <Text style={styles.text}>{translate('Date of birth?')}</Text>
            <TouchableOpacity
              style={styles.languageItemChoosen}
              onPress={() => setOpen(true)}
            >
              <Text>{moment(date).format('DD MMMM YYYY')}</Text>
              {/*@ts-ignore*/}
              <ArrowUpIcon
                fill="#7A7985"
                width={20}
                height={20}
                transform={[{rotateZ: 3.15}]}
              />
            </TouchableOpacity>
            <DatePicker
              modal
              maximumDate={maximumDate}
              minimumDate={minimumDate}
              androidVariant={'iosClone'}
              // maximumDate={new Date(moment().format('YYYY-MM-DD'))}
              mode={'date'}
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
                setDisabled(false);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.margin}>
        <View>
          <CommonButton
            disabled={disabled}
            onPress={() => {
              navigate('EmailInputScreen');
              dispatch(setUserBirth(moment(date).format('DD-MM-YYYY')));
            }}
            text={translate('Volgende')}
          />
          <View style={{marginTop: calcHeight(25)}}>
            <StepByStep steps={6} currentStep={2} style={stepByStepRegister} />
          </View>
        </View>
      </View>
    </CommonView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginTop: calcHeight(20),
  },
  margin: {
    flex: 1,
    marginHorizontal: calcWidth(20),
  },
  marginContainer: {
    marginHorizontal: calcWidth(20),
  },
  languageItem: {
    backgroundColor: '#F5F8F9',
    fontSize: calcFontSize(14),
    marginVertical: calcHeight(2),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: grey,
    paddingVertical: calcWidth(5),
    paddingLeft: calcWidth(15),
    color: black,
    flexDirection: 'row',
  },
  languageItemChoosen: {
    backgroundColor: '#F5F8F9',
    fontSize: calcFontSize(18),
    marginBottom: calcHeight(20),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: grey,
    paddingVertical: calcWidth(10),
    paddingHorizontal: calcWidth(10),
    color: black,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: calcHeight(58),
    marginBottom: calcHeight(100),
    fontWeight: 'bold',
    lineHeight: 23,
  },
});

export default BirthDate;
