import React, {useState} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {requestNotifications} from 'react-native-permissions';

import CommonView from '../../components/Views/CommonView';
import RequestsHeader from '../../components/Headers/RequestsHeader';
import {CommonButton} from '../../components/Buttons/CommonButton';

import {
  calcFontSize,
  calcHeight,
  calcWidth,
  deviceWidth,
} from '../../utils/dimensions';
import StepByStep from '../../components/StepByStep';
import {stepByStepRequests} from '../../styles/stepByStep';
import {black, grey, lightBlue, red, white} from '../../utils/constants/colors';
import {FONTS} from '../../utils/fonts';
import ButtonsModal from '../../components/Modals/ButtonsModal';
import messaging from '@react-native-firebase/messaging';
import {useDispatch} from 'react-redux';
import {fetchFcnToken} from '../../store/actions/authActions';

interface INotificationRequestProps {
  navigationFunction?: () => void;
}

const NotificationRequest = ({
  navigationFunction = () => {},
}: INotificationRequestProps) => {
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFcnToken();
    }
  }

  const getFcnToken = async () => {
    try {
      const fcnToken = await messaging().getToken();
      console.log('fcnToken', fcnToken);
      dispatch(fetchFcnToken(fcnToken));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CommonView style={[styles.main, {width: deviceWidth}]}>
      <RequestsHeader onPress={navigationFunction} />
      <View style={styles.margin}>
        <View style={styles.imgContainer}>
          <Image // ok
            source={require('../../../assets/png/notifications-image.png')}
            style={styles.imgStyle}
          />
        </View>

        <View style={styles.notificaitonContainer}>
          <Text style={styles.header}>Notificaties</Text>
          <Text style={styles.text}>
            Zo krijg je altijd een relevant aanbod van de beste kortingen,
            speciaal voor jou
          </Text>
        </View>
        <View style={styles.mainModal}>
          <CommonButton
            onPress={() => {
              setActiveModal(true);
            }}
            text="Aan de slag"
          />
          <StepByStep steps={3} currentStep={0} style={stepByStepRequests} />
        </View>
      </View>
      <ButtonsModal
        shown={activeModal}
        setShown={setActiveModal}
        title="RABOOM would like to send you notifications"
        text="Zo krijg je altijd een relevant aanbod van de beste kortingen, speciaal voor jou"
        buttons={[
          {
            text: 'Sta niet toe', // dont allow
            color: red,
            onPress: () => {
              setActiveModal(false);
              navigationFunction();
            },
          },
          {
            text: 'Sta toe', // allow
            color: lightBlue,
            onPress: () => {
              requestUserPermission();
              requestNotifications(['alert', 'sound']).then(({status}) => {
                console.log({'notifications-request-response': status});
                navigationFunction();
              });
              setActiveModal(false);
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
    backgroundColor: white,
  },
  margin: {
    marginHorizontal: calcWidth(20),
    flex: 1,
  },
  header: {
    color: black,
    fontSize: calcFontSize(24),
    fontFamily: FONTS.Poppins.Bold700,
    textAlign: 'center',
  },
  text: {
    color: grey,
    fontSize: calcFontSize(15),
    fontFamily: FONTS.Poppins.Regular400,
    textAlign: 'center',
    marginTop: calcHeight(5),
  },
  imgContainer: {
    flex: 2.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgStyle: {
    width: calcHeight(185),
    height: calcHeight(185),
    marginLeft: 3,
  },
  mainModal: {
    flex: 1,
  },
  notificaitonContainer: {
    flex: 1.7,
  },
});

export default NotificationRequest;
