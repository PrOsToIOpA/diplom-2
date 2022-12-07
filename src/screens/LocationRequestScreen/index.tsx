import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {useNavigation} from '../../utils/navigation';

import CommonView from '../../components/Views/CommonView';
import StepByStep from '../../components/StepByStep';
import {CommonButton} from '../../components/Buttons/CommonButton';
import RequestsHeader from '../../components/Headers/RequestsHeader';

import {calcFontSize, calcHeight, calcWidth} from '../../utils/dimensions';
import {stepByStepRequests} from '../../styles/stepByStep';
import {black, grey, white} from '../../utils/constants/colors';
import {FONTS} from '../../utils/fonts';

const LocationRequest = () => {
  const {navigate} = useNavigation();
  return (
    <CommonView style={styles.main}>
      <RequestsHeader onPress={() => navigate('NotificationRequestScreen')} />
      <View style={styles.margin}>
        <View
          style={{flex: 2.25, alignItems: 'center', justifyContent: 'center'}}
        >
          <Image // ok
            source={require('../../../assets/png/location-image.png')}
            style={{
              width: calcHeight(185),
              height: calcHeight(185),
            }}
          />
        </View>

        <View style={{flex: 1.7}}>
          <Text style={styles.header}>Locatie</Text>
          <Text style={styles.text}>
            We gebruiken jouw locatie zodat we jou de beste en meest relevante
            kortingen kunnen tonen.
          </Text>
        </View>
        <View style={{flex: 1}}>
          <CommonButton
            onPress={() => navigate('NotificationRequestScreen')}
            text="Lees meer"
          />
          <StepByStep steps={3} currentStep={1} style={stepByStepRequests} />
        </View>
      </View>
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
});

export default LocationRequest;
