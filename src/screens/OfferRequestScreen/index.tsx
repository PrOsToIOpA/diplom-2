import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';

import CommonView from '../../components/Views/CommonView';
import {CommonButton} from '../../components/Buttons/CommonButton';

import {
  calcFontSize,
  calcHeight,
  calcWidth,
  deviceWidth,
} from '../../utils/dimensions';
import StepByStep from '../../components/StepByStep';
import {stepByStepRequests} from '../../styles/stepByStep';
import {black, blue, grey, white} from '../../utils/constants/colors';
import {FONTS} from '../../utils/fonts';

interface IOfferRequestProps {
  navigationFunction?: () => void;
}

const OfferRequest = ({navigationFunction = () => {}}: IOfferRequestProps) => {
  return (
    <CommonView style={[styles.main, {width: deviceWidth}]}>
      <View style={styles.margin}>
        <View
          style={{flex: 2.25, alignItems: 'center', justifyContent: 'center'}}
        >
          <Image // ok
            source={require('../../../assets/png/man.png')}
            style={{
              width: 214,
              height: 194,
              marginLeft: 3,
            }}
          />
        </View>

        <View style={{flex: 1.7}}>
          <Text style={styles.header}>Ga naar jouw favoriete webshop</Text>
          <Text style={styles.text}>
            Bestel direct via de RABOOM-app of liever via desktop ga dan naar
          </Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://raboom.nl/').catch(e =>
                console.log('error', e),
              );
            }}
          >
            <Text style={[styles.text, styles.link]}>www.raboom.nl</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <CommonButton onPress={navigationFunction} text="Lees meer" />
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
  link: {
    color: blue,
  },
});

export default OfferRequest;
