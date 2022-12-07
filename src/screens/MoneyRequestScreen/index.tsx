import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  SafeAreaView,
  StatusBar,
} from 'react-native';
// @ts-ignore
import Video from 'react-native-video';
import CommonView from '../../components/Views/CommonView';
import {CommonButton} from '../../components/Buttons/CommonButton';

import {
  calcFontSize,
  calcHeight,
  calcWidth,
  deviceHeight,
} from '../../utils/dimensions';
import StepByStep from '../../components/StepByStep';
import {stepByStepRequests} from '../../styles/stepByStep';
import {
  black,
  blue,
  darkBlue,
  grey,
  red,
  white,
} from '../../utils/constants/colors';
import {FONTS} from '../../utils/fonts';

interface IMoneyRequestProps {
  navigationFunction?: () => void;
}

const MoneyRequest = ({navigationFunction = () => {}}: IMoneyRequestProps) => {
  const [videoPl, setVideoPl] = useState(false);

  const windowWidth = Dimensions.get('window').width;

  const playVideo = () => {
    setVideoPl(!videoPl);
  };

  return (
    <CommonView style={[styles.main, {width: windowWidth}]}>
      <View style={styles.margin}>
        <View
          style={{flex: 2.25, alignItems: 'center', justifyContent: 'center'}}
        >
          <Image // ok
            source={require('../../../assets/png/cashback-image.png')}
            style={{
              width: calcHeight(202),
              height: calcHeight(194),
              marginLeft: 3,
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
          <TouchableOpacity>
            <Text style={[styles.text, styles.link]}>www.raboom.nl</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <CommonButton
              styleContainer={{width: calcWidth(154)}}
              styleButton={{backgroundColor: white}}
              styleText={{color: red}}
              onPress={() => {
                navigationFunction();
              }}
              text="Alle kortingen"
            />
            <CommonButton
              styleContainer={{
                width: calcWidth(154),
                marginLeft: calcWidth(15),
              }}
              onPress={playVideo}
              text="Bekijk video️ ▶"
            />
            <Modal visible={videoPl}>
              <SafeAreaView style={{flex: 1, backgroundColor: black}}>
                <StatusBar barStyle={'light-content'} />
                <TouchableOpacity onPress={playVideo}>
                  <Text
                    style={{
                      fontSize: 24,
                      color: white,
                      fontFamily: FONTS.Poppins.Regular400,
                    }}
                  >
                    Sluiten
                  </Text>
                </TouchableOpacity>
                <Video
                  resizeMode="contain"
                  source={{
                    uri: 'https://videos.covideo.com/videos/148887_46304_3gazgck5uh1634560344.mp4',
                  }}
                  controls={true}
                  onEnd={() => {
                    playVideo();
                  }}
                  style={styles.backgroundVideo}
                />
              </SafeAreaView>
            </Modal>
          </View>
          <StepByStep steps={3} currentStep={2} style={stepByStepRequests} />
        </View>
      </View>
    </CommonView>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    flex: 1,
    height: deviceHeight,
    alignItems: 'center',
    bottom: 0,
    right: 0,
  },
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

export default MoneyRequest;
