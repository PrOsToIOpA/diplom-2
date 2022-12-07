import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {useNavigation} from '../../utils/navigation';

import CommonView from '../../components/Views/CommonView';
import EmptyHeader from '../../components/Headers/EmptyHeader';
import {CommonButton} from '../../components/Buttons/CommonButton';
import StepByStep from '../../components/StepByStep';

import {calcFontSize, calcHeight, calcWidth} from '../../utils/dimensions';
import {stepByStepRequests} from '../../styles/stepByStep';
import {black, grey, white} from '../../utils/constants/colors';
import {FONTS} from '../../utils/fonts';

const Cashback = () => {
  const {navigate} = useNavigation();
  return (
    <CommonView style={styles.main}>
      <EmptyHeader />
      <View style={styles.margin}>
        <View
          style={{flex: 2.25, alignItems: 'center', justifyContent: 'center'}}
        >
          <Image // ok
            source={require('../../../assets/png/cashback-image.png')}
            style={{
              width: calcHeight(185),
              height: calcHeight(185),
            }}
          />
        </View>

        <View style={{flex: 1.7}}>
          <Text style={styles.header}>
            Ontvang automatisch een deel van je geld terug
          </Text>
          <Text style={styles.text}>
            Webshops betalen voor marketing, maar wij delen hun kosten graag met
            jou
          </Text>
        </View>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <CommonButton
              onPress={() => console.log('asdasdasdasdasdas')}
              text="Aan de slag"
              styleContainer={{flex: 1, marginRight: calcWidth(5)}}
              isBorderGradient={true}
            />
            <CommonButton
              onPress={() => console.log('asdasdasdasdasdas')}
              text="Bekijk video   ►"
              styleContainer={{flex: 1, marginLeft: calcWidth(5)}}
            />
          </View>
          <StepByStep steps={3} currentStep={2} style={stepByStepRequests} />
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
    width: '90%',
    alignSelf: 'center',
  },
  text: {
    color: grey,
    fontSize: calcFontSize(15),
    fontFamily: FONTS.Poppins.Regular400,
    textAlign: 'center',
    marginTop: calcHeight(5),
  },
});

export default Cashback;
