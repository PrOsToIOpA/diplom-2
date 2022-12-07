import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  UIManager,
  Platform,
  LayoutAnimation,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import CommonView from '../../components/Views/CommonView';
import CommonHeader from '../../components/Headers/CommonHeader';
import {
  calcFontSize,
  calcHeight,
  calcWidth,
  deviceWidth,
} from '../../utils/dimensions';
import {darkBlue, lightBlue, red, white} from '../../utils/constants/colors';
import {FONTS} from '../../utils/fonts';

import {IProgram} from '../../store/types/programs';
import {useNavigation} from '../../utils/navigation';

import PlanetIcon from '../../../assets/svg/language-icon.svg';
import ArrowUpIcon from '../../../assets/svg/arrow-up.svg';
import {CommonButton} from '../../components/Buttons/CommonButton';
import ConeShape from '../../components/Shapes/ConeShape';
import {fetchTrackingLink} from '../../store/actions/programsActions';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {IRootReducer} from '../../store/reducers';

const arrowUpSize = calcWidth(12);

export const ProgramDetail = ({route}: any) => {
  const item: IProgram = route.params.program;
  const {userLikes} = useSelector((state: IRootReducer) => state.userReducer);
  const dispatch = useDispatch();

  const {goBack} = useNavigation();

  const isFocused = useIsFocused();

  const isLiked: any = userLikes && userLikes.includes(item.id);

  useEffect(
    // @ts-ignore
    () => isFocused && StatusBar.setBarStyle('light-content'),
    [isFocused],
  );

  const [isFullScreenMode, setIsFullScreenMode] = useState<boolean>(false);

  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const getCurrentButtonName = (program_type: string) => {
    switch (program_type) {
      case 'cashback_voucher':
        return 'Krijg cashback + kortingscode';

      case 'discount':
        return 'Krijg directe korting';

      case 'discount_voucher':
        return 'Krijg directe korting met code';

      case 'cashback':
      default:
        return 'Krijg cashback';
    }
  };

  const commissionGroupsName = () => {
    return route.params.program.commission_groups.map(({name, value}: any) => (
      <View style={styles.commissionGroupsContainer} key={`${name}${value}`}>
        <View style={styles.commissionRow}>
          <Text style={styles.commissionGroups}>{name}</Text>
          <Text style={[styles.commissionGroups, {color: 'red'}]}>{value}</Text>
        </View>
      </View>
    ));
  };

  return (
    <CommonView hideStatusBar={false} style={{flex: 1}}>
      <StatusBar backgroundColor={darkBlue} barStyle={'light-content'} />
      <CommonHeader
        itemId={item.id}
        title={item.advertiser.name}
        icon="goBack"
        onIconPress={goBack}
        isLiked={isLiked}
      />
      <View style={styles.main}>
        <ScrollView>
          {!isFullScreenMode && (
            <FastImage
              source={{uri: item.image_url}}
              style={styles.imageBackground}
            >
              <View style={styles.innerImageWrap}>
                <FastImage
                  source={{uri: item.advertiser.image_url}}
                  resizeMode="contain"
                  style={styles.innerImage}
                />
              </View>
            </FastImage>
          )}
          <ScrollView
            style={[
              styles.scrollView,
              isFullScreenMode && styles.noShadow,
              isFullScreenMode && {marginTop: 0},
            ]}
            scrollEnabled={false}
          >
            {!isFullScreenMode && (
              <ConeShape style={{top: arrowUpSize * 0.75}} />
            )}
            <View>
              <TouchableOpacity
                style={styles.arrowUpWrap}
                onPress={() => {
                  setIsFullScreenMode(val => !val);
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut,
                  );
                }}
              >
                {/*@ts-ignore*/}
                <ArrowUpIcon
                  fill="#7A7985"
                  width={arrowUpSize}
                  height={arrowUpSize}
                  transform={[{rotateZ: !isFullScreenMode ? 0 : 3.15}]}
                />
              </TouchableOpacity>
              {item.premium ? (
                <TouchableOpacity style={styles.buttonContainer}>
                  <Text style={styles.buttonText} numberOfLines={1}>
                    {item.premium}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.mainContentWrap}>
              <Text style={styles.headerText}>{item.advertiser.name}</Text>
              <Text style={styles.subtitle}>{item.promotion}</Text>
              <Text style={styles.text}>
                {!isFullScreenMode ? item.app.short_description : item.app.body}
              </Text>
              <View style={{marginTop: 5}}>{commissionGroupsName()}</View>
              <View style={styles.buttonsContainer}>
                {/*not needed, may change in future*/}
                {/*<TouchableOpacity style={styles.locationTouchableWrap}>*/}
                {/*  <LocationIcon width={calcWidth(18)} height={calcWidth(18)} />*/}
                {/*</TouchableOpacity>*/}
                <TouchableOpacity style={styles.planetTouchableWrap}>
                  <PlanetIcon width={calcWidth(18)} height={calcWidth(18)} />
                </TouchableOpacity>
                <View style={{flex: 1}}>
                  <CommonButton
                    text={getCurrentButtonName(item.program_type)}
                    onPress={() => dispatch(fetchTrackingLink(item.id))}
                    styleContainer={{height: calcHeight(35)}}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    </CommonView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: white,
  },
  scrollView: {
    flex: 1,
    marginTop: calcWidth(-40),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  noShadow: {
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,

    elevation: 0,
  },
  imageBackground: {
    width: deviceWidth,
    height: deviceWidth / 1.33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerImageWrap: {
    backgroundColor: white,
    borderRadius: 999,
    width: calcWidth(100),
    height: calcWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerImage: {
    borderRadius: calcWidth(25),
    width: calcWidth(85),
    height: calcWidth(85),
  },
  arrowUpWrap: {
    backgroundColor: white,
    alignSelf: 'center',
    alignItems: 'center',
    padding: arrowUpSize / 2,
    borderRadius: 99,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContainer: {
    marginTop: calcWidth(15),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99,
    backgroundColor: red,
    paddingHorizontal: calcWidth(13),
    maxWidth: '90%',
    paddingVertical: calcWidth(7),
  },
  buttonText: {
    color: white,
    fontFamily: FONTS.Poppins.Medium500,
    fontSize: calcFontSize(13),
  },
  buttonsContainer: {
    flex: 1,
    backgroundColor: white,
    flexDirection: 'row',
    alignItems: 'flex-start',
    // height: deviceHeight,
    justifyContent: 'flex-start',
    marginTop: calcWidth(20),
  },
  locationTouchableWrap: {
    width: calcWidth(40),
    height: calcWidth(40),
    borderRadius: 999,
    borderWidth: 0.75,
    borderColor: '#d0d0d0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: calcWidth(15),
  },
  planetTouchableWrap: {
    width: calcWidth(40),
    height: calcWidth(40),
    borderRadius: 999,
    borderWidth: 0.75,
    borderColor: '#d0d0d0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: calcWidth(25),
  },
  headerText: {
    marginTop: calcWidth(15),
    fontSize: calcFontSize(28),
    fontFamily: FONTS.SFPro.Medium500,
  },
  mainContentWrap: {
    flex: 1,
    backgroundColor: white,
    paddingHorizontal: calcWidth(15),
  },
  subtitle: {
    marginTop: calcWidth(10),
    fontSize: calcFontSize(18),
    fontFamily: FONTS.SFPro.Regular400,
    color: lightBlue,
  },
  text: {
    marginTop: calcWidth(15),
    fontSize: calcFontSize(14),
    fontFamily: FONTS.SFPro.Regular400,
    color: '#6a6a6a',
  },
  commissionGroups: {
    fontSize: calcFontSize(14),
    fontFamily: FONTS.SFPro.Regular400,
  },
  commissionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  commissionGroupsContainer: {flex: 1, paddingHorizontal: 20},
});

export default ProgramDetail;
