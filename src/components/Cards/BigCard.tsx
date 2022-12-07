import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import FastImage from 'react-native-fast-image';

import {fetchLikeDelete, fetchLikePost} from '../../store/actions/userActions';

import {FONTS} from '../../utils/fonts';
import {grey, red, white} from '../../utils/constants/colors';

import {
  calcFontSize,
  calcHeight,
  calcWidth,
  deviceWidth,
} from '../../utils/dimensions';

import HeartGradientIcon from '../../../assets/svg/heart-gradient-empty.svg';
import EuroIcon from '../../../assets/svg/convert-euro-icon.svg';
import HeartIcon from '../../../assets/svg/heart.svg';

import {IProgram} from '../../store/types/programs';

interface IBigCardProps {
  data: any;
  marginBetween?: number;
  firstLastMargin?: number;
  lastElementIndex: number;
  isLiked?: boolean;
  onPress?: () => void;
}

const BigCard = ({
  data,
  marginBetween,
  firstLastMargin,
  lastElementIndex,
  isLiked,
  onPress,
}: IBigCardProps) => {
  const dispatch = useDispatch();
  const {item, index}: {item: IProgram; index: number} = data;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.main,
        marginBetween ? {marginHorizontal: marginBetween} : null,
        firstLastMargin
          ? index === 0
            ? {marginLeft: firstLastMargin}
            : index === lastElementIndex
            ? {marginRight: firstLastMargin}
            : null
          : null,
      ]}
    >
      {item.promotion && (
        <View style={styles.headerTextContainer}>
          <Text numberOfLines={2} style={styles.headerText}>
            {item.promotion}
          </Text>
        </View>
      )}
      <View style={styles.imageContainer}>
        <FastImage source={{uri: item.image_url}} style={styles.image}>
          <View style={styles.smallImageContainer}>
            <FastImage
              source={{uri: item.advertiser.image_url}}
              resizeMode="contain"
              style={styles.smallImage}
            />
          </View>
        </FastImage>
      </View>
      <View style={styles.descriptionContainer}>
        <View style={[styles.textAndIconWrap]}>
          <Text style={styles.descriptionHeader}>{item.advertiser.name}</Text>
          {isLiked ? (
            <TouchableOpacity
              onPress={() => {
                dispatch(fetchLikeDelete(item.id));
              }}
            >
              <HeartIcon
                fill={red}
                width={calcWidth(14.5)}
                height={calcWidth(14.5)}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                dispatch(fetchLikePost(item.id));
              }}
            >
              <HeartGradientIcon
                width={calcWidth(14.5)}
                height={calcWidth(14.5)}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.amountContainer}>
          <EuroIcon
            fill={white}
            width={calcWidth(18)}
            height={calcWidth(15)}
            alignSelf="center"
            marginLeft={calcWidth(8)}
          />
          <Text numberOfLines={1} style={styles.amountText}>
            {item.premium}
          </Text>
        </View>
        <View style={styles.descriptionTextContainer}>
          <Text numberOfLines={3} style={styles.descriptionText}>
            {item.app.short_description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    width: deviceWidth * 0.786,
  },
  headerTextContainer: {
    backgroundColor: 'rgb(210,240,255)',
    paddingHorizontal: calcWidth(20),
    padding: calcWidth(3),
    justifyContent: 'center',
  },
  headerText: {
    color: 'rgb(0,174,255)',
    textAlign: 'center',
    marginBottom: calcHeight(2),
  },
  imageContainer: {},
  image: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    height: calcWidth(200),
  },
  smallImageContainer: {
    backgroundColor: white,
    width: calcWidth(75),
    height: calcWidth(75),
    borderRadius: 999,
    marginRight: calcWidth(10),
    marginBottom: calcWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallImage: {
    borderRadius: 25,
    width: calcWidth(65),
    height: calcWidth(65),
  },
  descriptionContainer: {},
  descriptionHeader: {
    fontSize: calcFontSize(15),
    fontFamily: FONTS.Poppins.Bold700,
  },
  textAndIconWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: calcWidth(7.5),
  },
  amountContainer: {
    flexDirection: 'row',
    backgroundColor: '#FB2B6F',
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  amountText: {
    maxWidth: '84%',
    margin: calcWidth(5),
    marginRight: calcWidth(12),
    color: white,
    fontFamily: FONTS.Poppins.Medium500,
    fontSize: calcFontSize(13),
  },
  descriptionTextContainer: {
    marginVertical: calcHeight(10),
  },
  descriptionText: {
    lineHeight: 20,
    fontSize: calcFontSize(12),
    fontFamily: FONTS.Poppins.Regular400,
    color: grey,
  },
});

export default BigCard;
