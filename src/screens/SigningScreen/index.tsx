import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Platform, Image} from 'react-native';
import {useNavigation} from '../../utils/navigation';

import {CommonButton} from '../../components/Buttons/CommonButton';
// @ts-ignore
import Video from 'react-native-video';
import {
  calcFontSize,
  calcHeight,
  calcWidth,
  deviceHeight,
} from '../../utils/dimensions';
import {white} from '../../utils/constants/colors';
import {FONTS} from '../../utils/fonts';
import {translate} from '../../services/api/localization';
import {useDispatch} from 'react-redux';
import {setRaboomID} from '../../store/actions/signingActions';

const Signing = ({route}: any) => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  const getHeightLogo = () => ({
    height: Platform.OS === 'ios' ? calcHeight(50) : calcHeight(58),
  });
  const getWidthLogo = () => ({
    width: Platform.OS === 'ios' ? calcWidth(275) : calcWidth(280),
  });

  // on some androids react-native-video don't work from local files
  const [isFetchingURLVideo, setIsFetchingURLVideo] = useState(false);

  const videoSource = require('../../../assets/video/signing-background.mp4');
  const videoSourceUrl =
    'https://videos.covideo.com/videos/145400_45177_w2n5g3xsrh1629799323.mp4';

  console.log('code', route?.params);

  useEffect(() => {
    dispatch(setRaboomID(route?.params?.raboomId || 'RABOOM785'));
  }, [route?.params]);

  return (
    <>
      <Video
        source={
          isFetchingURLVideo
            ? {
                uri: videoSourceUrl,
                cache: {size: 10, expiresIn: 86400},
              }
            : videoSource
        }
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={'cover'}
        rate={1.0}
        ignoreSilentSwitch={'obey'}
        onError={(e: any) => {
          if (e) {
            setIsFetchingURLVideo(true);
          }
        }}
      />
      <View style={styles.main}>
        <View style={styles.svgContainer}>
          <Image // ok
            source={require('../../../assets/png/raboom-logo.png')}
            style={[getHeightLogo(), getWidthLogo()]}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CommonButton
          onPress={() => navigate('NameInputScreen')}
          text={translate('Maak een account aan')}
        />
        <CommonButton
          onPress={() => navigate('LoginScreen', {raboomID: 'sdcdsds'})}
          text={translate('Ik heb al een account')}
          isTransparentBackground={true}
          styleContainer={styles.buttonMiddle}
        />
        <Text style={styles.bottomText}>{translate('Met')}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: calcHeight(30),
    marginHorizontal: calcWidth(20),
  },
  bottomText: {
    fontFamily: FONTS.Poppins.Medium500,
    fontSize: calcFontSize(16),
    color: white,
    textAlign: 'center',
    marginTop: calcHeight(20),
    marginHorizontal: calcWidth(15),
  },
  buttonMiddle: {marginTop: calcHeight(10.5)},
  svgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: calcHeight(52),
    width: '100%',
  },
  backgroundVideo: {
    height: deviceHeight,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
});

export default Signing;
